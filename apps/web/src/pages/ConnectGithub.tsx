import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, GitBranch, Github, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
	{ icon: ShieldCheck, title: 'Secure by default', description: 'Scan with a read-only workflow and keep repository access limited to analysis.' },
	{ icon: Sparkles, title: 'AI-guided setup', description: 'Go from auth to insights with a guided flow that explains every step.' },
	{ icon: GitBranch, title: 'Repository-ready', description: 'Import a repo, trigger the first scan, then move straight into the dashboard.' }
];

const steps = ['Connect GitHub', 'Import repository', 'Review health score'];

export function ConnectGithub() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#050307] text-white">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_30%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%),linear-gradient(135deg,rgba(239,35,60,0.06),transparent_45%)]" />

			<main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10 lg:py-10">
				<header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
					<div>
						<p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/45">CodePulse AI</p>
						<h1 className="mt-1 text-sm font-semibold tracking-wide text-white/90">GitHub Connection</h1>
					</div>
					<div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-100 md:flex">
						<BadgeCheck className="h-4 w-4" />
						OAuth flow ready
					</div>
				</header>

				<section className="grid flex-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, ease: 'easeOut' }}
						className="space-y-8"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/55">
							<Zap className="h-4 w-4 text-[#ef233c]" />
							Step 1 of 3
						</div>

						<div className="max-w-3xl space-y-6">
							<h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
								Connect your GitHub org and start the first health scan.
							</h2>
							<p className="max-w-2xl text-base leading-7 text-white/68 md:text-lg">
								CodePulse AI reads repository signals, flags security risk, and turns the first import into an actionable health dashboard.
								The flow is designed to feel fast, clear, and reassuring from the first click.
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							{highlights.map(({ icon: Icon, title, description }) => (
								<div key={title} className="glass-panel rounded-3xl border border-white/10 bg-white/[0.03] p-5">
									<div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#ef233c]">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="text-sm font-semibold text-white">{title}</h3>
									<p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
								</div>
							))}
						</div>

						<div className="flex flex-col gap-4 sm:flex-row">
							<Link
								to="/repositories"
								className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ef233c] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(239,35,60,0.28)] transition hover:translate-y-[-1px] hover:bg-[#f43f56]"
							>
								Connect with GitHub
								<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
							</Link>
							<Link
								to="/dashboard"
								className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
							>
								Skip to dashboard
							</Link>
						</div>

						<div className="flex flex-wrap gap-3 pt-2 text-xs text-white/48">
							{steps.map((step, index) => (
								<div key={step} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
									<span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[0.65rem] font-semibold text-white/80">{index + 1}</span>
									{step}
								</div>
							))}
						</div>
					</motion.div>

					<motion.aside
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
						className="relative"
					>
						<div className="absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle,rgba(239,35,60,0.22),transparent_60%)] blur-2xl" />
						<div className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0710]/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-xs uppercase tracking-[0.35em] text-white/40">Connection preview</p>
									<h3 className="mt-2 text-2xl font-semibold text-white">Authorize, import, analyze</h3>
								</div>
								<div className="rounded-full border border-[#ef233c]/20 bg-[#ef233c]/10 px-3 py-1 text-xs font-medium text-[#ffb4bd]">
									Live flow
								</div>
							</div>

							<div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white">
										<Github className="h-6 w-6" />
									</div>
									<div>
										<p className="text-sm font-semibold text-white">GitHub OAuth</p>
										<p className="text-sm text-white/52">Read-only repository access</p>
									</div>
								</div>

								<div className="grid gap-3 sm:grid-cols-3">
									<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
										<p className="text-xs uppercase tracking-[0.3em] text-white/38">Security</p>
										<p className="mt-3 text-2xl font-semibold text-white">98%</p>
									</div>
									<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
										<p className="text-xs uppercase tracking-[0.3em] text-white/38">Debt</p>
										<p className="mt-3 text-2xl font-semibold text-white">12</p>
									</div>
									<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
										<p className="text-xs uppercase tracking-[0.3em] text-white/38">Time to scan</p>
										<p className="mt-3 text-2xl font-semibold text-white">~2m</p>
									</div>
								</div>
							</div>

							<div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#ef233c]/18 to-white/[0.03] p-5">
								<p className="text-xs uppercase tracking-[0.35em] text-white/42">What happens next</p>
								<p className="mt-3 text-sm leading-6 text-white/70">
									After connection, move into repository import and the first scan results. That keeps the onboarding flow aligned with the Superdesign draft while staying compatible with the current app routes.
								</p>
							</div>
						</div>
					</motion.aside>
				</section>
			</main>
		</div>
	);
}
