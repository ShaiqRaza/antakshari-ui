import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { AnimatedMusicIcon } from './AnimatedMusicIcon';
import { LogIn, LogOut, User, Trophy } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className=" text-foreground sticky top-4 z-50 bg-card/80 backdrop-blur-lg border-b border-border rounded-lg w-[90%] mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:h-16 h-12">
          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4"><Link
              to="/"
              className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              <span className="text-xs md:text-sm font-[Fredoka_One]">Home</span>
            </Link>
            {/* Leaderboard Link - Always visible */}
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              <Trophy className="w-4 h-4" />
              <span className="md:inline hidden text-xs md:text-sm font-[Fredoka_One]">Leaderboard</span>
            </Link>

            {isAuthenticated ? (
              <>
                {/* Profile Link */}
                <Link
                  to={`/profile/${user?.username}`}
                  className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  <User className="md:inline hidden w-4 h-4" />
                  <span className="text-xs md:text-sm font-[Fredoka_One]">{user?.username}</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-muted transition-colors hover:text-foreground"
                >
                  <LogOut className="md:inline hidden w-4 h-4" />
                  <span className="text-xs md:text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  <LogIn className="md:inline hidden w-4 h-4" />
                  <span className="text-xs md:text-sm font-[Fredoka_One]">Login</span>
                </Link>

                {/* Signup Button */}
                <Link
                  to="/signup"
                  className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 text-white hover:opacity-90 transition-opacity"
                >
                  <span className="text-xs md:text-sm font-[Fredoka_One]">Sign Up</span>
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </nav>
  );
}