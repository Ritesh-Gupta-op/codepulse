import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { api } from '../services/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };
      const response = await api.post(endpoint, payload);
      window.localStorage.setItem('codepulse.token', response.data.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Unable to authenticate. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-10 lg:px-12 lg:py-16">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.18),transparent_20%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-100/70">CodePulse AI</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight text-white lg:text-7xl">
              AI software health that reads your repo like an engineer.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 lg:text-lg">
              Import GitHub repositories, uncover risks, prioritize technical debt, and generate documentation with AI.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {['Health scorecards', 'Security alerts', 'AI repair plans'].map((item) => (
              <div key={item} className="glass-panel rounded-3xl p-5 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-ink-900 px-6 py-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel w-full max-w-md rounded-3xl p-8"
        >
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">{isRegister ? 'Create account' : 'Welcome back'}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{isRegister ? 'Start scanning repositories' : 'Sign in to continue'}</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister ? (
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/30" />
            ) : null}
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/30" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/30" />

            {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}

            <button disabled={loading} className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <button className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10" onClick={() => setIsRegister((current) => !current)}>
            {isRegister ? 'Already have an account? Sign in' : 'New here? Create an account'}
          </button>

          <button className="mt-3 w-full rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-50 transition hover:bg-amber-400/20">
            Continue with Google
          </button>
        </motion.div>
      </section>
    </div>
  );
}
