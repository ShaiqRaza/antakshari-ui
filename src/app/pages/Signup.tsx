import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, Mic2, Music4 } from 'lucide-react';
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
    <div className="h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Vibrant background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1  flex items-center">
        <div className="w-full px-4 max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            <div className="w-full md:max-w-[400px] md:justify-self-center">
              <div className="md:hidden text-center mb-3">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent-purple to-secondary bg-clip-text text-transparent">
                  Join Antakshari Live
                </h2>
                <p className="text-muted-foreground md:text-sm text-xs">
                  Create an account to save your progress and compete globally
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-5 md:p-6 shadow-2xl shadow-primary/5 backdrop-blur-sm flex flex-col justify-between">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="username" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
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
                        className="w-full pl-10 pr-4 py-1.5 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 text-foreground transition-all"
                        placeholder="rockstar123"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
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
                        className="w-full pl-10 pr-4 py-1.5 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-secondary focus:shadow-lg focus:shadow-secondary/20 text-foreground transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
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
                        className="w-full pl-10 pr-4 py-1.5 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-accent-purple focus:shadow-lg focus:shadow-accent-purple/20 text-foreground transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
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
                        className="w-full pl-10 pr-4 py-1.5 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/20 text-foreground transition-all"
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
            </div>

            <div className="hidden md:block w-full md:max-w-[440px] md:justify-self-center md:pt-6 text-center md:text-left">
              <h2 className="text-center text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent-purple to-secondary bg-clip-text text-transparent">
                Join Antakshari Live
              </h2>
              <p className="text-center text-muted-foreground mb-6 md:mb-8">
                Create an account to save your progress and compete globally
              </p>

              <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-[#090b1d] via-[#171744] to-[#08263c] h-[240px] lg:h-[280px] flex items-center justify-center transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-2xl group-hover:shadow-primary/20 cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,0,140,0.20),transparent_36%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.20),transparent_38%)]"></div>
                  <div className="absolute -top-16 -left-14 w-44 h-44 rounded-full bg-primary/30 blur-3xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:translate-x-2"></div>
                  <div className="absolute -bottom-16 -right-10 w-48 h-48 rounded-full bg-secondary/30 blur-3xl transition-transform duration-700 group-hover:translate-y-2 group-hover:-translate-x-2"></div>
                  <div className="absolute top-1/3 -right-12 w-40 h-40 rounded-full bg-accent-purple/25 blur-3xl transition-transform duration-700 group-hover:translate-x-2"></div>
                  <div className="absolute -bottom-20 left-1/3 w-52 h-52 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 group-hover:-translate-y-2"></div>

                  <div className="absolute inset-0 opacity-15 transition-opacity duration-500 group-hover:opacity-25" style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,.35) 1px, transparent 0)',
                    backgroundSize: '22px 22px',
                  }}></div>

                  <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.08),transparent_45%,rgba(255,255,255,0.04))]"></div>
                  <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-1000 group-hover:translate-x-full"></div>

                  <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-accent-purple to-secondary opacity-90 blur-[2px] transition-transform duration-500 group-hover:scale-105"></div>
                      <div className="absolute inset-1 rounded-full bg-slate-900/90 border border-white/20 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-105">
                        <Mic2 className="w-8 h-8 md:w-10 md:h-10 text-white transition-transform duration-500 group-hover:-rotate-6" />
                      </div>
                      <Music4 className="absolute -left-8 top-2 w-5 h-5 text-secondary animate-pulse transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1" />
                      <Music4 className="absolute -right-8 bottom-3 w-5 h-5 text-accent-purple animate-pulse delay-100 transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1" />
                    </div>

                    <div className="mt-1 flex items-end gap-2 h-14">
                      <span className="w-2 h-6 rounded-full bg-primary animate-pulse transition-all duration-300 group-hover:h-10"></span>
                      <span className="w-2 h-10 rounded-full bg-secondary animate-pulse delay-75 transition-all duration-300 group-hover:h-6"></span>
                      <span className="w-2 h-8 rounded-full bg-accent animate-pulse delay-100 transition-all duration-300 group-hover:h-12"></span>
                      <span className="w-2 h-12 rounded-full bg-accent-purple animate-pulse delay-150 transition-all duration-300 group-hover:h-8"></span>
                      <span className="w-2 h-7 rounded-full bg-accent-green animate-pulse delay-200 transition-all duration-300 group-hover:h-11"></span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}