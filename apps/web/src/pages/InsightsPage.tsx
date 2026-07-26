import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';

const mockFindings = [
  { id: 1, type: 'Security Risk', repo: 'auth-service', description: 'SQL Injection vulnerability in login route', severity: 'Critical' },
  { id: 2, type: 'Performance', repo: 'backend-api', description: 'Unoptimized DB queries causing high latency', severity: 'High' },
  { id: 3, type: 'Tech Debt', repo: 'frontend-web', description: 'Deprecated packages found in package.json', severity: 'Medium' },
  { id: 4, type: 'AI Code Analysis', repo: 'ai-engine', description: 'LLM context overflow risk in streaming pipeline', severity: 'Low' },
];

export function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFindings = mockFindings.filter((item) =>
    item.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <section className="space-y-6">
        <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Insights</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Cross-repository intelligence</h3>
          <p className="mt-2 text-white/60">
            This area is reserved for portfolio-wide trends, issue clustering, and benchmark comparisons.
          </p>
        </div>

        {/* Dynamic Filter Results */}
        <div className="space-y-3">
          <p className="text-xs text-white/40">
            Showing {filteredFindings.length} findings {searchQuery && `for "${searchQuery}"`}
          </p>

          {filteredFindings.length > 0 ? (
            filteredFindings.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/40 flex items-center justify-between hover:border-cyan-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
                      {item.repo}
                    </span>
                    <span className="text-xs text-white/60">{item.type}</span>
                  </div>
                  <p className="text-sm text-white/90 mt-1">{item.description}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  item.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  item.severity === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-slate-800 text-slate-400 border border-white/10'
                }`}>
                  {item.severity}
                </span>
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-8 text-center text-white/40 text-sm border border-white/5">
              No matching findings found for "{searchQuery}".
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}