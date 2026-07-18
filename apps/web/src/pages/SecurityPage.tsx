import { AppShell } from '../components/layout/AppShell';

export function SecurityPage() {
  return (
    <AppShell>
      <section className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Security</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Vulnerability triage</h3>
        <p className="mt-4 text-white/60">This view will aggregate package findings, secret scans, and remediation priorities.</p>
      </section>
    </AppShell>
  );
}