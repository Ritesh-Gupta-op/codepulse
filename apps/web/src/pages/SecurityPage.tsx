import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { 
  ShieldAlert, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  GitPullRequest, 
  XCircle, 
  CheckCircle2, 
  Key, 
  Package, 
  Lock 
} from 'lucide-react';

interface Vulnerability {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'Dependency' | 'Secret Leak' | 'Code Vulnerability';
  repo: string;
  cve: string;
  status: 'Open' | 'PR Created' | 'Resolved';
}

const initialVulnerabilities: Vulnerability[] = [
  {
    id: '1',
    title: 'Exposed AWS Access Key in environment config',
    severity: 'Critical',
    type: 'Secret Leak',
    repo: 'auth-service',
    cve: 'CVE-2024-3012',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Remote Code Execution in Axios dependency',
    severity: 'Critical',
    type: 'Dependency',
    repo: 'frontend-web',
    cve: 'CVE-2023-45857',
    status: 'Open',
  },
  {
    id: '3',
    title: 'SQL Injection in User Lookup Controller',
    severity: 'High',
    type: 'Code Vulnerability',
    repo: 'backend-api',
    cve: 'CWE-89',
    status: 'Open',
  },
  {
    id: '4',
    title: 'Insecure JWT Signing Algorithm (HS256)',
    severity: 'Medium',
    type: 'Code Vulnerability',
    repo: 'auth-service',
    cve: 'CWE-327',
    status: 'Open',
  },
  {
    id: '5',
    title: 'Outdated Lodash version with prototype pollution',
    severity: 'Low',
    type: 'Dependency',
    repo: 'dev-note',
    cve: 'CVE-2021-23337',
    status: 'Open',
  },
];

export function SecurityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(initialVulnerabilities);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  // Create PR Action Simulation
  const handleCreatePR = (id: string) => {
    setVulnerabilities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'PR Created' } : item
      )
    );
  };

  // Dismiss / Ignore Vulnerability
  const handleDismiss = (id: string) => {
    setVulnerabilities((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtering Logic
  const filteredVulns = vulnerabilities.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.cve.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'All' || v.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  // Severity Counts
  const counts = {
    Critical: vulnerabilities.filter((v) => v.severity === 'Critical').length,
    High: vulnerabilities.filter((v) => v.severity === 'High').length,
    Medium: vulnerabilities.filter((v) => v.severity === 'Medium').length,
    Low: vulnerabilities.filter((v) => v.severity === 'Low').length,
  };

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <ShieldAlert size={18} />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Security Triage</p>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Vulnerability triage & remediation</h2>
          <p className="text-sm text-slate-400">
            Real-time package findings, secret leak scans, and automated pull request generation.
          </p>
        </div>

        {/* Severity Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Critical</p>
              <p className="text-2xl font-extrabold text-white mt-1">{counts.Critical}</p>
            </div>
            <AlertOctagon className="text-rose-400" size={28} />
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">High</p>
              <p className="text-2xl font-extrabold text-white mt-1">{counts.High}</p>
            </div>
            <AlertTriangle className="text-amber-400" size={28} />
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">Medium</p>
              <p className="text-2xl font-extrabold text-white mt-1">{counts.Medium}</p>
            </div>
            <Info className="text-yellow-400" size={28} />
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-700 bg-slate-900/40 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low</p>
              <p className="text-2xl font-extrabold text-white mt-1">{counts.Low}</p>
            </div>
            <ShieldAlert className="text-slate-400" size={28} />
          </div>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedSeverity === sev
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredVulns.length}</strong> issues
          </p>
        </div>

        {/* Vulnerability List */}
        <div className="space-y-3">
          {filteredVulns.length > 0 ? (
            filteredVulns.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Severity Badge */}
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                        item.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : item.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : item.severity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}
                    >
                      {item.severity}
                    </span>

                    {/* Type Badge */}
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {item.type === 'Secret Leak' && <Key size={12} className="text-amber-400" />}
                      {item.type === 'Dependency' && <Package size={12} className="text-cyan-400" />}
                      {item.type === 'Code Vulnerability' && <Lock size={12} className="text-rose-400" />}
                      {item.type}
                    </span>

                    <span className="text-xs font-mono text-cyan-400">@{item.repo}</span>
                    <span className="text-xs text-slate-500 font-mono">({item.cve})</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  {item.status === 'PR Created' ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium">
                      <CheckCircle2 size={15} /> PR #104 Opened
                    </span>
                  ) : (
                    <button
                      onClick={() => handleCreatePR(item.id)}
                      className="flex items-center gap-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    >
                      <GitPullRequest size={14} /> Create Fix PR
                    </button>
                  )}

                  <button
                    onClick={() => handleDismiss(item.id)}
                    title="Dismiss / Ignore"
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-10 text-center border border-white/5 text-slate-500 text-sm">
              No security vulnerabilities found matching your filter.
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}