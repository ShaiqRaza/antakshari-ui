export function AnimatedMusicIcon() {
  return (
    <div className="relative w-10 h-10">
      {/* Guitar Body */}
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Guitar body */}
        <ellipse
          cx="20"
          cy="25"
          rx="12"
          ry="10"
          className="fill-gradient-to-br from-primary to-accent-orange"
          style={{
            fill: "url(#guitarGradient)",
          }}
        />
        
        {/* Sound hole */}
        <circle
          cx="20"
          cy="25"
          r="4"
          className="fill-background"
        />
        
        {/* Neck */}
        <rect
          x="18"
          y="5"
          width="4"
          height="15"
          className="fill-accent"
          style={{
            fill: "url(#neckGradient)",
          }}
        />
        
        {/* Frets */}
        <line x1="18" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="0.5" className="text-background" />
        <line x1="18" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="0.5" className="text-background" />
        <line x1="18" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="0.5" className="text-background" />
        <line x1="18" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="0.5" className="text-background" />
        
        {/* Animated strings */}
        <g className="origin-center">
          <line
            x1="19"
            y1="5"
            x2="18"
            y2="30"
            stroke="url(#stringGradient1)"
            strokeWidth="0.5"
            className="animate-[wiggle_0.3s_ease-in-out_infinite]"
            style={{
              animation: "wiggle 0.3s ease-in-out infinite",
            }}
          />
          <line
            x1="20"
            y1="5"
            x2="20"
            y2="30"
            stroke="url(#stringGradient2)"
            strokeWidth="0.5"
            className="animate-[wiggle_0.35s_ease-in-out_infinite]"
            style={{
              animation: "wiggle 0.35s ease-in-out infinite 0.1s",
            }}
          />
          <line
            x1="21"
            y1="5"
            x2="22"
            y2="30"
            stroke="url(#stringGradient3)"
            strokeWidth="0.5"
            className="animate-[wiggle_0.4s_ease-in-out_infinite]"
            style={{
              animation: "wiggle 0.4s ease-in-out infinite 0.2s",
            }}
          />
        </g>

        {/* Animated music notes */}
        <g className="animate-[float_2s_ease-in-out_infinite]">
          <circle cx="10" cy="15" r="1.5" className="fill-secondary" opacity="0.8">
            <animate
              attributeName="cy"
              values="15;10;15"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <rect x="11.5" y="10" width="0.5" height="5" className="fill-secondary" opacity="0.8">
            <animate
              attributeName="y"
              values="10;5;10"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        <g className="animate-[float_2s_ease-in-out_infinite]">
          <circle cx="30" cy="18" r="1.5" className="fill-accent-purple" opacity="0.8">
            <animate
              attributeName="cy"
              values="18;13;18"
              dur="2.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <rect x="31.5" y="13" width="0.5" height="5" className="fill-accent-purple" opacity="0.8">
            <animate
              attributeName="y"
              values="13;8;13"
              dur="2.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="guitarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3366" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="stringGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00C9FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="stringGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF3366" />
            <stop offset="100%" stopColor="#FFB800" />
          </linearGradient>
          <linearGradient id="stringGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent-purple blur-md opacity-30 animate-pulse rounded-[3px]" />
      
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-0.5px); }
          75% { transform: translateX(0.5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
