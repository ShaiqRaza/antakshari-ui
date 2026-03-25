import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  isFeedback?: boolean;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
}

export function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Chat & Feedback</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3 md:text-xs text-[8px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.isFeedback
                  ? "bg-secondary/20 border border-secondary/30"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-medium text-primary">
                  {message.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-foreground">{message.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message or feedback..."
            className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}