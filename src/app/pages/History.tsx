import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import { History as HistoryIcon, Trophy, Target, Calendar, Users, Award } from 'lucide-react';

export default function History() {
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <HistoryIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Match History</h1>
              <p className="text-muted-foreground">Welcome back, {user?.username}!</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-cyan-500" />
              <p className="text-xs text-muted-foreground">Total Matches</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalMatches}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalWins}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-pink-500" />
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{avgScore}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-500" />
              <p className="text-xs text-muted-foreground">Avg Position</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{avgPosition}</p>
          </div>
        </div>

        {/* Match History Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground mb-1">Recent Matches</h2>
            <p className="text-sm text-muted-foreground">
              Score = Average rating (1-10 scale) you received from other players in each match
            </p>
          </div>

          {matchHistory.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <HistoryIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No matches yet</h3>
              <p className="text-muted-foreground mb-6">
                Start playing to track your match history and scores!
              </p>
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Play Now
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Room Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Players
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {matchHistory.map((match) => (
                    <tr key={match.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(match.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          match.roomType === 'public' 
                            ? 'bg-cyan-500/20 text-cyan-500' 
                            : 'bg-purple-500/20 text-purple-500'
                        }`}>
                          {match.roomType === 'public' ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-2xl font-bold ${getPositionColor(match.position)}`}>
                          {getPositionBadge(match.position)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-semibold text-foreground">{match.score}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
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