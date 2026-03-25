import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Username Context for managing the player's display name across the application.
 * 
 * The username is persisted in localStorage and used across all game rooms (public and private).
 * Similar to skribbl.io, users enter their name once and it's used throughout their session.
 * 
 * Usage:
 * ```tsx
 * import { useUsername } from "../contexts/UsernameContext";
 * 
 * function MyComponent() {
 *   const { username, setUsername, clearUsername } = useUsername();
 *   return <div>Welcome, {username}!</div>;
 * }
 * ```
 */
interface UsernameContextType {
  username: string | null;
  setUsername: (username: string) => void;
  clearUsername: () => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    // Load username from localStorage on mount
    const savedUsername = localStorage.getItem("antakshari_username");
    if (savedUsername) {
      setUsernameState(savedUsername);
    }
  }, []);

  const setUsername = (newUsername: string) => {
    localStorage.setItem("antakshari_username", newUsername);
    setUsernameState(newUsername);
  };

  const clearUsername = () => {
    localStorage.removeItem("antakshari_username");
    setUsernameState(null);
  };

  return (
    <UsernameContext.Provider value={{ username, setUsername, clearUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export function useUsername() {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}
