import { Link, NavLink } from 'react-router-dom';
import { Activity, ShieldCheck, Bot, Files, Settings, LayoutDashboard, LogOut } from 'lucide-react';

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
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            C
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">CodePulse AI</p>
            <h1 className="text-xl font-semibold">Software Health Platform</h1>
          </div>
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive ? 'bg-cyan-400/15 text-cyan-200' : 'text-white/70 hover:bg-white/5 hover:text-white'
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

      <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
