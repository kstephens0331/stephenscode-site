export default function BracketEyebrow({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500 ${className}`.trim()}
    >
      <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
      <span>{label}</span>
      <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
    </div>
  )
}
