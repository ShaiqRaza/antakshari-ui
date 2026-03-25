import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface MatchHistory {
  id: string;
  roomId: string;
  roomType: 'public' | 'private';
  position: number;
  score: number;
  date: string;
  totalPlayers: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  matchHistory: MatchHistory[];
  addMatchResult: (match: Omit<MatchHistory, 'id' | 'date'>) => void;
  getUserStats: () => {
    totalMatches: number;
    totalWins: number;
    averageScore: number;
    averagePosition: number;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);

  // Load user and match history from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('antakshari_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Load match history for this user
      const historyKey = `antakshari_history_${parsedUser.id}`;
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        setMatchHistory(JSON.parse(storedHistory));
      }
    }
  }, []);

  // Save match history whenever it changes
  useEffect(() => {
    if (user) {
      const historyKey = `antakshari_history_${user.id}`;
      localStorage.setItem(historyKey, JSON.stringify(matchHistory));
    }
  }, [matchHistory, user]);

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists
      const usersData = localStorage.getItem('antakshari_users');
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      if (users.find(u => u.username === username)) {
        return { success: false, error: 'Username already taken' };
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        username,
        createdAt: new Date().toISOString(),
      };

      // Store password separately (in real app, this would be hashed on backend)
      const passwords = localStorage.getItem('antakshari_passwords');
      const passwordMap = passwords ? JSON.parse(passwords) : {};
      passwordMap[email] = password;
      localStorage.setItem('antakshari_passwords', JSON.stringify(passwordMap));

      // Store user
      users.push(newUser);
      localStorage.setItem('antakshari_users', JSON.stringify(users));
      localStorage.setItem('antakshari_user', JSON.stringify(newUser));
      
      setUser(newUser);
      setMatchHistory([]);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const usersData = localStorage.getItem('antakshari_users');
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      
      const foundUser = users.find(u => u.email === email);
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Check password
      const passwords = localStorage.getItem('antakshari_passwords');
      const passwordMap = passwords ? JSON.parse(passwords) : {};
      
      if (passwordMap[email] !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      localStorage.setItem('antakshari_user', JSON.stringify(foundUser));
      setUser(foundUser);

      // Load match history
      const historyKey = `antakshari_history_${foundUser.id}`;
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        setMatchHistory(JSON.parse(storedHistory));
      } else {
        setMatchHistory([]);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('antakshari_user');
    setUser(null);
    setMatchHistory([]);
  };

  const addMatchResult = (match: Omit<MatchHistory, 'id' | 'date'>) => {
    if (!user) return;

    const newMatch: MatchHistory = {
      ...match,
      id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };

    setMatchHistory(prev => [newMatch, ...prev]);
  };

  const getUserStats = () => {
    const totalMatches = matchHistory.length;
    const totalWins = matchHistory.filter(m => m.position === 1).length;
    const averageScore = totalMatches > 0 
      ? matchHistory.reduce((sum, m) => sum + m.score, 0) / totalMatches 
      : 0;
    const averagePosition = totalMatches > 0 
      ? matchHistory.reduce((sum, m) => sum + m.position, 0) / totalMatches 
      : 0;

    return {
      totalMatches,
      totalWins,
      averageScore: Math.round(averageScore * 10) / 10,
      averagePosition: Math.round(averagePosition * 10) / 10,
    };
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      matchHistory,
      addMatchResult,
      getUserStats,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
