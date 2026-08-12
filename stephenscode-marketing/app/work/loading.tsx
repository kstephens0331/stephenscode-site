export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-9 w-56 animate-pulse rounded-full bg-surface-elevated" />
          <div className="mx-auto mt-8 h-14 w-72 animate-pulse rounded-lg bg-surface-elevated" />
          <div className="mx-auto mt-6 h-5 w-full max-w-xl animate-pulse rounded-lg bg-surface-card" />
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl border-2 border-surface-border bg-surface-card">
              <div className="aspect-[8/5] animate-pulse bg-surface-elevated" />
              <div className="space-y-4 p-8">
                <div className="h-6 w-24 animate-pulse rounded-full bg-surface-elevated" />
                <div className="h-7 w-2/3 animate-pulse rounded-lg bg-surface-elevated" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-surface-elevated" />
                <div className="h-4 w-5/6 animate-pulse rounded-lg bg-surface-elevated" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
