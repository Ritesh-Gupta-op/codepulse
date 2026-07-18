import { AppShell } from '../components/layout/AppShell';

export function AiLabPage() {
  return (
    <AppShell>
      <section className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">AI Lab</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Bug prediction and code repair studio</h3>
        <p className="mt-4 text-white/60">Future AI prompt engineering, code fix generation, and documentation flows belong here.</p>
      </section>
    </AppShell>
  );
}