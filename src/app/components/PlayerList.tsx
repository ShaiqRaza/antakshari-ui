import { Crown, Mic } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Player {
  id: string;
  username: string;
  score: number;
  isCurrentTurn?: boolean;
  avatar?: string;
}

interface PlayerListProps {
  players: Player[];
}

const playerColors = [
  "from-primary to-accent-orange",
  "from-secondary to-accent-purple",
  "from-accent to-accent-green",
  "from-accent-purple to-primary",
];

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="space-y-3">
      <h3 className="lg:text-lg md:text-base text-sm font-semibold text-foreground flex items-center gap-2 p-2 border-b border-border">
        <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent-green rounded-md flex items-center justify-center">
          <Crown className="w-4 h-4 text-white" />
        </div>
        Players
      </h3>
      <div className="space-y-3 md:text-xs text-[8px]">
        {players.map((player, index) => {
          const colorGradient = playerColors[index % playerColors.length];
          return (
            <div
              key={player.id}
              className={`flex items-center gap-1 py-1 px-2 rounded-lg transition-all ${
                player.isCurrentTurn
                  ? "bg-gradient-to-r from-primary/20 to-accent-orange/20 border border-primary/50 scale-105 shadow-lg shadow-primary/20"
                  : "bg-muted/50 hover:bg-muted/70"
              }`}
            >
              <Avatar className={`lg:w-10 lg:h-10 md:h-8 md:w-8 h-6 w-6 border-2 ${player.isCurrentTurn ? 'border-primary' : 'border-transparent'}`}>
                <AvatarFallback className={`bg-gradient-to-br ${colorGradient} text-white font-semibold lg:text-sm md:text-xs text-[6px] p-1`}>
                  {player.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{player.username}</span>
                  {player.isCurrentTurn && (
                    <div className="w-5 h-5 bg-gradient-to-br from-primary to-accent-orange rounded-full flex items-center justify-center animate-pulse">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-muted-foreground">Score: {player.score}</div>
              </div>
              <div className={`text-lg font-bold ${
                index === 0 ? "text-primary" :
                index === 1 ? "text-secondary" :
                index === 2 ? "text-accent-purple" :
                "text-accent"
              }`}>#{index + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}