import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Crown, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    description: 'For solo maintainers and small open-source projects.',
    monthly: 0,
    annual: 0,
    badge: 'Free forever',
    accent: 'cyan',
    features: ['2 repositories', 'Weekly scans', 'Basic health score', 'Community support']
  },
  {
    name: 'Pro',
    description: 'For teams that want fast feedback and deeper intelligence.',
    monthly: 39,
    annual: 29,
    badge: 'Most popular',
    accent: 'rose',
    featured: true,
    features: ['Unlimited repositories', 'Daily scans', 'Security alerts', 'AI fix suggestions', 'Priority support']
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with compliance and governance needs.',
    monthly: 149,
    annual: 119,
    badge: 'Custom terms',
    accent: 'amber',
    features: ['SSO and SAML', 'Custom retention', 'Audit logs', 'Dedicated success', 'On-prem options']
  }
];

const comparisons = [
  ['Repository scans', '2', 'Unlimited', 'Unlimited'],
  ['Scan cadence', 'Weekly', 'Daily', 'Custom'],
  ['Security alerts', false, true, true],
  ['AI bug prediction', false, true, true],
  ['Technical debt scoring', true, true, true],
  ['SBOM / dependency insights', false, true, true],
  ['Audit logs', false, false, true],
  ['SSO / SAML', false, false, true],
  ['Priority support', false, true, true],
  ['Team dashboards', false, true, true]
];

const faqs = [
  {
    question: 'Can I start free and upgrade later?',
    answer: 'Yes. Starter is free forever and you can move to Pro or Enterprise at any time without losing your existing repositories.'
  },
  {
    question: 'How does billing work?',
    answer: 'You can view both monthly and annual pricing. Annual billing lowers the effective monthly rate for Pro and Enterprise.'
  },
  {
    question: 'What does Pro include?',
    answer: 'Pro unlocks unlimited repositories, daily scans, security alerts, AI-driven suggestions, and priority support.'
  },
  {
    question: 'Do you offer enterprise controls?',
    answer: 'Enterprise includes SSO, audit logs, custom retention, and flexible deployment options for larger teams.'
  }
];

function formatPrice(amount: number) {
  return amount === 0 ? '0' : amount.toLocaleString('en-US');
}

export function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050307] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,35,60,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%),linear-gradient(135deg,rgba(239,35,60,0.06),transparent_48%)]" />

      <main className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="mb-12 flex flex-col gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ef233c] to-[#7f1d1d] text-sm font-bold text-white shadow-[0_20px_50px_rgba(239,35,60,0.35)]">
              C
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/45">CodePulse AI</p>
              <h1 className="text-sm font-semibold text-white/90">Pricing & Plans</h1>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/65">
            <Link to="/dashboard" className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white">Dashboard</Link>
            <Link to="/repositories" className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white">Repositories</Link>
            <Link to="/connect-github" className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white">Connect GitHub</Link>
            <span className="rounded-full border border-[#ef233c]/20 bg-[#ef233c]/10 px-4 py-2 text-[#ffb4bd]">Pricing</span>
          </nav>
        </header>

        <section className="grid gap-8 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/55">
              <Sparkles className="h-4 w-4 text-[#ef233c]" />
              Choose your plan
            </div>

            <h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
              Software health intelligence for every team size.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-white/65 md:text-lg">
              Move from a free scan to a full operational command center. CodePulse AI helps teams track repository health, security risk, and technical debt with a pricing model that scales cleanly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setAnnualBilling(true)}
                className={`rounded-full px-4 py-2 text-sm transition ${annualBilling ? 'bg-[#ef233c] text-white shadow-[0_18px_40px_rgba(239,35,60,0.25)]' : 'border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`}
              >
                Annual billing
              </button>
              <button
                onClick={() => setAnnualBilling(false)}
                className={`rounded-full px-4 py-2 text-sm transition ${!annualBilling ? 'bg-[#ef233c] text-white shadow-[0_18px_40px_rgba(239,35,60,0.25)]' : 'border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`}
              >
                Monthly billing
              </button>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-100">
                Save up to 25% annually
              </span>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="glass-panel rounded-[2rem] border border-white/10 bg-[#0c0710]/90 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Plan recommendation</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Most teams start with Pro</h3>
              </div>
              <div className="rounded-full border border-[#ef233c]/20 bg-[#ef233c]/10 px-3 py-1 text-xs font-medium text-[#ffb4bd]">
                Featured
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>Health coverage</span>
                <span>96%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[96%] rounded-full bg-gradient-to-r from-[#ef233c] to-[#ff7b8a]" />
              </div>

              <div className="flex items-center justify-between text-sm text-white/65">
                <span>Alert response</span>
                <span>88%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[88%] rounded-full bg-gradient-to-r from-amber-400 to-[#ef233c]" />
              </div>

              <div className="flex items-center justify-between text-sm text-white/65">
                <span>Automation depth</span>
                <span>92%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-[#ef233c]" />
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-white/60">
              Use annual billing to reduce spend while keeping all scanning, alerting, and AI guidance features active across your team.
            </p>
          </motion.aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const price = annualBilling ? plan.annual : plan.monthly;
            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                className={`relative overflow-hidden rounded-[2rem] border p-6 ${plan.featured ? 'border-[#ef233c]/45 bg-[#13070b] shadow-[0_30px_100px_rgba(239,35,60,0.18)] lg:scale-[1.02]' : 'border-white/10 bg-white/[0.03]'}`}
              >
                {plan.featured ? (
                  <div className="absolute right-4 top-4 rounded-full border border-[#ef233c]/20 bg-[#ef233c]/10 px-3 py-1 text-xs font-medium text-[#ffb4bd]">
                    Most popular
                  </div>
                ) : null}

                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${plan.accent === 'rose' ? 'border-[#ef233c]/30 bg-[#ef233c]/10 text-[#ffb4bd]' : plan.accent === 'amber' ? 'border-amber-400/20 bg-amber-400/10 text-amber-100' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'}`}>
                  {plan.featured ? <Crown className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">{plan.badge}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{plan.description}</p>
                </div>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-sm text-white/45">$</span>
                  <span className="text-5xl font-semibold tracking-tight text-white">{formatPrice(price)}</span>
                  <span className="pb-1 text-sm text-white/45">/mo</span>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-white/72">
                      <Check className="h-4 w-4 text-[#ef233c]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.featured ? '/connect-github' : '/repositories'}
                  className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition ${plan.featured ? 'bg-[#ef233c] text-white shadow-[0_18px_45px_rgba(239,35,60,0.28)] hover:bg-[#f43f56]' : 'border border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]'}`}
                >
                  Choose {plan.name}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-16 space-y-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Comparison</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Everything included across the plans</h3>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/[0.04] text-white/60">
                <tr>
                  <th className="px-5 py-4 font-medium">Feature</th>
                  <th className="px-5 py-4 font-medium">Starter</th>
                  <th className="px-5 py-4 font-medium text-[#ffb4bd]">Pro</th>
                  <th className="px-5 py-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparisons.map(([label, starter, pro, enterprise]) => (
                  <tr key={String(label)} className="bg-white/[0.02]">
                    <td className="px-5 py-4 text-white">{label}</td>
                    <td className="px-5 py-4 text-white/65">{typeof starter === 'boolean' ? (starter ? <Check className="h-4 w-4 text-emerald-300" /> : <X className="h-4 w-4 text-white/25" />) : starter}</td>
                    <td className="px-5 py-4 text-[#ffb4bd]">{typeof pro === 'boolean' ? (pro ? <Check className="h-4 w-4 text-emerald-300" /> : <X className="h-4 w-4 text-white/25" />) : pro}</td>
                    <td className="px-5 py-4 text-white/65">{typeof enterprise === 'boolean' ? (enterprise ? <Check className="h-4 w-4 text-emerald-300" /> : <X className="h-4 w-4 text-white/25" />) : enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-4 lg:grid-cols-2">
          <div className="glass-panel rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">FAQ</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Common questions</h3>

            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-white">
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-white/45 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-white/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#ef233c]/25 bg-[#13070b] p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,35,60,0.18),transparent_45%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Final CTA</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Ready to monitor your codebase?</h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
                Start with the free plan, move to Pro when you want daily intelligence, or talk to us about enterprise controls and compliance.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/connect-github"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ef233c] px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(239,35,60,0.3)] transition hover:bg-[#f43f56]"
                >
                  Start with GitHub
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
                >
                  Admin / subscription controls
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>CodePulse AI helps teams understand software health at a glance.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="transition hover:text-white">Dashboard</Link>
            <Link to="/repositories" className="transition hover:text-white">Repositories</Link>
            <Link to="/admin" className="transition hover:text-white">Admin</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}