import { AppShell } from '../components/layout/AppShell';

export function InsightsPage() {
  return (
    <AppShell>
      <section className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Insights</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Cross-repository intelligence</h3>
        <p className="mt-4 text-white/60">This area is reserved for portfolio-wide trends, issue clustering, and benchmark comparisons.</p>
      </section>
    </AppShell>
  );
}