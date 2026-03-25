import { Users, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface RoomCardProps {
  roomName: string;
  playerCount: number;
  maxPlayers: number;
  isPrivate?: boolean;
  onJoin: () => void;
}

const colorVariants = [
  { border: "border-primary/30 hover:border-primary", bg: "bg-primary/5", button: "bg-gradient-to-r from-primary to-accent-orange" },
  { border: "border-secondary/30 hover:border-secondary", bg: "bg-secondary/5", button: "bg-gradient-to-r from-secondary to-accent-purple" },
  { border: "border-accent-purple/30 hover:border-accent-purple", bg: "bg-accent-purple/5", button: "bg-gradient-to-r from-accent-purple to-primary" },
  { border: "border-accent/30 hover:border-accent", bg: "bg-accent/5", button: "bg-gradient-to-r from-accent to-accent-green" },
];

export function RoomCard({ roomName, playerCount, maxPlayers, isPrivate = false, onJoin }: RoomCardProps) {
  const isFull = playerCount >= maxPlayers;
  const colorIndex = roomName.length % colorVariants.length;
  const colors = colorVariants[colorIndex];

  return (
    <Card className={`p-6 bg-card ${colors.border} ${colors.bg} transition-all hover:scale-[1.02] hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-foreground">{roomName}</h3>
            {isPrivate && <Lock className="w-4 h-4 text-primary" />}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {playerCount}/{maxPlayers} Players
            </span>
          </div>
        </div>
      </div>
      <Button 
        onClick={onJoin} 
        disabled={isFull}
        className={`w-full ${colors.button} hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
      >
        {isFull ? "Room Full" : "Join Room"}
      </Button>
    </Card>
  );
}