import { Trophy } from "lucide-react";
import { Card } from "./ui/card";

interface ScoreEntry {
  username: string;
  score: number;
  avatar?: string;
}

interface ScoreboardProps {
  scores: ScoreEntry[];
}

export function Scoreboard({ scores }: ScoreboardProps) {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-green rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Scoreboard</h3>
      </div>
      <div className="space-y-3">
        {sortedScores.map((entry, index) => (
          <div
            key={entry.username}
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              index === 0
                ? "bg-gradient-to-r from-primary/10 to-accent-orange/10 border border-primary/30"
                : index === 1
                ? "bg-gradient-to-r from-secondary/10 to-accent-purple/10 border border-secondary/30"
                : index === 2
                ? "bg-gradient-to-r from-accent/10 to-accent-green/10 border border-accent/30"
                : "bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md ${
                  index === 0
                    ? "bg-gradient-to-br from-primary to-accent-orange text-white"
                    : index === 1
                    ? "bg-gradient-to-br from-secondary to-accent-purple text-white"
                    : index === 2
                    ? "bg-gradient-to-br from-accent to-accent-green text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span className="font-medium text-foreground">{entry.username}</span>
            </div>
            <div
              className={`text-xl font-bold ${
                index === 0 ? "text-primary" :
                index === 1 ? "text-secondary" :
                index === 2 ? "text-accent" :
                "text-foreground"
              }`}
            >
              {entry.score}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}