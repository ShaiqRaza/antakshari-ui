import { useState } from "react";
import { useNavigate } from "react-router";
import { Music2, Globe, Heart, Star, Sparkles, Mic2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CategorySelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  {
    id: "desi",
    name: "Desi",
    description: "Classical, Bollywood songs, Punjabi songs, Ghazal, Qawwali, Desi pop, Folk (Lok geet), Sufi",
    icon: Music2,
    gradient: "from-primary to-accent-orange",
    borderColor: "border-primary/30 hover:border-primary",
    shadowColor: "hover:shadow-primary/20",
  },
  {
    id: "western",
    name: "Western",
    description: "English songs from pop, rock, and movies",
    icon: Globe,
    gradient: "from-secondary to-accent-purple",
    borderColor: "border-secondary/30 hover:border-secondary",
    shadowColor: "hover:shadow-secondary/20",
  }
];

export function CategorySelectionModal({ open, onOpenChange }: CategorySelectionModalProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsJoining(true);

    // Simulate backend API call: POST /api/rooms/join { category: categoryId }
    // Backend will automatically match user to an appropriate room
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Backend returns a room ID, we navigate directly to the game room
    const mockRoomId = `${categoryId}-room-${Math.random().toString(36).substr(2, 9)}`;
    
    navigate(`/room/${mockRoomId}`);
    
    // Reset state
    setIsJoining(false);
    setSelectedCategory(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto md:p-[24px] p-[20px] mx-[0px] my-[4px]">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-3xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent">
            Choose Your Music Category
          </DialogTitle>
          <DialogDescription className="text-center text-xs md:text-base text-muted-foreground pt-2">
            Select a category to join a public room with players who share your taste!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:gap-4 gap-2 mt-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`p-3 md:p-4 cursor-pointer transition-all ${category.borderColor} border-2 ${category.shadowColor} hover:shadow-xl hover:scale-[1.02] relative overflow-hidden ${
                  isSelected ? "ring-4 ring-primary/50" : ""
                } ${isJoining && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !isJoining && handleCategorySelect(category.id)}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-2xl`} />
                
                <div className="relative z-10">
                  <div className={`w-7 h-7 md:w-12 md:h-12 mx-auto mb-2 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-base md:text-xl font-bold text-foreground text-center mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-[10px] md:text-sm text-muted-foreground text-center">
                    {category.description}
                  </p>

                  {isSelected && isJoining && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-primary">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Joining room...</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isJoining}
            className="border-muted-foreground/30 hover:bg-muted/50"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}