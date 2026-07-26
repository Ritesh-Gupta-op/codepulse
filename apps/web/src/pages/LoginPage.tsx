import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  Loader2,
  Github,
  X,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auth Flow States
  const [authStep, setAuthStep] = useState<'IDLE' | 'SELECT_ACCOUNT' | 'PROMPT_VERIFY'>('IDLE');
  const [authProvider, setAuthProvider] = useState<'google' | 'github' | null>(null);
  const [promptNumber, setPromptNumber] = useState<number>(42);
  const [isVerifying, setIsVerifying] = useState(false);

  // Trigger Google Flow
  const handleGoogleClick = () => {
    setAuthProvider('google');
    setAuthStep('SELECT_ACCOUNT');
  };

  // Trigger GitHub Flow
  const handleGithubClick = () => {
    setAuthProvider('github');
    setAuthStep('SELECT_ACCOUNT');
  };

  // Step 1 -> Move from Account Selection to Google 2FA Prompt Screen
  const handleAccountSelect = () => {
    // Generate a random 2-digit prompt number (e.g., 42, 87, 19)
    const randomNum = Math.floor(10 + Math.random() * 89);
    setPromptNumber(randomNum);
    setAuthStep('PROMPT_VERIFY');
  };

  // Step 2 -> Simulate User Tapping number on Phone
  const handleSimulatePhoneTap = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setAuthStep('IDLE');
      navigate('/dashboard');
    }, 1200);
  };

  // Email/Password Form Submit
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const closeModal = () => {
    setAuthStep('IDLE');
    setAuthProvider(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#070b12] text-white font-sans flex flex-col lg:flex-row selection:bg-cyan-500 selection:text-black relative">
      
      {/* Left Hero Section */}
      <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden bg-gradient-to-br from-cyan-950/20 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center font-bold text-cyan-400 text-lg shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              C
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold tracking-widest text-cyan-400">CodePulse AI</p>
              <p className="text-xs font-medium text-slate-400">Software Health & Intelligence</p>
            </div>
          </div>

          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              AI software health that reads your repo like an <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">engineer.</span>
            </h1>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
              Import GitHub repositories, uncover hidden security risks, prioritize technical debt, and auto-patch vulnerabilities with instant AI PRs.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">Health Scorecard</p>
            <p className="text-2xl font-black text-white">94<span className="text-sm font-normal text-slate-400">/100</span></p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <ShieldCheck size={12} /> Top 5% Code Quality
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Security Alerts</p>
            <p className="text-2xl font-black text-white">0 <span className="text-sm font-normal text-slate-400">Critical</span></p>
            <p className="text-[11px] text-slate-400 mt-1">2 Low Risk Flags</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">AI Repair Plans</p>
            <p className="text-lg font-bold text-white">Auto-Patch</p>
            <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
              <Sparkles size={12} /> Instant PR Generation
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Container */}
      <div className="lg:w-5/12 p-8 lg:p-16 flex flex-col justify-center items-center relative bg-slate-950">
        <div className="w-full max-w-md space-y-8 bg-slate-900/40 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          
          <div className="space-y-2 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Welcome Back</p>
            <h2 className="text-2xl font-bold text-white">Sign in to continue</h2>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <a href="#forgot" className="text-[11px] text-cyan-400 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute">OR</span>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleClick}
              className="w-full bg-slate-950 hover:bg-white/5 border border-white/15 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={handleGithubClick}
              className="w-full bg-slate-950 hover:bg-white/5 border border-white/10 text-slate-300 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <Github size={16} /> Continue with GitHub
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 pt-2">
            New here?{' '}
            <Link to="/dashboard" className="text-cyan-400 hover:underline font-semibold">
              Create an account
            </Link>
          </p>

        </div>
      </div>

      {/* ================= 2FA MODAL ================= */}
      {authStep !== 'IDLE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/60">
              <div className="flex items-center gap-2 text-slate-200 font-medium text-xs">
                {authProvider === 'google' ? 'Google Authentication' : 'GitHub Authorization'}
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* STEP 1: ACCOUNT SELECTION */}
            {authStep === 'SELECT_ACCOUNT' && (
              <div className="p-6 space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                  {authProvider === 'google' ? (
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"/>
                      <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                    </svg>
                  ) : (
                    <Github size={28} className="text-white" />
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Choose an account</h3>
                  <p className="text-xs text-slate-400">Select your account to continue</p>
                </div>

                <button
                  type="button"
                  onClick={handleAccountSelect}
                  className="w-full p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center justify-between transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                      MB
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">Manish Bhowmik</p>
                      <p className="text-[10px] text-slate-400">manishbhowmik1234@gmail.com</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                </button>
              </div>
            )}

            {/* STEP 2: GOOGLE 2FA PROMPT SCREEN (NUMBER TAP) */}
            {authStep === 'PROMPT_VERIFY' && (
              <div className="p-6 space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                  <Smartphone size={28} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Check your phone</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Google sent a notification to your mobile device. Tap the matching number on your phone prompt:
                  </p>
                </div>

                {/* Big Prompt Number */}
                <div className="py-4 bg-slate-950 border border-cyan-500/30 rounded-2xl w-32 mx-auto shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                  <span className="text-4xl font-black tracking-widest text-cyan-400">{promptNumber}</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 justify-center">
                  <AlertCircle size={14} className="text-amber-400 shrink-0" />
                  <span>Interactive Preview: Click button below to simulate tapping on phone.</span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePhoneTap}
                  disabled={isVerifying}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Verifying prompt...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} /> Tap {promptNumber} on Phone
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}