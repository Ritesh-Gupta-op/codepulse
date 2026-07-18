export function LoadingSkeleton() {
  return (
    <div className="glass-panel animate-pulse rounded-3xl p-6">
      <div className="h-4 w-40 rounded-full bg-white/10" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
