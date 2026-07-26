import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Search,
  Bell,
  RotateCcw
} from 'lucide-react';


interface AppShellProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function AppShell({ children, searchQuery, onSearchChange }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Auth token clear korar dorkar porle:
    // localStorage.removeItem('token');
    
    // Login route-e redirect korbe
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Repositories', icon: FolderGit2, path: '/repositories' },
    { label: 'Insights', icon: BarChart3, path: '/insights' },
    { label: 'AI Lab', icon: Sparkles, path: '/ai-lab' },
    { label: 'Security', icon: ShieldCheck, path: '/security' },
    { label: 'Admin', icon: Settings, path: '/admin' },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F17] text-slate-100 overflow-hidden">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900/60 border-r border-white/10 flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Top Logo & App Title */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
 <img 
  src="/assets/logo.jpg" 
  alt="Logo" 
  className="w-9 h-9 object-contain rounded-lg" 
/>
            <div>
              <h1 className="text-sm font-semibold text-white tracking-wide uppercase">
                CODEPULSE AI
              </h1>
              <p className="text-xs text-slate-400">
                Software Health
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-200 group font-medium"
          >
            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar Header */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between shrink-0 bg-slate-900/40">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Repository Intelligence</p>
            <h2 className="text-lg font-bold text-white capitalize">
              {location.pathname.replace('/', '').replace('-', ' ') || 'Command Center'}
            </h2>
          </div>

          {/* Search bar & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search repositories, issues, findings..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-80 bg-slate-950/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <RotateCcw size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors relative">
              <Bell size={18} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5" />
            </button>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}