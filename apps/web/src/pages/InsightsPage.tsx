import { useState, useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { BarChart3, AlertTriangle, ShieldAlert, Cpu, Layers, CheckCircle2 } from 'lucide-react';

interface Repository {
  id: string;
  owner: string;
  name: string;
}

interface Finding {
  id: string;
  repoId: string;
  repoName: string;
  category: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

export function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepoId, setSelectedRepoId] = useState<string>('all');

  // Load repositories dynamically from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('codepulse_repos');
    let loadedRepos: Repository[] = [];

    if (saved) {
      try {
        loadedRepos = JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved repos', e);
      }
    }

    if (loadedRepos.length === 0) {
      loadedRepos = [
        { id: '1', owner: 'Manish1678-sos', name: 'Dev-Note' },
        { id: '2', owner: 'facebook', name: 'react' },
        { id: '3', owner: 'fastapi', name: 'fastapi' },
      ];
    }

    setRepos(loadedRepos);
  }, []);

  // Map findings dynamically to available repositories
  const getRepoFindings = (): Finding[] => {
    if (repos.length === 0) return [];

    const findingsList: Finding[] = [];

    repos.forEach((repo, idx) => {
      const fullName = `${repo.owner}/${repo.name}`;

      // Custom insights for known repos
      if (fullName === 'Manish1678-sos/Dev-Note') {
        findingsList.push(
          {
            id: `${repo.id}-1`,
            repoId: repo.id,
            repoName: fullName,
            category: 'Security Risk',
            title: 'SQL Injection vulnerability in login route',
            description: 'Raw queries used in authentication logic without sanitization.',
            severity: 'Critical',
          },
          {
            id: `${repo.id}-2`,
            repoId: repo.id,
            repoName: fullName,
            category: 'Tech Debt',
            title: 'Outdated Node dependencies in package.json',
            description: '3 high-severity vulnerable npm packages detected.',
            severity: 'Medium',
          }
        );
      } else if (fullName === 'facebook/react') {
        findingsList.push(
          {
            id: `${repo.id}-1`,
            repoId: repo.id,
            repoName: fullName,
            category: 'Performance',
            title: 'Unoptimized DB queries causing high latency',
            description: 'Sub-optimal rendering hooks leading to memory leaks.',
            severity: 'High',
          }
        );
      } else if (fullName === 'fastapi/fastapi') {
        findingsList.push(
          {
            id: `${repo.id}-1`,
            repoId: repo.id,
            repoName: fullName,
            category: 'AI Code Analysis',
            title: 'LLM context overflow risk in streaming pipeline',
            description: 'Async file read handlers missing proper exception handling.',
            severity: 'Low',
          }
        );
      } else {
        // Generic generated insights for newly added repositories
        findingsList.push(
          {
            id: `${repo.id}-gen1`,
            repoId: repo.id,
            repoName: fullName,
            category: 'Code Quality',
            title: 'Potential race condition in async handler',
            description: 'State updates executed without proper synchronization safeguards.',
            severity: idx % 2 === 0 ? 'High' : 'Medium',
          },
          {
            id: `${repo.id}-gen2`,
            repoId: repo.id,
            repoName: fullName,
            category: 'Security Audit',
            title: 'Hardcoded environment fallback detected',
            description: 'Ensure secrets are strictly fetched from process.env.',
            severity: 'Low',
          }
        );
      }
    });

    return findingsList;
  };

  const allFindings = getRepoFindings();

  // Filter based on selected dropdown repository & top search bar
  const filteredFindings = allFindings.filter((finding) => {
    const matchesRepo = selectedRepoId === 'all' || finding.repoId === selectedRepoId;
    const matchesSearch =
      finding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.repoName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRepo && matchesSearch;
  });

  const getSeverityBadge = (severity: Finding['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Medium':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Low':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-8 pb-12">
        
        {/* Header Section */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-slate-900/60 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-3">
                <BarChart3 size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Insights</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Cross-repository intelligence
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Real-time issue clustering, vulnerability intelligence, and benchmark analysis for your monitored codebases.
              </p>
            </div>

            {/* Dynamic Repository Selector Dropdown */}
            <div className="flex flex-col gap-1.5 min-w-[260px]">
              <label className="text-xs font-medium text-slate-400">Filter by Repository</label>
              <select
                value={selectedRepoId}
                onChange={(e) => setSelectedRepoId(e.target.value)}
                className="bg-slate-950 border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-white">
                  🌐 All Repositories ({repos.length})
                </option>
                {repos.map((repo) => (
                  <option key={repo.id} value={repo.id} className="bg-slate-900 text-white">
                    {repo.owner}/{repo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Findings Count Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Showing {filteredFindings.length} {filteredFindings.length === 1 ? 'finding' : 'findings'}
          </p>
        </div>

        {/* Insights Findings List */}
        <div className="space-y-4">
          {filteredFindings.length > 0 ? (
            filteredFindings.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/40 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
                      {item.repoName}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {item.category}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>

                <div className="flex items-center self-start sm:self-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-semibold ${getSeverityBadge(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center border border-white/5 text-slate-500 text-sm space-y-2">
              <CheckCircle2 size={28} className="mx-auto text-emerald-500/60" />
              <p>No critical issues or insights found for this selection.</p>
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}