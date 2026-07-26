import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Github, Trash2, ExternalLink, Loader2, Plus, Code, ShieldCheck } from 'lucide-react';

interface Repository {
  id: string;
  owner: string;
  name: string;
  language: string;
  status: 'complete' | 'scanning' | 'failed';
  healthScore: number;
}

const initialRepos: Repository[] = [
  { id: '1', owner: 'Manish1678-sos', name: 'Dev-Note', language: 'JavaScript', status: 'complete', healthScore: 92 },
  { id: '2', owner: 'facebook', name: 'react', language: 'TypeScript', status: 'complete', healthScore: 88 },
  { id: '3', owner: 'fastapi', name: 'fastapi', language: 'Python', status: 'complete', healthScore: 95 },
];

export function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<Repository[]>(initialRepos);
  const [owner, setOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Add & Scan Handler
  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner.trim() || !repoName.trim()) return;

    setIsScanning(true);

    setTimeout(() => {
      const newRepo: Repository = {
        id: Date.now().toString(),
        owner: owner.trim(),
        name: repoName.trim(),
        language: 'JavaScript', // Default placeholder
        status: 'complete',
        healthScore: Math.floor(Math.random() * 20) + 80, // Random health score 80-99
      };

      setRepos((prev) => [newRepo, ...prev]);
      setOwner('');
      setRepoName('');
      setIsScanning(false);
    }, 1500);
  };

  // Delete Handler
  const handleDelete = (id: string) => {
    setRepos((prev) => prev.filter((r) => r.id !== id));
  };

  // Filter Logic
  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || r.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language)))];

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Import / Scan Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Github size={18} />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Import</p>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyze a GitHub repository</h2>
            <p className="text-sm text-slate-400 mb-6">
              Connect public or private repositories for vulnerability scanning, debt estimation, and quality metrics.
            </p>

            <form onSubmit={handleImport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Owner or org</label>
                <input
                  type="text"
                  placeholder="e.g. facebook"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Repository name</label>
                <input
                  type="text"
                  placeholder="e.g. react"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-3 text-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Scanning Repository...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Import and scan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Repository List & Filters */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Repositories</p>
              <h2 className="text-xl font-bold text-white">Monitored Projects ({filteredRepos.length})</h2>
            </div>

            {/* Language Filter Badges */}
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Repo List */}
          <div className="space-y-3">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-base group-hover:text-cyan-400 transition-colors">
                        {repo.owner}/{repo.name}
                      </span>
                      <a
                        href={`https://github.com/${repo.owner}/${repo.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Code size={13} className="text-cyan-400" />
                        {repo.language}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck size={13} />
                        Health: {repo.healthScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                      {repo.status}
                    </span>

                    <button
                      onClick={() => handleDelete(repo.id)}
                      title="Remove Repository"
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel rounded-2xl p-10 text-center border border-white/5 text-slate-500 text-sm">
                No repositories found matching your search or filters.
              </div>
            )}
          </div>
        </div>

      </div>
    </AppShell>
  );
}