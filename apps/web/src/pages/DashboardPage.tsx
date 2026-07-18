import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { api } from '../services/api';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { StatCard } from '../components/ui/StatCard';
import { AppShell } from '../components/layout/AppShell';

const scoreData = [
  { name: 'Health', value: 84 },
  { name: 'Security', value: 78 },
  { name: 'Debt', value: 61 },
  { name: 'Maintainability', value: 82 }
];

const trendData = [
  { name: 'Mon', health: 72, debt: 61 },
  { name: 'Tue', health: 75, debt: 58 },
  { name: 'Wed', health: 78, debt: 56 },
  { name: 'Thu', health: 81, debt: 53 },
  { name: 'Fri', health: 83, debt: 51 },
  { name: 'Sat', health: 84, debt: 49 }
];

const alertData = [
  { name: 'Critical', value: 2 },
  { name: 'Warning', value: 6 },
  { name: 'Info', value: 11 }
];

const alertColors = ['#ef4444', '#f59e0b', '#06b6d4'];

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    void api
      .get('/dashboard/summary')
      .then((response) => setSummary(response.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <div className="space-y-6 pb-10">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <StatCard label="Repositories" value={summary?.totals.repositories ?? 0} delta="Active" tone="cyan" />
              <StatCard label="Health" value={`${summary?.scores.health ?? 0}%`} delta="Avg" tone="emerald" />
              <StatCard label="Security" value={`${summary?.scores.security ?? 0}%`} delta="Avg" tone="amber" />
              <StatCard label="Debt" value={`${summary?.scores.technicalDebt ?? 0}%`} delta="Watch" tone="rose" />
              <StatCard label="Critical Alerts" value={summary?.totals.alerts ?? 0} delta="Now" tone="rose" />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
              <div className="glass-panel rounded-3xl p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Performance trend</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">Health vs debt over time</h3>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
                      <YAxis stroke="rgba(255,255,255,0.4)" />
                      <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <Area type="monotone" dataKey="health" stroke="#22d3ee" fillOpacity={1} fill="url(#healthGradient)" />
                      <Area type="monotone" dataKey="debt" stroke="#f59e0b" fillOpacity={1} fill="url(#debtGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="glass-panel rounded-3xl p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">Scoring breakdown</p>
                  <div className="mt-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scoreData} layout="vertical">
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
                        <XAxis type="number" stroke="rgba(255,255,255,0.4)" />
                        <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.4)" />
                        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Bar dataKey="value" radius={[0, 16, 16, 0]} fill="#22d3ee" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">Alerts</p>
                  <div className="mt-5 h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={alertData} innerRadius={52} outerRadius={74} dataKey="value" paddingAngle={5}>
                          {alertData.map((_entry, index) => (
                            <Cell key={index} fill={alertColors[index % alertColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Recent repositories</p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                  <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                    <thead className="bg-white/5 text-white/55">
                      <tr>
                        <th className="px-4 py-3 font-medium">Repository</th>
                        <th className="px-4 py-3 font-medium">Health</th>
                        <th className="px-4 py-3 font-medium">Security</th>
                        <th className="px-4 py-3 font-medium">Debt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {(summary?.repositories ?? []).map((repository: any) => (
                        <tr key={repository._id} className="bg-white/[0.02]">
                          <td className="px-4 py-3 text-white">{repository.fullName}</td>
                          <td className="px-4 py-3 text-cyan-200">{repository.summary?.healthScore ?? 0}</td>
                          <td className="px-4 py-3 text-emerald-200">{repository.summary?.securityScore ?? 0}</td>
                          <td className="px-4 py-3 text-amber-200">{repository.summary?.technicalDebtScore ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Critical notifications</p>
                <div className="mt-5 space-y-3">
                  {(summary?.notifications ?? []).slice(0, 5).map((notification: any) => (
                    <div key={notification._id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-medium text-white">{notification.title}</p>
                      <p className="mt-1 text-sm text-white/60">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
