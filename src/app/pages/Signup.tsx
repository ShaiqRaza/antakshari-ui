import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setLoading(true);

    const result = await signup(email, password, username);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Signup failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <Navbar />

      {/* Vibrant background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent-purple to-secondary bg-clip-text text-transparent">
            Join Antakshari Live
          </h1>
          <p className="text-muted-foreground">
            Create an account to save your progress and compete globally
          </p>
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 shadow-2xl shadow-primary/5 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-primary to-accent-purple rounded-full"></span>
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 text-foreground transition-all"
                  placeholder="rockstar123"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-secondary to-accent rounded-full"></span>
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-secondary focus:shadow-lg focus:shadow-secondary/20 text-foreground transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-accent-purple to-accent-green rounded-full"></span>
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-purple transition-colors" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-accent-purple focus:shadow-lg focus:shadow-accent-purple/20 text-foreground transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-accent to-accent-orange rounded-full"></span>
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/20 text-foreground transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border-2 border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary via-accent-purple to-secondary text-white py-3.5 rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Creating Account...' : 'Sign Up'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text hover:from-secondary hover:to-accent-purple font-semibold transition-all">
                Login
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center gap-2 transition-colors group"
            >
              <span className="group-hover:text-accent-green transition-colors">←</span>
              Continue as guest
            </Link>
          </div>
        </div>

        {/* Decorative color indicators */}
        <div className="flex justify-center gap-3 mt-6">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse delay-300"></div>
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse delay-500"></div>
        </div>
      </div>
      </div>
    </div>
  );
}