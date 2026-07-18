interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  tone?: 'cyan' | 'amber' | 'rose' | 'emerald';
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  cyan: 'from-cyan-400/20 to-cyan-400/5 text-cyan-200',
  amber: 'from-amber-400/20 to-amber-400/5 text-amber-200',
  rose: 'from-rose-400/20 to-rose-400/5 text-rose-200',
  emerald: 'from-emerald-400/20 to-emerald-400/5 text-emerald-200'
};

export function StatCard({ label, value, delta, tone = 'cyan' }: StatCardProps) {
  return (
    <div className={`glass-panel rounded-3xl bg-gradient-to-br ${toneClasses[tone]} p-5`}>
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold tracking-tight text-white">{value}</h3>
        {delta ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{delta}</span> : null}
      </div>
    </div>
  );
}
