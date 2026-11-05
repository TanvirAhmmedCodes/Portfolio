"use client";

type Listener = (enabled: boolean, isMusicPlaying: boolean) => void;

const TARGET_VOLUME = 0.35;

class SoundManager {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private rawBytes: Uint8Array | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private enabled: boolean = true;
  private isMusicActive: boolean = false;
  private listeners: Set<Listener> = new Set();
  private setupDone: boolean = false;
  private fetchPromise: Promise<Uint8Array | null> | null = null;
  private removeGestureListeners: (() => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tanvir_sound_enabled");
      this.enabled = stored === null ? true : stored === "true";
      this.setupGlobalAutoplay();
    }
  }

  // Pre-fetch audio via pure JSON API (100% IDM-proof — IDM NEVER intercepts JSON!)
  private prefetchAudio(): Promise<Uint8Array | null> {
    if (this.rawBytes) return Promise.resolve(this.rawBytes);
    if (this.fetchPromise) return this.fetchPromise;

    this.fetchPromise = (async () => {
      try {
        const res = await fetch("/api/audio-stream", {
          cache: "force-cache",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!data.stream) throw new Error("No stream payload in response");

        // Fast base64 decode in memory
        const binaryStr = atob(data.stream);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        this.rawBytes = bytes;

        // Eagerly decode into AudioBuffer if context exists
        if (this.ctx && !this.audioBuffer) {
          try {
            const copy = new Uint8Array(bytes.byteLength);
            copy.set(bytes);
            this.audioBuffer = await this.ctx.decodeAudioData(copy.buffer);
            if (this.enabled && this.ctx.state === "running" && !this.sourceNode) {
              this.startBufferPlayback();
            }
          } catch (e) {
            console.warn("Eager audio decode:", e);
          }
        }

        return bytes;
      } catch (err) {
        console.warn("Audio stream fetch deferred:", err);
        this.fetchPromise = null;
        return null;
      }
    })();

    return this.fetchPromise;
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.enabled ? TARGET_VOLUME : 0, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    return this.ctx;
  }

  private async getAudioBuffer(): Promise<AudioBuffer | null> {
    if (this.audioBuffer) return this.audioBuffer;

    this.initContext();
    if (!this.ctx) return null;

    let bytes = this.rawBytes;
    if (!bytes) {
      bytes = await this.prefetchAudio();
    }
    if (!bytes) return null;

    if (this.audioBuffer) return this.audioBuffer;

    try {
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      this.audioBuffer = await this.ctx.decodeAudioData(copy.buffer);

      if (this.enabled && this.ctx.state === "running" && !this.sourceNode) {
        this.startBufferPlayback();
      }

      return this.audioBuffer;
    } catch (err) {
      console.warn("Audio buffer decode error:", err);
      return null;
    }
  }

  private startBufferPlayback() {
    if (!this.ctx || !this.audioBuffer || !this.gainNode) return;
    if (this.sourceNode) return;

    try {
      const source = this.ctx.createBufferSource();
      source.buffer = this.audioBuffer;
      source.loop = true;
      source.connect(this.gainNode);

      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(TARGET_VOLUME, this.ctx.currentTime + 0.3);

      source.start(0);
      this.sourceNode = source;
      this.isMusicActive = true;
      this.notify();

      if (this.removeGestureListeners) {
        this.removeGestureListeners();
        this.removeGestureListeners = null;
      }
    } catch (err) {
      console.warn("Playback start failed:", err);
    }
  }

  private stopBufferPlayback() {
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
    }

    setTimeout(() => {
      if (!this.enabled && this.sourceNode) {
        try {
          this.sourceNode.stop();
          this.sourceNode.disconnect();
        } catch {}
        this.sourceNode = null;
      }
    }, 200);

    this.isMusicActive = false;
    this.notify();
  }

  public async playBackgroundMusic() {
    if (!this.enabled) return;

    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        // Will be resumed on first user gesture
      }
    }

    const buffer = await this.getAudioBuffer();
    if (buffer && this.ctx.state === "running" && !this.sourceNode) {
      this.startBufferPlayback();
    }
  }

  public stopBackgroundMusic() {
    this.stopBufferPlayback();
  }

  public setupGlobalAutoplay() {
    if (typeof window === "undefined" || this.setupDone) return;
    this.setupDone = true;

    // 1. Initialize context and prefetch audio payload
    this.initContext();
    this.prefetchAudio();

    // 2. Immediate playback attempts on open & refresh
    if (this.enabled) {
      this.playBackgroundMusic();

      if (document.readyState === "complete") {
        this.playBackgroundMusic();
      } else {
        window.addEventListener("load", () => this.playBackgroundMusic(), { once: true });
      }
      setTimeout(() => this.playBackgroundMusic(), 150);
      setTimeout(() => this.playBackgroundMusic(), 500);
    }

    // 3. Multi-gesture fallback for cold browser sessions
    const gestureEvents = [
      "pointerdown",
      "click",
      "touchstart",
      "touchend",
      "keydown",
      "wheel",
      "scroll",
    ];

    const onUserGesture = () => {
      if (!this.enabled) return;
      this.initContext();
      if (this.ctx) {
        if (this.ctx.state === "suspended") {
          this.ctx.resume().then(() => {
            if (this.enabled && !this.isMusicActive) {
              this.playBackgroundMusic();
            }
          });
        } else if (this.enabled && !this.isMusicActive) {
          this.playBackgroundMusic();
        }
      }
    };

    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, onUserGesture, { passive: true });
      document.addEventListener(ev, onUserGesture, { passive: true });
    });

    this.removeGestureListeners = () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, onUserGesture);
        document.removeEventListener(ev, onUserGesture);
      });
    };
  }

  // Single-click smart toggle: if music is not yet playing, clicking it TURNS IT ON immediately!
  public handleUserSoundClick(): boolean {
    this.initContext();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (!this.isMusicActive) {
      this.enabled = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("tanvir_sound_enabled", "true");
      }
      this.playBackgroundMusic();
      this.playBeep(880, 0.08, "sine");
    } else {
      this.enabled = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("tanvir_sound_enabled", "false");
      }
      this.stopBackgroundMusic();
    }

    this.notify();
    return this.isMusicActive;
  }

  public toggle(): boolean {
    return this.handleUserSoundClick();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isPlaying(): boolean {
    return this.isMusicActive;
  }

  public subscribe(cb: Listener): () => void {
    this.listeners.add(cb);
    cb(this.enabled, this.isMusicActive);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.enabled, this.isMusicActive));
  }

  public playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.playBeep(620, 0.04, "sine", 0.03);
    if (!this.isMusicActive) {
      this.playBackgroundMusic();
    }
  }

  public playHover() {
    if (!this.enabled) return;
    this.playBeep(440, 0.02, "triangle", 0.015);
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.05) {
    try {
      this.initContext();
      if (!this.ctx || this.ctx.state !== "running") return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }
}

export const sound = new SoundManager();
