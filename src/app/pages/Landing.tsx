import { Music, Users, Trophy, Zap, Play, Lock, Mail, Github, Mic, MessageCircle, Target, Star, TrendingUp, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ThemeToggle } from "../components/ThemeToggle";
import { AnimatedMusicIcon } from "../components/AnimatedMusicIcon";
import { CategorySelectionModal } from "../components/CategorySelectionModal";
import { useUsername } from "../contexts/UsernameContext";
import { Navbar } from "../components/Navbar";
import { SvgBackground } from "../components/SvgBAckground";

export function Landing() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const { setUsername } = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    // Load username from localStorage on mount
    const savedUsername = localStorage.getItem("antakshari_username");
    if (savedUsername) {
      setLocalUsername(savedUsername);
      setUsername(savedUsername);
    }
  }, [setUsername]);

  const handlePlayClick = () => {
    const trimmedUsername = localUsername.trim();
    
    if (!trimmedUsername) {
      setUsernameError("Please enter your name first");
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setUsernameError("Name must be at least 2 characters");
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setUsernameError("Name must be 20 characters or less");
      return;
    }
    
    // Save username
    localStorage.setItem("antakshari_username", trimmedUsername);
    setUsername(trimmedUsername);
    setUsernameError("");
    
    // Show category selection modal
    setShowCategoryModal(true);
  };

  const handlePrivateRoomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const trimmedUsername = localUsername.trim();
    
    if (!trimmedUsername) {
      setUsernameError("Please enter your name first");
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setUsernameError("Name must be at least 2 characters");
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setUsernameError("Name must be 20 characters or less");
      return;
    }
    
    // Save username
    localStorage.setItem("antakshari_username", trimmedUsername);
    setUsername(trimmedUsername);
    setUsernameError("");
    
    // Generate a private room ID and navigate directly to the game room
    const privateRoomId = "private_" + Math.random().toString(36).substring(2, 10);
    navigate(`/room/${privateRoomId}`);
  };

  const instrumentTypes = ["note", "mic", "vinyl", "piano", "headphones", "trumpet", "guitar", "drum"] as const;
  const xPositions = Array.from({ length: 16 }, (_, i) => 80 + i * 112);
  const yPositions = Array.from({ length: 12 }, (_, i) => 80 + i * 85);

  const instrumentPlacements = yPositions.flatMap((y, row) =>
    xPositions.map((x, col) => ({
      x: x + (row % 2 === 0 ? 0 : 28),
      y,
      rotate: ((row * 7 + col * 5) % 16) - 8,
      scale: 0.62 + ((row + col) % 3) * 0.05,
      type: instrumentTypes[(row * 3 + col) % instrumentTypes.length],
    })),
  );

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden">

      {/* Navbar */}
      <Navbar />
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center mt-[32px] mb-[72px] relative">
        {/* Musical Background Pattern - Only in Hero Section */}
        <SvgBackground instrumentPlacements={instrumentPlacements} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block mb-3 sm:mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent-purple/20 border border-primary/30 rounded-full">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent text-[10px] sm:text-xs md:text-sm font-medium">🎵 Real-Time Multiplayer Music Game</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-1 leading-tight px-2 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <span className="inline-block transform scale-100 sm:scale-125 md:scale-150 lg:scale-[2] flex-shrink-0">
              <AnimatedMusicIcon />
            </span>
            <span className="bg-gradient-to-r from-primary/90 via-secondary/80 to-accent-purple/90 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
              Antakshari Live
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
            A place to discover your singing potential
          </p>
          
          {/* Username Input - Directly on page */}
          <div className="max-w-md mx-auto mb-2 md:mb-4 px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Enter your name (e.g., MusicLover123)"
                value={localUsername}
                onChange={(e) => {
                  setLocalUsername(e.target.value);
                  setUsernameError("");
                }}
                className={`pl-2 text-xs md:text-sm py-2 border-2 ${
                  usernameError ? "border-red-500" : "border-primary/30"
                } hover:border-primary transition-colors bg-card/50 backdrop-blur-sm`}
                maxLength={20}
              />
            </div>
            {usernameError && (
              <p className="text-sm text-red-500 font-medium">{usernameError}</p>
            )}
            <p className="text-xs text-muted-foreground text-right mt-1">
              {localUsername.length}/20 characters
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 justify-center px-4">
            <Button 
              size="lg" 
              onClick={handlePlayClick}
              className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-primary to-accent-orange text-white text-sm sm:text-base md:text-lg hover:text-base hover:sm:text-lg hover:md:text-xl shadow-lg shadow-primary/30 px-8 sm:px-12 md:px-[48px] py-5 sm:py-6 md:py-[24px]"
            >
              Play!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handlePrivateRoomClick}
              className="cursor-pointer w-full sm:w-auto border-2 border-secondary text-secondary hover:text-secondary text-sm sm:text-base md:text-lg hover:text-base hover:sm:text-lg hover:md:text-xl px-6 sm:px-7 md:px-8 py-5 sm:py-6 md:py-6"
            >
              <Lock className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2" />
              Create Private Room
            </Button>
          </div>
        </div>
      </section>

      {/* Category Selection Modal */}
      <CategorySelectionModal 
        open={showCategoryModal} 
        onOpenChange={setShowCategoryModal}
      />

      {/* Catchy Taglines Section */}
      <section className="container mx-auto px-[16px] py-[32px]">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 to-accent-orange/10 border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent-orange/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-primary to-accent-orange rounded-full flex items-center justify-center shadow-lg">
                <Mic className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent mb-2 md:mb-3">
                Challenge Your Voice
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Step up to the mic and showcase your singing talent. Every performance is a chance to shine!
              </p>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gradient-to-br from-secondary/10 to-accent-purple/10 border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent-purple/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-secondary to-accent-purple rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary to-accent-purple bg-clip-text text-transparent mb-2 md:mb-3">
                Get Real Feedback
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Receive instant ratings from fellow music lovers. Improve with every game and grow your skills!
              </p>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-gradient-to-br from-accent/10 to-accent-green/10 border-2 border-accent/30 hover:border-accent/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/20 text-center relative overflow-hidden sm:col-span-2 md:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-accent-green/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-accent to-accent-green rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent to-accent-green bg-clip-text text-transparent mb-2 md:mb-3">
                Check Your Potential
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                This is the place to discover what you're truly capable of. Push your limits and rise to the top!
              </p>
            </div>
          </Card>
        </div>

        {/* Additional Motivational Quotes */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto space-y-4 md:space-y-6">
          

          
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { step: 1, title: "Join a Room", desc: "Choose a public room or create your own private game", icon: Users, color: "primary" },
            { step: 2, title: "Get Your Letter", desc: "Receive a random starting letter for your song", icon: Music, color: "secondary" },
            { step: 3, title: "Sing Your Song", desc: "Record yourself singing a song starting with that letter", icon: Play, color: "accent-purple" },
            { step: 4, title: "Get Feedback", desc: "Other players rate your performance and you earn points", icon: Trophy, color: "accent" },
          ].map(({ step, title, desc, icon: Icon, color }) => (
            <Card key={step} className={`p-8 md:p-6 md:m-0 my-4 mx-6 bg-card border-${color}/30 hover:border-${color} transition-all hover:scale-[1.02]`}>
              <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-br ${
                color === "primary" ? "from-primary to-accent-orange" :
                color === "secondary" ? "from-secondary to-accent-purple" :
                color === "accent-purple" ? "from-accent-purple to-primary" :
                "from-accent to-accent-green"
              } rounded-full flex items-center justify-center shadow-lg`}>
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className={`text-2xl md:text-3xl font-bold ${ color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : color === "accent-purple" ? "text-accent-purple" : "text-accent" } text-center`}>{step}</div>
              <h3 className="text-base md:text-lg font-semibold text-foreground text-center">{title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground text-center">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">Why Play with Us?</h2>
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent-orange rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Zap className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">Real-Time Gameplay</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Experience seamless, lag-free multiplayer action with instant voice transmission and live scoring.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-secondary to-accent-purple rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Music className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">Voice Interaction</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Sing directly through your browser. Crystal-clear audio quality for the best musical experience.
                </p>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent to-accent-green rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Trophy className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">Fair Scoring System</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Community-driven ratings ensure every performance gets the recognition it deserves.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12 md:mt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="text-base md:text-lg font-bold text-foreground">Antakshari Live</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                The ultimate platform for musical competitions and social singing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Game</h4>
              <ul className="space-y-2 text-muted-foreground text-xs md:text-sm">
                <li><a href="#play" className="hover:text-primary transition-colors">Play Now</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How to Play</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Community</h4>
              <ul className="space-y-2 text-muted-foreground text-xs md:text-sm">
                <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-muted-foreground text-xs md:text-sm">
            <p>© 2026 Antakshari Live. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}