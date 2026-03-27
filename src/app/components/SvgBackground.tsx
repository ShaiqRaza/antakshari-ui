type InstrumentPlacement = {
  type: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

type SvgBackgroundProps = {
  instrumentPlacements: InstrumentPlacement[];
};

export function SvgBackground({ instrumentPlacements }: SvgBackgroundProps) {
  return (
    <div className="xl:mt-[21px] px-auto flex justify-center items-center absolute inset-0 pointer-events-none opacity-[0.2] dark:opacity-[0.28] overflow-hidden">
              <svg className="lg:w-[90%] md:w-[80%] md:h-[100%] w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <g id="icon-note" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <circle cx="-7" cy="14" r="7" strokeWidth="2" />
                    <line x1="0" y1="14" x2="0" y2="-28" strokeWidth="2" />
                    <path d="M 0 -28 L 24 -22 L 24 6" strokeWidth="2" />
                    <circle cx="24" cy="6" r="7" strokeWidth="2" />
                  </g>
                  <g id="icon-mic" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <rect x="-12" y="-28" width="24" height="40" rx="12" strokeWidth="2" />
                    <line x1="0" y1="12" x2="0" y2="30" strokeWidth="2" />
                    <path d="M -18 30 Q 0 40 18 30" strokeWidth="2" />
                    <line x1="-8" y1="-14" x2="8" y2="-14" strokeWidth="1.25" />
                    <line x1="-8" y1="-6" x2="8" y2="-6" strokeWidth="1.25" />
                  </g>
                  <g id="icon-vinyl" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <circle cx="0" cy="0" r="34" strokeWidth="2" />
                    <circle cx="0" cy="0" r="24" strokeWidth="1.25" opacity="0.6" />
                    <circle cx="0" cy="0" r="14" strokeWidth="1.25" opacity="0.6" />
                    <circle cx="0" cy="0" r="5" strokeWidth="2" />
                  </g>
                  <g id="icon-piano" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <rect x="-24" y="-28" width="16" height="56" strokeWidth="2" />
                    <rect x="-8" y="-28" width="16" height="56" strokeWidth="2" />
                    <rect x="8" y="-28" width="16" height="56" strokeWidth="2" />
                    <rect x="-14" y="-28" width="10" height="34" strokeWidth="1.5" opacity="0.7" />
                    <rect x="2" y="-28" width="10" height="34" strokeWidth="1.5" opacity="0.7" />
                  </g>
                  <g id="icon-headphones" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <path d="M -28 -4 Q 0 -18 28 -4" strokeWidth="2.5" />
                    <rect x="-32" y="-4" width="12" height="22" rx="3" strokeWidth="2" />
                    <rect x="20" y="-4" width="12" height="22" rx="3" strokeWidth="2" />
                  </g>
                  <g id="icon-trumpet" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <path d="M -26 4 L 8 4 L 8 12 L -26 12 Z" strokeWidth="2" />
                    <path d="M 8 2 L 34 -8 L 34 24 L 8 14 Z" strokeWidth="2" />
                    <circle cx="-14" cy="8" r="2" strokeWidth="1" />
                    <circle cx="-6" cy="8" r="2" strokeWidth="1" />
                    <circle cx="2" cy="8" r="2" strokeWidth="1" />
                  </g>
                  <g id="icon-guitar" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <ellipse cx="10" cy="20" rx="22" ry="18" strokeWidth="2" />
                    <circle cx="10" cy="20" r="7" strokeWidth="1.5" />
                    <rect x="7" y="-26" width="6" height="34" strokeWidth="2" />
                    <line x1="8" y1="-26" x2="8" y2="30" strokeWidth="0.75" />
                    <line x1="10" y1="-26" x2="10" y2="30" strokeWidth="0.75" />
                    <line x1="12" y1="-26" x2="12" y2="30" strokeWidth="0.75" />
                  </g>
                  <g id="icon-drum" stroke="currentColor" fill="none" className="text-muted-foreground">
                    <ellipse cx="0" cy="-18" rx="22" ry="6" strokeWidth="2" />
                    <line x1="-22" y1="-18" x2="-22" y2="16" strokeWidth="2" />
                    <line x1="22" y1="-18" x2="22" y2="16" strokeWidth="2" />
                    <ellipse cx="0" cy="16" rx="22" ry="6" strokeWidth="2" />
                  </g>
                </defs>
    
                {instrumentPlacements.map((placement, index) => (
                  <use
                    key={`${placement.type}-${index}`}
                    href={`#icon-${placement.type}`}
                    transform={`translate(${placement.x} ${placement.y}) rotate(${placement.rotate}) scale(${placement.scale})`}
                  />
                ))}
              </svg>
            </div>
    );
}