import { Mic, Square } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface VoiceRecorderProps {
  onRecordingComplete?: (recording: Blob) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onRecordingComplete, disabled = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate recording completion
      onRecordingComplete?.(new Blob());
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 md:text-xs text-[10px]">
      <Button
        onClick={handleToggleRecording}
        disabled={disabled}
        className={`cursor-pointer md:w-22 md:h-22 w-16 h-16 rounded-full transition-all shadow-lg ${
          isRecording
            ? "bg-gradient-to-br from-primary to-accent-orange hover:opacity-80 animate-pulse shadow-primary/50"
            : "bg-gradient-to-br from-secondary to-accent-purple hover:opacity-80 shadow-secondary/30"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        size="lg"
      >
        {isRecording ? (
          <Square className="w-10 h-10 text-white" fill="currentColor" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}
      </Button>
      <div className="text-center">
        <div className="font-medium text-foreground">
          {isRecording ? "Recording..." : "Tap to sing"}
        </div>
        <div className="text-muted-foreground">
          {isRecording ? "Tap again to stop" : "Hold and sing your song"}
        </div>
      </div>
    </div>
  );
}