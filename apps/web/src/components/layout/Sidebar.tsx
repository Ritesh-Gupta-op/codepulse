import { Link, NavLink } from 'react-router-dom';
import { Activity, ShieldCheck, Bot, Files, Settings, LayoutDashboard, LogOut, Zap } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/repositories', label: 'Repositories', icon: Files },
  { to: '/insights', label: 'Insights', icon: Activity },
  { to: '/ai-lab', label: 'AI Lab', icon: Bot },
  { to: '/security', label: 'Security', icon: ShieldCheck },
  { to: '/admin', label: 'Admin', icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="glass-panel hidden h-screen w-72 flex-col justify-between border-r-white/10 px-5 py-6 lg:flex">
      <div>
        {/* Dynamic Vector Logo Block */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-slate-950 stroke-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold tracking-wider text-white">CODEPULSE</h1>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded border border-cyan-400/20">AI</span>
            </div>
            <p className="text-[10px] font-medium text-slate-400">Software Health Platform</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive ? 'bg-cyan-400/15 text-cyan-200 font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}