import { AppShell } from '../components/layout/AppShell';

export function RepositoryDetailPage() {
  return (
    <AppShell>
      <section className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Repository detail</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Insights, issues, fixes, and docs</h3>
        <p className="mt-4 max-w-2xl text-white/60">
          This view is ready for repository-scoped charts, findings tables, code fix recommendations, and downloadable reports.
        </p>
      </section>
    </AppShell>
  );
}
