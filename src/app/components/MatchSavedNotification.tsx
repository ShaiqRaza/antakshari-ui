import { CheckCircle2, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MatchSavedNotificationProps {
  show: boolean;
  onHide: () => void;
}

export function MatchSavedNotification({ show, onHide }: MatchSavedNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onHide, 300); // Wait for fade out animation
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show && !isVisible) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-0.5">Match Saved!</h3>
          <p className="text-xs text-white/90">Your score has been recorded in your history</p>
        </div>
        <Trophy className="w-5 h-5 ml-auto opacity-80" />
      </div>
    </div>
  );
}
