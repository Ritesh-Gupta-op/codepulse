import { useEffect, useState, type FormEvent } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { api } from '../services/api';

export function RepositoriesPage() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  useEffect(() => {
    void api.get('/repositories').then((response) => setRepositories(response.data.data.repositories));
  }, []);

  async function handleImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post('/repositories/import', { owner, repo });
    const response = await api.get('/repositories');
    setRepositories(response.data.data.repositories);
    setOwner('');
    setRepo('');
  }

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleImport} className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Import</p>
          <h3 className="mt-2 text-2xl font-semibold">Analyze a GitHub repository</h3>
          <div className="mt-6 space-y-4">
            <input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Owner or org" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
            <input value={repo} onChange={(event) => setRepo(event.target.value)} placeholder="Repository name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
            <button className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">Import and scan</button>
          </div>
        </form>

        <div className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Repository list</p>
          <div className="mt-5 space-y-3">
            {repositories.map((repository) => (
              <div key={repository._id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-white">{repository.fullName}</h4>
                    <p className="text-sm text-white/55">{repository.language ?? 'Unknown language'}</p>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{repository.scanStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
