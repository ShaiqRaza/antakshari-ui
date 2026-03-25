import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface GameTimerProps {
  duration: number; // in seconds
  onTimeout?: () => void;
}

export function GameTimer({ duration, onTimeout }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = timeLeft <= 10;

  const size = 128
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
  <div className="flex flex-col items-center gap-3 text-[10px] md:text-xs">
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-muted"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage / 100)}
          className="transition-all duration-1000"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {isUrgent ? (
              <>
                <stop offset="0%" stopColor="#FF0080" />
                <stop offset="100%" stopColor="#FF6600" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#B026FF" />
              </>
            )}
          </linearGradient>
        </defs>

      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-xl md:text-2xl font-bold ${isUrgent ? "text-primary animate-pulse" : "text-foreground"}`}>
            {timeLeft}
          </div>
          <div className="text-muted-foreground">seconds</div>
        </div>
      </div>

    </div>

    <div className="flex items-center gap-2 text-muted-foreground">
      <Clock className="w-3 h-3 md:w-4 md:h-4" />
      <span>Time remaining</span>
    </div>
  </div>
  );
}