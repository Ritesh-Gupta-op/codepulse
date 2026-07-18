import { Bell, Search, MoonStar } from 'lucide-react';

export function Topbar() {
  return (
    <header className="glass-panel flex flex-col gap-4 rounded-3xl px-4 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Repository Intelligence</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Command center</h2>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3">
        <label className="hidden w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/50 md:flex">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search repositories, issues, findings...</span>
        </label>
        <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 transition hover:bg-white/10 hover:text-white">
          <MoonStar className="h-4 w-4" />
        </button>
        <button className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-3 text-cyan-100 transition hover:bg-cyan-400/20">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
