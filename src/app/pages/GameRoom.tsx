import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageCircle, Send, LogOut, Share2, CheckCircle2 } from "lucide-react";
import { useUsername } from "../contexts/UsernameContext";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { PlayerList } from "../components/PlayerList";
import { GameTimer } from "../components/GameTimer";
import { VoiceRecorder } from "../components/VoiceRecorder";

// Mock data for other players (not the current user)
const otherMockPlayers = [
  {
    id: "2",
    username: "SongBird",
    score: 7.8234,
    isCurrentTurn: false,
  },
  {
    id: "3",
    username: "MelodyKing",
    score: 7.2156,
    isCurrentTurn: false,
  },
  {
    id: "4",
    username: "BeatMaster",
    score: 6.5387,
    isCurrentTurn: false,
  },
];

const mockMessages = [
  {
    id: "1",
    username: "SongBird",
    message: "Great song choice!",
  },
  {
    id: "2",
    username: "MelodyKing",
    message: "This is so fun!",
  },
  {
    id: "3",
    username: "BeatMaster",
    message: "Good luck everyone!",
  },
];

export function GameRoom() {
  const LOCAL_PLAYER_ID = "1";
  const TURN_DURATION_SECONDS = 60;
  
  const [chatMessage, setChatMessage] = useState("");
  const [currentLetter, setCurrentLetter] = useState("P");
  const [copied, setCopied] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number | null>>({});
  const [turnIndex, setTurnIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION_SECONDS);
  const { username } = useUsername();
  const navigate = useNavigate();
  const params = useParams<{ roomId?: string; roomType?: string; roomCode?: string }>();

  // Support both URL patterns: /room/:roomId and /room/:roomType/:roomCode
  const roomId = params.roomId || (params.roomType && params.roomCode ? `${params.roomType}_${params.roomCode}` : "");
  
  // Check if this is a private room
  const isPrivateRoom = roomId?.startsWith("private_") || params.roomType === "private";
  const roomLink = `${window.location.origin}/room/${roomId}`;

  // Create players list with actual username as the current player
  const playerOrder = useMemo(
    () => [
      {
        id: "1",
        username: username || "Player",
      },
      ...otherMockPlayers.map((p) => ({ id: p.id, username: p.username })),
    ],
    [username],
  );

  const players = useMemo(
    () =>
      playerOrder.map((player, index) => ({
        ...player,
        score: otherMockPlayers.find((p) => p.id === player.id)?.score ?? 8.4562,
        isCurrentTurn: index === turnIndex,
      })),
    [playerOrder, turnIndex],
  );

  // Get current player and check if it's the local player
  const currentPlayer = players.find((p) => p.isCurrentTurn);
  const isMyTurn = currentPlayer?.id === LOCAL_PLAYER_ID;

  const handleScoreSelect = (playerId: string, score: number) => {
    setRatings((prev) => ({ ...prev, [playerId]: score }));
  };

  // Timer and turn progression logic
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) {
        // Time's up, move to next player
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        setCurrentLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
        setTurnIndex((prev) => (prev + 1) % playerOrder.length);
        setTimeLeft(TURN_DURATION_SECONDS);
        setRatings({});
        return;
      }

      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft, playerOrder.length]);

  const handleLeaveRoom = () => {
    navigate("/");
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  };

  const handleCopyLink = () => {
    // Use fallback method directly to avoid clipboard API errors
    fallbackCopyTextToClipboard(roomLink);
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

      <div className="container mx-auto lg:p-6 md:p-4 p-2 lg:text-base md:text-sm text-xs pb-4 md:pb-8 relative md:static">
        {/* Responsive Layout: Mobile - Middle top, Players/Chat bottom | Desktop - Players left, Middle center, Chat right */}
        <div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 relative">
          {/* Player List with Scores - Bottom Left on Mobile, Far Left on Desktop */}
          <div className="col-span-6 md:col-span-4 order-2 md:order-1">
            <Card className="lg:py-4 md:py-3 lg:px-8 md:px-4 p-1 bg-card border-border md:h-[450px] h-[300px]">
              <PlayerList players={players} />
            </Card>
          </div>

          {/* Middle Sections - Top on Mobile, Center on Desktop */}
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 space-y-2 md:space-y-4 lg:space-y-6">
            {/* Current Letter Display */}
            <Card className="p-3 md:p-6 bg-card border-2 border-transparent bg-gradient-to-br from-primary/10 via-secondary/10 to-accent-purple/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-purple/5 animate-pulse" />
              <div className="relative z-10">
                <div className="mb-3">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">
                    Sing a song starting with
                  </p>
                  <div className="lg:w-28 lg:h-28 md:w-24 md:h-24 w-16 h-16  mx-auto bg-gradient-to-br from-primary via-secondary to-accent-purple rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                    <span className="lg:text-6xl md:text-4xl text-2xl font-bold text-white">
                      {currentLetter}
                    </span>
                  </div>
                </div>
                <div className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-[#2e2b0542]">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {currentPlayer?.username || "Player"}
                    </span>
                    's Turn
                  </span>
                </div>
              </div>
            </Card>

            {/* Timer and Voice Recorder */}
            <Card className="md:p-6 p-4 bg-card border-border">
              <div className="grid grid-cols-2 gap-6">
                <GameTimer
                  duration={TURN_DURATION_SECONDS}
                  timeLeft={timeLeft}
                />
                <VoiceRecorder
                  onRecordingComplete={(blob) =>
                    console.log("Recording complete", blob)
                  }
                />
              </div>
            </Card>
          </div>

          {/* Chat Panel - Bottom Right on Mobile, Far Right on Desktop */}
          <div className="col-span-6 md:col-span-4 order-3 md:order-3 md:text-xs text-[8px]">
            <Card className="lg:p-4 md:p-3 p-1 bg-card border-border md:h-[450px] h-[300px] ">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3 p-2 border-b border-border">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h3 className="font-normal text-foreground lg:text-lg md:text-base text-sm">
                    Chat
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-2">
                      <div className="flex-1 min-w-0 border-b border-border">
                        <div className="font-semibold text-foreground">
                          {msg.username}
                        </div>
                        <div className="text-muted-foreground break-words">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center md:gap-2 gap-1 lg:text-base md:text-sm text-[8px]">
                  <Input
                    value={chatMessage}
                    onChange={(e) =>
                      setChatMessage(e.target.value)
                    }
                    placeholder="Type a message..."
                    className="flex-1 p-1 md:text-sm text-[10px]"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-foreground hover:text-primary flex-shrink-0"
                    onClick={() =>
                      console.log("Send:", chatMessage)
                    }
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Scoring Section - Full Width Below Grid */}
        {!isMyTurn && (
          <div className="mt-8 md:mt-0 md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-4/5 lg:w-3/5 md:z-20">
            <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-green-500/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-5 border border-border/60 shadow-2xl md:shadow-xl">
              <div className="mb-3 md:mb-2">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-0.5">Rate {currentPlayer?.username}</h3>
              </div>
              
              <div className="flex items-center justify-between gap-2 md:gap-1.5">
                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground whitespace-nowrap">😞</span>
                
                <div className="grid grid-cols-11 gap-1 flex-1">
                  {Array.from({ length: 11 }, (_, score) => {
                    const hue = 8 + score * 12;
                    const isSelected = ratings[currentPlayer?.id || ""] === score;
                    const lightness = isSelected ? 48 : 90;
                    const saturation = isSelected ? 85 : 65;
                    
                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => handleScoreSelect(currentPlayer?.id || "", score)}
                        className={`relative h-7 md:h-8 rounded-lg font-bold text-[10px] transition-all duration-200 ${
                          isSelected
                            ? "scale-105 shadow-lg text-white ring-1 ring-white/50"
                            : "hover:scale-110 hover:shadow-md text-foreground/70"
                        }`}
                        style={{
                          backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                          color: isSelected ? 'white' : `hsl(${hue}, 55%, 35%)`,
                        }}
                        title={`Rate ${score}/10`}
                      >
                        {score}
                      </button>
                    );
                  })}
                </div>
                
                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground whitespace-nowrap">🤩</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leave Room Button - At Bottom of Page */}
      <div className="container mx-auto px-4 mt-2 pb-8 flex justify-center gap-4">
        {/* Copy Link Button - Only show for private rooms */}
        {isPrivateRoom && (
          <Button
            size="lg"
            onClick={handleCopyLink}
            className={`${
              copied
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-secondary to-accent-purple hover:opacity-90"
            } text-white shadow-lg transition-all px-8`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Link Copied!
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 mr-2" />
                Share Room Link
              </>
            )}
          </Button>
        )}
        
        <Button
          size="lg"
          variant="destructive"
          onClick={handleLeaveRoom}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Leave Room
        </Button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
