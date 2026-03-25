import { Trophy, Medal, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';

interface LeaderboardEntry {
  id: string;
  username: string;
  totalWins: number;
  totalMatches: number;
  averageScore: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from backend
    // For now, we'll generate mock data and combine with localStorage users
    const generateLeaderboard = () => {
      const mockPlayers: LeaderboardEntry[] = [
        { id: '1', username: 'MusicMaster', totalWins: 142, totalMatches: 200, averageScore: 8.5423, rank: 1 },
        { id: '2', username: 'SongBird', totalWins: 128, totalMatches: 195, averageScore: 8.2156, rank: 2 },
        { id: '3', username: 'MelodyKing', totalWins: 115, totalMatches: 180, averageScore: 7.9387, rank: 3 },
        { id: '4', username: 'RhythmQueen', totalWins: 98, totalMatches: 165, averageScore: 7.7245, rank: 4 },
        { id: '5', username: 'BollywoodFan', totalWins: 87, totalMatches: 150, averageScore: 7.4892, rank: 5 },
        { id: '6', username: 'ClassicRock', totalWins: 76, totalMatches: 140, averageScore: 7.2634, rank: 6 },
        { id: '7', username: 'PopStar99', totalWins: 65, totalMatches: 128, averageScore: 6.9571, rank: 7 },
        { id: '8', username: 'IndieVibes', totalWins: 58, totalMatches: 115, averageScore: 6.7128, rank: 8 },
        { id: '9', username: 'JazzLover', totalWins: 52, totalMatches: 108, averageScore: 6.4563, rank: 9 },
        { id: '10', username: 'RapGod', totalWins: 45, totalMatches: 98, averageScore: 6.2319, rank: 10 },
      ];

      // Try to add real users from localStorage
      const usersData = localStorage.getItem('antakshari_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        
        users.forEach((user: any) => {
          const historyKey = `antakshari_history_${user.id}`;
          const historyData = localStorage.getItem(historyKey);
          
          if (historyData) {
            const history = JSON.parse(historyData);
            const totalMatches = history.length;
            const totalWins = history.filter((m: any) => m.position === 1).length;
            // Calculate average score with 4 decimal places (0-10 scale)
            const averageScore = totalMatches > 0 
              ? parseFloat((history.reduce((sum: number, m: any) => sum + m.score, 0) / totalMatches).toFixed(4))
              : 0;

            if (totalMatches > 0) {
              mockPlayers.push({
                id: user.id,
                username: user.username,
                totalWins,
                totalMatches,
                averageScore,
                rank: 0, // Will be assigned after sorting
              });
            }
          }
        });
      }

      // Sort by total wins, then by average score
      mockPlayers.sort((a, b) => {
        if (b.totalWins !== a.totalWins) {
          return b.totalWins - a.totalWins;
        }
        return b.averageScore - a.averageScore;
      });

      // Assign ranks
      mockPlayers.forEach((player, index) => {
        player.rank = index + 1;
      });

      return mockPlayers;
    };

    setLeaderboardData(generateLeaderboard());
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="md:w-6 md:h-6 w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="md:w-6 md:h-6 w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="md:w-6 md:h-6 w-5 h-5 text-orange-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
    if (rank === 3) return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/50';
    return 'bg-card border-border';
  };

  const getWinRate = (wins: number, total: number) => {
    return total > 0 ? Math.round((wins / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3">Global Leaderboard</h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Top performers ranked by total wins
          </p>
          
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-1 md:gap-4 mb-6 md:mb-8">
          <div className="bg-card border border-border rounded-xl p-2 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
              <h3 className="text-[8px] md:text-base font-semibold text-foreground">Total Players</h3>
            </div>
            <p className="text-base  md:text-3xl font-bold text-foreground">{leaderboardData.length}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-2 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
              <h3 className="text-[8px] md:text-base font-semibold text-foreground">Total Matches</h3>
            </div>
            <p className="text-base  md:text-3xl font-bold text-foreground">
              {leaderboardData.reduce((sum, p) => sum + p.totalMatches, 0)}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-2 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              <h3 className="text-[8px] md:text-base font-semibold text-foreground">Top Player</h3>
            </div>
            <p className="text-sm md:text-2xl font-bold text-foreground">
              {leaderboardData[0]?.username || 'N/A'}
            </p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-2 md:space-y-3">
          {leaderboardData.map((player) => (
            <div
              key={player.id}
              className={`border rounded-xl p-3 md:p-4 lg:p-6 transition-all hover:shadow-lg ${getRankBg(player.rank)}`}
            >
              <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                {/* Rank */}
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {getRankIcon(player.rank)}
                </div>

                {/* Username */}
                <div className="col-span-10 md:col-span-3">
                  <h3 className="font-bold text-foreground text-sm md:text-base lg:text-lg">{player.username}</h3>
                </div>

                {/* Stats */}
                <div className="col-span-12 md:col-span-8 grid grid-cols-4 gap-2 md:gap-4">
                  <div className="text-center">
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Wins</p>
                    <p className="text-sm md:text-base lg:text-lg lg:text-xl font-bold text-yellow-500">{player.totalWins}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Matches</p>
                    <p className="text-sm md:text-base lg:text-lg lg:text-xl font-bold text-cyan-500">{player.totalMatches}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Avg Score</p>
                    <p className="text-sm md:text-base lg:text-lg lg:text-xl font-bold text-pink-500">{player.averageScore}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Win Rate</p>
                    <p className="text-sm md:text-base lg:text-lg lg:text-xl font-bold text-purple-500">
                      {getWinRate(player.totalWins, player.totalMatches)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {leaderboardData.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">No data available</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Be the first to play and claim the top spot!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}