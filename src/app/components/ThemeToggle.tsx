import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group"
    >
      <Sun className={`w-5 h-5 absolute transition-all duration-500 ${
        theme === "light" 
          ? "rotate-0 scale-100 opacity-100" 
          : "rotate-90 scale-0 opacity-0"
      }`} />
      <Moon className={`w-5 h-5 absolute transition-all duration-500 ${
        theme === "dark" 
          ? "rotate-0 scale-100 opacity-100" 
          : "-rotate-90 scale-0 opacity-0"
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
