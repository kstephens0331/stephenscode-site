export default function Loading() {
  return (
    <div className="min-h-screen bg-surface px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-2xl border-2 border-surface-border">
          <div className="flex items-center gap-2 bg-surface-elevated px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-surface-border" />
            <div className="h-3 w-3 rounded-full bg-surface-border" />
            <div className="h-3 w-3 rounded-full bg-surface-border" />
            <div className="ml-4 h-6 w-full max-w-md animate-pulse rounded-full bg-surface-card" />
          </div>
          <div className="h-[70vh] animate-pulse bg-surface-card" />
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">Loading demo</p>
      </div>
    </div>
  )
}
