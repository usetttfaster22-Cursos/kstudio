import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'stacked' | 'symbol';
  className?: string;
  height?: number;
}

export default function Logo({ variant = 'navbar', className = '', height = 40 }: LogoProps) {
  // SVG gradients and filter setup
  const glowFilterId = "circadian-glow";
  const gradId = "circadian-gradient";

  const renderSymbol = (h: number) => {
    // Width is roughly 0.75 of height for the visual emblem
    const w = Math.round(h * 0.75);
    
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block align-middle select-none overflow-visible"
      >
        <defs>
          {/* Circadian spectrum linear gradient: dark indigo -> daylight blue -> pure white -> warm sunset orange */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Glowing drop shadow to simulate active human-centric illumination */}
          <filter id={glowFilterId} x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer dark background representing the dark void of spaces before lighting design */}
        <rect x="5" y="5" width="110" height="150" fill="#0c0a09" rx="2" />

        {/* The Circadian Column: glowing vertical line representing light spectrum */}
        <line
          x1="45"
          y1="5"
          x2="45"
          y2="155"
          stroke={`url(#${gradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          filter={`url(#${glowFilterId})`}
        />

        {/* Minimalist white K lines */}
        {/* Upper diagonal */}
        <line
          x1="45"
          y1="80"
          x2="85"
          y2="40"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Lower diagonal */}
        <line
          x1="45"
          y1="80"
          x2="85"
          y2="125"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Degree Circle Symbol '°' representing K° (Kelvin Color Temperature) */}
        <circle
          cx="92"
          cy="32"
          r="6"
          stroke="#ffffff"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    );
  };

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderSymbol(height)}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col border border-outline-variant/50 shadow-2xl overflow-hidden select-none bg-white ${className}`}>
        {/* Top Dark area with the emblem symbol */}
        <div className="bg-[#0c0a09] p-4 flex items-center justify-center">
          {renderSymbol(height)}
        </div>
        {/* Bottom White Area with the text "STUDIO" */}
        <div className="bg-white py-3.5 px-4 text-center">
          <div className="font-display text-sm tracking-[0.35em] font-bold text-black uppercase pl-[0.35em] leading-none">
            STUDIO
          </div>
        </div>
      </div>
    );
  }

  // Default navbar variant: horizontal layout symbol + K° STUDIO text
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {renderSymbol(height)}
      <div className="flex flex-col justify-center text-left">
        <span className="font-display text-lg tracking-tight font-bold text-on-surface leading-none flex items-center">
          K°
        </span>
        <span className="font-display text-xs tracking-[0.35em] font-medium text-on-surface-variant leading-none mt-1 uppercase">
          STUDIO
        </span>
      </div>
    </div>
  );
}
