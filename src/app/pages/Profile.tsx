import { Music, ArrowLeft, Trophy, Target, TrendingUp, Calendar, Star, History as HistoryIcon, Users, Award } from "lucide-react";
import { Link, useParams, Navigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { ThemeToggle } from "../components/ThemeToggle";
import { AnimatedMusicIcon } from "../components/AnimatedMusicIcon";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

// Mock data
const mockProfile = {
  username: "MusicLover",
  avatar: "",
  totalGames: 127,
  averageScore: 425,
  totalPoints: 53975,
  winRate: 68,
  favoriteGenre: "Bollywood",
  memberSince: "January 2025",
};

const mockGameHistory = [
  { id: "1", roomName: "Music Masters", score: 480, rank: 1, date: "2 hours ago" },
  { id: "2", roomName: "Bollywood Beats", score: 390, rank: 3, date: "5 hours ago" },
  { id: "3", roomName: "Classic Melodies", score: 510, rank: 1, date: "1 day ago" },
  { id: "4", roomName: "Party Vibes", score: 340, rank: 4, date: "2 days ago" },
  { id: "5", roomName: "Retro Night", score: 460, rank: 2, date: "3 days ago" },
];

const mockAchievements = [
  { id: "1", name: "First Victory", description: "Won your first game", earned: true },
  { id: "2", name: "Century Club", description: "Played 100 games", earned: true },
  { id: "3", name: "Perfect Score", description: "Got maximum points in a round", earned: true },
  { id: "4", name: "Speed Demon", description: "Answered in under 5 seconds", earned: false },
  { id: "5", name: "Social Butterfly", description: "Played with 50 different players", earned: true },
  { id: "6", name: "Master Singer", description: "Win 100 games", earned: false },
];

export function Profile() {
  const { username } = useParams();
  const { user, isAuthenticated, matchHistory, getUserStats } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const totalMatches = matchHistory.length;
  const totalWins = matchHistory.filter(m => m.position === 1).length;
  const avgScore = totalMatches > 0 
    ? (matchHistory.reduce((sum, m) => sum + m.score, 0) / totalMatches).toFixed(4)
    : '0.0000';
  const avgPosition = totalMatches > 0
    ? (matchHistory.reduce((sum, m) => sum + m.position, 0) / totalMatches).toFixed(1)
    : '0.0';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-500';
    if (position === 2) return 'text-gray-400';
    if (position === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <Navbar />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-4 md:p-8 bg-card border-2 border-transparent bg-gradient-to-br from-primary/5 via-secondary/5 to-accent-purple/5 mb-6 md:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative z-10">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary/50 shadow-xl shadow-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-accent-purple text-white text-3xl md:text-4xl font-bold">
                {user?.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{user?.username}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-muted-foreground mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Joined {mockProfile.memberSince}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">Loves {mockProfile.favoriteGenre}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                <div className="px-3 md:px-4 py-2 bg-gradient-to-br from-primary/20 to-accent-orange/20 rounded-lg border border-primary/30 shadow-md">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">{totalMatches}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">Games Played</div>
                </div>
                <div className="px-3 md:px-4 py-2 bg-gradient-to-br from-secondary/20 to-accent-purple/20 rounded-lg border border-secondary/30 shadow-md">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary to-accent-purple bg-clip-text text-transparent">{avgScore}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">Avg Score</div>
                </div>
                <div className="px-3 md:px-4 py-2 bg-gradient-to-br from-accent/20 to-accent-green/20 rounded-lg border border-accent/30 shadow-md">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent to-accent-green bg-clip-text text-transparent">{totalWins}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">Wins</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-card border border-border rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
              <p className="text-[10px] md:text-xs text-muted-foreground">Total Matches</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{totalMatches}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <p className="text-[10px] md:text-xs text-muted-foreground">Wins</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{totalWins}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
              <p className="text-[10px] md:text-xs text-muted-foreground">Avg Score</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{avgScore}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
              <p className="text-[10px] md:text-xs text-muted-foreground">Avg Position</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{avgPosition}</p>
          </div>
        </div>

        {/* Match History Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">Match History</h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Score = Average rating (0-10 scale) you received from other players in each match
            </p>
          </div>

          {matchHistory.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <HistoryIcon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">No matches yet</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Start playing to track your match history and scores!
              </p>
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Play Now
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Room Type
                    </th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Players
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {matchHistory.map((match) => (
                    <tr key={match.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                          <span className="hidden md:inline">{formatDate(match.date)}</span>
                          <span className="md:hidden text-xs">{new Date(match.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold ${
                          match.roomType === 'public' 
                            ? 'bg-cyan-500/20 text-cyan-500' 
                            : 'bg-purple-500/20 text-purple-500'
                        }`}>
                          {match.roomType === 'public' ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className={`text-xl md:text-2xl font-bold ${getPositionColor(match.position)}`}>
                          {getPositionBadge(match.position)}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className="text-base md:text-lg font-semibold text-foreground">{match.score}</span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                          <Users className="w-3 h-3 md:w-4 md:h-4" />
                          {match.totalPlayers}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}