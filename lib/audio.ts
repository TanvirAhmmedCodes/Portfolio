"use client";

type Listener = (enabled: boolean, isMusicPlaying: boolean) => void;

const XOR_KEY = 0x7A;
const TARGET_VOLUME = 0.35;

class SoundManager {
  private bgAudio: HTMLAudioElement | null = null;
  private blobUrl: string | null = null;
  private enabled: boolean = true;
  private isMusicActive: boolean = false;
  private listeners: Set<Listener> = new Set();
  private setupDone: boolean = false;
  private isPreparing: boolean = false;
  private ctx: AudioContext | null = null;
  private removeGestureListeners: (() => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tanvir_sound_enabled");
      this.enabled = stored === null ? true : stored === "true";
      this.setupGlobalAutoplay();
    }
  }

  // Pre-load, de-obfuscate in RAM, and create an in-memory Blob URL (100% IDM proof!)
  private async getAudioElement(): Promise<HTMLAudioElement | null> {
    if (typeof window === "undefined") return null;
    if (this.bgAudio) return this.bgAudio;
    if (this.isPreparing) return null;
    this.isPreparing = true;

    try {
      let res = await fetch("/soundtrack.bin", { cache: "force-cache" }).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch("/api/soundtrack", { cache: "force-cache" });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const arrayBuf = await res.arrayBuffer();
      const bytes = new Uint8Array(arrayBuf);

      // De-obfuscate in RAM (< 2ms)
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] ^= XOR_KEY;
      }

      // Create an internal memory Blob URL (Zero network request, IDM cannot intercept!)
      const blob = new Blob([bytes], { type: "audio/mpeg" });
      this.blobUrl = URL.createObjectURL(blob);

      const audio = new Audio(this.blobUrl);
      audio.loop = true;
      audio.volume = TARGET_VOLUME;
      audio.preload = "auto";

      audio.addEventListener("play", () => {
        this.isMusicActive = true;
        this.notify();
      });

      audio.addEventListener("pause", () => {
        this.isMusicActive = false;
        this.notify();
      });

      audio.addEventListener("ended", () => {
        this.isMusicActive = false;
        this.notify();
      });

      this.bgAudio = audio;
      return audio;
    } catch (err) {
      console.warn("Soundtrack preparation failed:", err);
      return null;
    } finally {
      this.isPreparing = false;
    }
  }

  public async playBackgroundMusic() {
    if (!this.enabled) return;

    const audio = await this.getAudioElement();
    if (!audio) return;

    try {
      audio.volume = TARGET_VOLUME;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isMusicActive = true;
        this.notify();
        if (this.removeGestureListeners) {
          this.removeGestureListeners();
          this.removeGestureListeners = null;
        }
      }
    } catch {
      // Autoplay blocked by browser policy; will unlock on first user gesture
    }
  }

  public stopBackgroundMusic() {
    if (this.bgAudio) {
      try {
        this.bgAudio.pause();
      } catch {}
    }
    this.isMusicActive = false;
    this.notify();
  }

  public setupGlobalAutoplay() {
    if (typeof window === "undefined" || this.setupDone) return;
    this.setupDone = true;

    // 1. Immediately attempt autoplay on open / refresh
    if (this.enabled) {
      this.playBackgroundMusic();

      if (document.readyState === "complete") {
        this.playBackgroundMusic();
      } else {
        window.addEventListener("load", () => this.playBackgroundMusic(), { once: true });
      }
      setTimeout(() => this.playBackgroundMusic(), 100);
      setTimeout(() => this.playBackgroundMusic(), 500);
    }

    // 2. Multi-gesture fallback for cold browser sessions
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
      if (this.enabled && !this.isMusicActive) {
        this.playBackgroundMusic();
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

  public handleUserSoundClick(): boolean {
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
    return this.enabled;
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
    this.playBeep(620, 0.04, "sine", 0.03);
    if (!this.isMusicActive) {
      this.playBackgroundMusic();
    }
  }

  public playHover() {
    if (!this.enabled) return;
    this.playBeep(440, 0.02, "triangle", 0.015);
  }

  private initSfxContext() {
    if (typeof window === "undefined" || this.ctx) return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.05) {
    try {
      this.initSfxContext();
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
