import { AppShell } from '../components/layout/AppShell';

export function AdminPage() {
  return (
    <AppShell>
      <section className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Admin</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Operational overview</h3>
        <p className="mt-4 text-white/60">This area is prepared for user management, subscription controls, audit logs, and system health monitoring.</p>
      </section>
    </AppShell>
  );
}
