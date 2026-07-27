import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Search, Bell, Zap } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function AppShell({ children, searchQuery = '', onSearchChange }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-md lg:px-10">
          
          {/* Mobile Header Brand (Shows only on smaller screens) */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20">
              <Zap className="h-4 w-4 fill-slate-950 stroke-none" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wider">CODEPULSE <span className="text-cyan-400">AI</span></p>
              <p className="text-[9px] text-slate-400">Software Health</p>
            </div>
          </div>

          {/* Title Area for Desktop */}
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Repository Intelligence</p>
            <h2 className="text-lg font-bold text-white">Dashboard Overview</h2>
          </div>

          {/* Search & Actions Header */}
          <div className="flex items-center gap-4">
            <div className="relative w-64 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search repositories, issues, findings..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-2 pl-10 pr-4 text-xs text-white placeholder-slate-400 backdrop-blur-sm transition focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Views Container */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}