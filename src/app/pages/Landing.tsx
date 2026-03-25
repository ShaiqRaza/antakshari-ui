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
      <section className="container mx-auto px-4 py-12 md:py-20 text-center mx-[64px] mt-[32px] mb-[72px] relative">
        {/* Musical Background Pattern - Only in Hero Section */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.25] dark:opacity-[0.35] overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <g transform="translate(100, 540)">
            <ellipse cx="40" cy="0" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="10" y1="0" x2="10" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="70" y1="0" x2="70" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="40" cy="40" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="20" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
          </g>

          {/* Music Notes - Top Center */}
          <g transform="translate(864, 120)">
            <circle cx="0" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="5" y1="20" x2="5" y2="-10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="20" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="25" y1="25" x2="25" y2="-5" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d="M 5 -10 Q 15 -15 25 -5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Headphones - Bottom Right */}
          <g transform="translate(1536, 810)">
            <path d="M 20 0 Q 50 -10 80 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <rect x="15" y="0" width="12" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="73" y="0" width="12" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Piano Keys - Bottom Left */}
          <g transform="translate(192, 864)">
            <rect x="0" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="15" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="30" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="10" y="0" width="10" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" opacity="0.6" />
            <rect x="25" y="0" width="10" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" opacity="0.6" />
          </g>

          {/* Vinyl Record - Middle Right */}
          <g transform="translate(1728, 486)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
            <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
            <circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Saxophone - Bottom Center */}
          <g transform="translate(1056, 810) rotate(25)">
            <path d="M 20 0 Q 10 20 15 40 L 25 60" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <circle cx="25" cy="65" r="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="18" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="16" cy="25" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="18" cy="35" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
          </g>

          {/* Treble Clef - Top Middle Left */}
          <g transform="translate(480, 180)">
            <path d="M 10 20 Q 5 10 10 0 Q 15 -5 20 0 Q 25 10 20 25 Q 15 35 10 30 L 8 50 Q 5 60 10 65 Q 15 68 20 65" 
                  fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="10" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          </g>

          {/* Electric Guitar - Middle Bottom */}
          <g transform="translate(672, 702) rotate(-10)">
            <path d="M 0 0 L 40 0 L 45 10 L 40 20 L 0 20 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="-20" y="8" width="20" height="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="-5" y1="0" x2="-5" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          </g>

          {/* Music Note Large - Center Right */}
          <g transform="translate(1344, 378)">
            <circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <line x1="8" y1="30" x2="8" y2="-15" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <path d="M 8 -15 L 25 -10 L 25 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Trumpet - Top Left Corner */}
          <g transform="translate(288, 162) rotate(15)">
            <path d="M 0 10 L 30 10 L 30 15 L 0 15 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d="M 30 8 L 50 0 L 50 25 L 30 17 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="8" cy="12.5" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="15" cy="12.5" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="22" cy="12.5" r="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
          </g>

          {/* Guitar 2 - Top Right Side */}
          <g transform="translate(1440, 220) rotate(35)">
            <ellipse cx="30" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="30" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <rect x="27" y="10" width="6" height="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="28" y1="10" x2="28" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="30" y1="10" x2="30" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="32" y1="10" x2="32" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          </g>

          {/* Violin - Bottom Left Side */}
          <g transform="translate(346, 950) rotate(-20)">
            <path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="25" cy="50" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d="M 20 50 L 15 55 M 30 50 L 35 55" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <ellipse cx="25" cy="65" rx="10" ry="7" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="22" y1="40" x2="22" y2="70" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="28" y1="40" x2="28" y2="70" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          </g>

          {/* Tambourine - Top Center Right */}
          <g transform="translate(1248, 130)">
            <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <circle cx="-15" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="15" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="0" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="0" cy="-15" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <line x1="-15" y1="-15" x2="15" y2="15" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
            <line x1="-15" y1="15" x2="15" y2="-15" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
          </g>

          {/* Bass Guitar - Middle Left Bottom */}
          <g transform="translate(230, 670) rotate(10)">
            <path d="M 0 0 L 35 0 L 38 8 L 35 16 L 0 16 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="-25" y="6" width="25" height="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="-8" y1="0" x2="-8" y2="16" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="-3" y1="0" x2="-3" y2="16" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <line x1="2" y1="0" x2="2" y2="16" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          </g>

          {/* Microphone 2 - Bottom Right Corner */}
          <g transform="translate(1766, 918) rotate(-25)">
            <rect x="0" y="0" width="18" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="9" y1="32" x2="9" y2="50" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="9" cy="54" rx="13" ry="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="4" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <line x1="4" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
          </g>

          {/* Drum Set - Top Center */}
          <g transform="translate(960, 216)">
            <ellipse cx="0" cy="0" rx="20" ry="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="-20" y1="0" x2="-20" y2="30" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="20" y1="0" x2="20" y2="30" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="0" cy="30" rx="20" ry="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Music Notes - Bottom Center Left */}
          <g transform="translate(538, 994)">
            <circle cx="0" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="4" y1="15" x2="4" y2="-5" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="15" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="19" y1="18" x2="19" y2="-2" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Headphones 2 - Middle Top */}
          <g transform="translate(768, 270)">
            <path d="M 15 0 Q 40 -8 65 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <rect x="12" y="0" width="10" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="58" y="0" width="10" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Vinyl Record 2 - Top Left Side */}
          <g transform="translate(154, 302)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
            <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Treble Clef 2 - Middle Right */}
          <g transform="translate(1574, 594) rotate(15)">
            <path d="M 8 15 Q 4 8 8 0 Q 12 -4 16 0 Q 20 8 16 20 Q 12 28 8 24 L 6 40 Q 4 48 8 52 Q 12 54 16 52" 
                  fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="8" cy="32" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          </g>

          {/* Piano Keys 2 - Top Right Area */}
          <g transform="translate(1690, 324) rotate(-10)">
            <rect x="0" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="12" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="24" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <rect x="8" y="0" width="8" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" opacity="0.6" />
            <rect x="20" y="0" width="8" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" opacity="0.6" />
          </g>

          {/* Trumpet 2 - Bottom Middle */}
          <g transform="translate(922, 950) rotate(-30)">
            <path d="M 0 8 L 25 8 L 25 12 L 0 12 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d="M 25 6 L 42 0 L 42 20 L 25 14 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="6" cy="10" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="12" cy="10" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="18" cy="10" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
          </g>

          {/* Music Note - Bottom Right Side */}
          <g transform="translate(1498, 994)">
            <circle cx="0" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="6" y1="20" x2="6" y2="-10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Microphone 3 - Middle Center */}
          <g transform="translate(1114, 518) rotate(45)">
            <rect x="0" y="0" width="16" height="28" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="8" y1="28" x2="8" y2="42" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="8" cy="45" rx="11" ry="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Saxophone 2 - Top Left Area */}
          <g transform="translate(422, 378) rotate(-15)">
            <path d="M 15 0 Q 8 15 12 30 L 20 45" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <circle cx="20" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="14" cy="12" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="12" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            <circle cx="14" cy="28" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
          </g>

          {/* Tambourine 2 - Middle Bottom Right */}
          <g transform="translate(1382, 842)">
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
            <circle cx="-12" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="12" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="0" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <circle cx="0" cy="-12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
          </g>

          {/* Drum 2 - Bottom Right Area */}
          <g transform="translate(1632, 648)">
            <ellipse cx="25" cy="0" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="3" y1="0" x2="3" y2="32" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="47" y1="0" x2="47" y2="32" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <ellipse cx="25" cy="32" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* Music Notes Group - Middle Top Left */}
          <g transform="translate(614, 410)">
            <circle cx="0" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="3.5" y1="12" x2="3.5" y2="-5" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <circle cx="12" cy="15" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <line x1="15.5" y1="15" x2="15.5" y2="-2" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d="M 3.5 -5 Q 9.5 -8 15.5 -2" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
          </g>

          {/* 3X MORE INSTRUMENTS - Quadruple density for immersive background */}
          <g transform="translate(120, 180) rotate(25)"><ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="30" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(380, 140) rotate(-12)"><rect x="0" y="0" width="20" height="35" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="10" y1="35" x2="10" y2="55" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="10" cy="60" rx="15" ry="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(750, 90)"><circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" /><circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1050, 120)"><circle cx="0" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="5" y1="20" x2="5" y2="-10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1360, 80) rotate(18)"><path d="M 10 20 Q 5 10 10 0 Q 15 -5 20 0 Q 25 10 20 25 Q 15 35 10 30 L 8 50 Q 5 60 10 65 Q 15 68 20 65" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1550, 60) rotate(-28)"><path d="M 0 10 L 30 10 L 30 15 L 0 15 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><path d="M 30 8 L 50 0 L 50 25 L 30 17 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1750, 140) rotate(35)"><rect x="0" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><rect x="15" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(220, 320) rotate(-18)"><ellipse cx="40" cy="0" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="10" y1="0" x2="10" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="70" y1="0" x2="70" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="40" cy="40" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(520, 280) rotate(22)"><path d="M 20 0 Q 10 20 15 40 L 25 60" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><circle cx="25" cy="65" r="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(840, 290)"><circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><circle cx="-15" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /><circle cx="15" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(1120, 310) rotate(-32)"><path d="M 15 0 Q 40 -8 65 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><rect x="12" y="0" width="10" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1420, 340) rotate(8)"><path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="25" cy="50" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1680, 280) rotate(-42)"><path d="M 0 0 L 35 0 L 38 8 L 35 16 L 0 16 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(60, 260)"><circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><line x1="8" y1="30" x2="8" y2="-15" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(140, 500) rotate(15)"><ellipse cx="30" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="30" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(360, 560) rotate(-25)"><rect x="0" y="0" width="16" height="28" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="8" y1="28" x2="8" y2="42" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(640, 480)"><ellipse cx="25" cy="0" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="3" y1="0" x2="3" y2="32" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="47" y1="0" x2="47" y2="32" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="25" cy="32" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(900, 560) rotate(30)"><circle cx="0" cy="0" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1220, 480) rotate(-15)"><path d="M 8 15 Q 4 8 8 0 Q 12 -4 16 0 Q 20 8 16 20 Q 12 28 8 24 L 6 40 Q 4 48 8 52 Q 12 54 16 52" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1500, 540) rotate(20)"><circle cx="0" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="4" y1="15" x2="4" y2="-5" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1780, 500) rotate(-38)"><path d="M 0 8 L 25 8 L 25 12 L 0 12 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><path d="M 25 6 L 42 0 L 42 20 L 25 14 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(80, 720)"><circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><circle cx="-12" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /><circle cx="12" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(320, 780) rotate(28)"><path d="M 20 0 Q 50 -10 80 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><rect x="15" y="0" width="12" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(580, 720) rotate(-10)"><path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="25" cy="50" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(860, 760) rotate(18)"><ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="30" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(1140, 740) rotate(-35)"><rect x="0" y="0" width="18" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="9" y1="32" x2="9" y2="50" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1420, 760)"><ellipse cx="40" cy="0" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="10" y1="0" x2="10" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="70" y1="0" x2="70" y2="40" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="40" cy="40" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1700, 720) rotate(25)"><circle cx="0" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="6" y1="20" x2="6" y2="-10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(200, 920) rotate(-22)"><path d="M 15 0 Q 8 15 12 30 L 20 45" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><circle cx="20" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(460, 980) rotate(12)"><rect x="0" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><rect x="12" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(780, 1000)"><circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1020, 960) rotate(-18)"><circle cx="0" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="3.5" y1="12" x2="3.5" y2="-5" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1320, 1000) rotate(35)"><path d="M 0 0 L 35 0 L 38 8 L 35 16 L 0 16 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1620, 960) rotate(-28)"><circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /><circle cx="-15" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" /></g>
          <g transform="translate(1840, 940) rotate(15)"><path d="M 15 0 Q 40 -8 65 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(40, 480) rotate(40)"><ellipse cx="30" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(260, 60)"><circle cx="0" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="5" y1="20" x2="5" y2="-10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(580, 160) rotate(-8)"><rect x="0" y="0" width="20" height="35" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(920, 180)"><ellipse cx="25" cy="0" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><line x1="3" y1="0" x2="3" y2="32" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1180, 200) rotate(25)"><path d="M 10 20 Q 5 10 10 0 Q 15 -5 20 0 Q 25 10 20 25 Q 15 35 10 30 L 8 50 Q 5 60 10 65 Q 15 68 20 65" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1820, 380) rotate(-12)"><circle cx="0" cy="0" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1850, 1020)"><path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /><ellipse cx="25" cy="50" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(40, 1020) rotate(22)"><path d="M 0 10 L 30 10 L 30 15 L 0 15 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(340, 400) rotate(-18)"><rect x="0" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(620, 380)"><circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1000, 380) rotate(32)"><circle cx="0" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1280, 420) rotate(-38)"><path d="M 0 8 L 25 8 L 25 12 L 0 12 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1620, 380)"><circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(80, 620) rotate(15)"><path d="M 20 0 Q 10 20 15 40 L 25 60" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(420, 640)"><path d="M 20 0 Q 50 -10 80 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(760, 620) rotate(-25)"><ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1040, 660)"><rect x="0" y="0" width="16" height="28" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1320, 640) rotate(18)"><ellipse cx="40" cy="0" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1580, 660) rotate(-32)"><path d="M 8 15 Q 4 8 8 0 Q 12 -4 16 0 Q 20 8 16 20 Q 12 28 8 24 L 6 40 Q 4 48 8 52 Q 12 54 16 52" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(140, 860)"><circle cx="0" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(420, 860) rotate(28)"><rect x="0" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(640, 900)"><circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1000, 880) rotate(-15)"><circle cx="0" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1560, 900) rotate(38)"><path d="M 0 0 L 35 0 L 38 8 L 35 16 L 0 16 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1780, 860)"><circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1880, 620) rotate(-20)"><path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1900, 460) rotate(15)"><path d="M 15 0 Q 8 15 12 30 L 20 45" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1900, 800)"><path d="M 0 10 L 30 10 L 30 15 L 0 15 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(20, 140) rotate(-12)"><circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(20, 900)"><rect x="0" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1900, 60)"><path d="M 15 0 Q 40 -8 65 0" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(480, 40) rotate(20)"><ellipse cx="30" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(20, 560)"><rect x="0" y="0" width="18" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1900, 1040) rotate(-30)"><circle cx="0" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(280, 1040)"><ellipse cx="25" cy="0" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1100, 1040) rotate(-22)"><path d="M 0 0 L 35 0 L 38 8 L 35 16 L 0 16 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(600, 1040) rotate(10)"><circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1520, 1040)"><rect x="0" y="0" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1750, 1040) rotate(-35)"><circle cx="0" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(300, 240) rotate(18)"><circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(700, 340) rotate(-28)"><ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(980, 650)"><path d="M 25 0 L 25 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(240, 640) rotate(22)"><rect x="0" y="0" width="20" height="35" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1260, 870)"><path d="M 15 0 Q 8 15 12 30 L 20 45" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1830, 240) rotate(-15)"><circle cx="0" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(40, 340)"><circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(1560, 180) rotate(30)"><circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" /></g>
          <g transform="translate(160, 740)"><ellipse cx="25" cy="0" rx="22" ry="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1850, 740) rotate(-40)"><path d="M 0 8 L 25 8 L 25 12 L 0 12 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(500, 820)"><rect x="0" y="0" width="15" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          <g transform="translate(1400, 200) rotate(12)"><circle cx="0" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></g>
          </svg>
        </div>

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
                } focus:border-primary transition-colors bg-card/50 backdrop-blur-sm`}
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
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 text-white text-sm sm:text-base md:text-lg shadow-lg shadow-primary/30 px-8 sm:px-12 md:px-[48px] py-5 sm:py-6 md:py-[24px]"
            >
              Play!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handlePrivateRoomClick}
              className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary/10 text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-5 sm:py-6 md:py-6"
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