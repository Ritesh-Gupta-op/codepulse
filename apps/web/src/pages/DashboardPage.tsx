import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { 
  FolderGit2, 
  ShieldCheck, 
  Activity, 
  AlertOctagon, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';

const trendData = [
  { day: 'Mon', health: 72, debt: 60 },
  { day: 'Tue', health: 75, debt: 56 },
  { day: 'Wed', health: 78, debt: 52 },
  { day: 'Thu', health: 81, debt: 49 },
  { day: 'Fri', health: 84, debt: 47 },
  { day: 'Sat', health: 87, debt: 45 },
];

const scoringData = [
  { name: 'Health', score: 87 },
  { name: 'Security', score: 73 },
  { name: 'Debt', score: 45 },
  { name: 'Maintainability', score: 82 },
];

interface QuickAlert {
  id: string;
  title: string;
  repo: string;
  severity: 'Critical' | 'High';
  resolved: boolean;
}

const initialAlerts: QuickAlert[] = [
  { id: '1', title: 'Exposed AWS Key in config', repo: 'auth-service', severity: 'Critical', resolved: false },
  { id: '2', title: 'RCE in Axios package', repo: 'frontend-web', severity: 'High', resolved: false },
];

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState<QuickAlert[]>(initialAlerts);

  // Quick Resolve Handler
  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: true } : item))
    );
  };

  const activeAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <AppShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        
        {/* Search Query Feedback Banner */}
        {searchQuery && (
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
            <span>
              Filtering Dashboard intelligence metrics for: <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="hover:underline text-cyan-400 font-semibold ml-2"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* 1. Stat Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">Repositories</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium">Active</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-white">3</p>
              <FolderGit2 size={18} className="text-cyan-400" />
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center justify-between text-emerald-300 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">Health</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium flex items-center gap-0.5">
                <ArrowUpRight size={12} /> +5%
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-white">87%</p>
              <ShieldCheck size={18} className="text-emerald-400" />
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">Security</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">Avg</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-white">73%</p>
              <Activity size={18} className="text-amber-400" />
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">Debt</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium flex items-center gap-0.5">
                <ArrowDownRight size={12} /> -3%
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-white">45%</p>
              <TrendingUp size={18} className="text-slate-400" />
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">Critical Alerts</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium">Now</span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-white">{activeAlertsCount}</p>
              <AlertOctagon size={18} className="text-rose-400" />
            </div>
          </div>

        </div>

        {/* 2. Charts Section Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Performance Trend Chart */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/40">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Performance Trend</p>
                <h3 className="text-lg font-semibold text-white">Health vs debt over time</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Health
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Debt
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="health" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#healthGrad)" />
                  <Area type="monotone" dataKey="debt" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#debtGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scoring Breakdown Chart */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/40">
            <div className="mb-6">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Scoring Breakdown</p>
              <h3 className="text-lg font-semibold text-white">Metrics distribution</h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoringData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={90} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="score" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 3. Quick Remediation & Alerts Stream */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 bg-slate-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              <h3 className="text-base font-semibold text-white">Critical Remediation Feed</h3>
            </div>
            <span className="text-xs text-slate-400">{activeAlertsCount} pending actions</span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {alert.severity}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">@{alert.repo}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                </div>

                {alert.resolved ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 size={15} /> Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  >
                    Quick Fix
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}