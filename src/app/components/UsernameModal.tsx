import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "lucide-react";

interface UsernameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (username: string) => void;
}

export function UsernameModal({ open, onOpenChange, onSubmit }: UsernameModalProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load username from localStorage if it exists
    const savedUsername = localStorage.getItem("antakshari_username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError("Please enter a username");
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    
    // Save username to localStorage
    localStorage.setItem("antakshari_username", trimmedUsername);
    
    // Call the onSubmit callback
    onSubmit(trimmedUsername);
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent flex items-center gap-2 justify-center">
            <User className="w-6 h-6 text-primary" />
            Enter Your Name
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            This name will be used in all game rooms (public and private)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your name (e.g., MusicLover123)"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className={`text-lg border-2 ${error ? "border-red-500" : "border-primary/30"} focus:border-primary transition-colors`}
              maxLength={20}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {username.length}/20 characters
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent-orange hover:opacity-90 text-white text-lg py-6"
            size="lg"
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
