import React from "react";
import {
  Code,
  Terminal,
  Cpu,
  Globe,
  Database,
  GitBranch,
  ShieldAlert,
  Laptop,
  Server,
  Layers,
  FileCode,
  Box,
  Activity
} from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  // Return custom SVGs or Lucide icons based on skill name
  switch (name.toLowerCase()) {
    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M1.5 0h21C23.322 0 24 .678 24 1.5v21c0 .822-.678 1.5-1.5 1.5h-21C.678 24 0 23.322 0 22.5v-21C0 .678.678 0 1.5 0zM13 16.5v-1.2h2.3c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.9 0-.4-.1-.7-.3-.9-.2-.2-.5-.3-.9-.3h-2.3v-4.8h4.7v1.2H14v1.5h2.2c.8 0 1.4.2 1.9.6.5.4.7 1 .7 1.8 0 .5-.1 1-.3 1.4-.2.4-.6.8-1 1-.4.3-.9.4-1.5.4H13zm-3.2 1.5c-1.1 0-2-.3-2.7-.8-.7-.5-1.1-1.2-1.3-2.1h1.4c.2.6.5 1 1 1.3.4.3 1 .4 1.6.4.7 0 1.2-.1 1.5-.4.3-.3.5-.7.5-1.2 0-.4-.1-.7-.4-.9-.3-.2-.8-.4-1.5-.6l-.8-.2c-.9-.3-1.6-.6-2-1-.4-.4-.6-1-.6-1.7 0-.7.3-1.3.9-1.8.6-.5 1.4-.7 2.4-.7.9 0 1.7.2 2.3.7.6.5 1 1.1 1.2 1.8l-1.3.5c-.2-.5-.4-.9-.8-1.2-.4-.3-.9-.4-1.4-.4-.6 0-1 .1-1.3.3-.3.2-.4.5-.4.8 0 .3.1.6.4.8.3.2.7.4 1.3.5l.9.3c1 .3 1.8.7 2.2 1.1.4.4.6 1 .6 1.7 0 .8-.3 1.4-.9 1.9-.6.5-1.5.8-2.6.8z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M3 3h18v18H3V3zm15.15 13.92c.32-.52.54-1.12.64-1.8h-1.72c-.12.35-.3.65-.54.9-.24.25-.55.38-.93.38-.45 0-.8-.15-1.05-.45-.25-.3-.38-.75-.38-1.35v-4.5h1.72v4.2c0 .32.07.56.22.72.15.16.37.24.66.24.3 0 .55-.1.75-.3.2-.2.35-.48.45-.84zM10.8 14.8c.18.28.42.5.72.66.3.16.65.24 1.05.24.45 0 .82-.1 1.12-.3.3-.2.53-.48.69-.84.16-.36.24-.78.24-1.26V9.7h-1.72v3.75c0 .3-.07.54-.22.72-.15.18-.36.27-.63.27-.27 0-.48-.09-.63-.27-.15-.18-.22-.42-.22-.72V9.7H9.1v3.84c0 .48.08.9.24 1.26z"/>
        </svg>
      );
    case "python":
      return <Cpu className={className} />;
    case "c":
    case "c++":
      return <FileCode className={className} />;
    case "node.js":
    case "express":
      return <Server className={className} />;
    case "tailwind css":
    case "html":
    case "css":
      return <Layers className={className} />;
    case "mongodb":
    case "postgresql":
      return <Database className={className} />;
    case "git":
    case "github":
      return <GitBranch className={className} />;
    case "linux":
    case "vs code":
      return <Terminal className={className} />;
    case "artificial intelligence":
    case "machine learning":
      return <Cpu className={className} />;
    case "cybersecurity":
      return <ShieldAlert className={className} />;
    default:
      return <Globe className={className} />;
  }
}
