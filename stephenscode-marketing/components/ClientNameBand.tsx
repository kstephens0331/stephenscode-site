import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Real clients only -- spellings verified against the published rosters on
 * /work and /partners. Never add a name that is not published there.
 */
const DEFAULT_CLIENTS = [
  'AMW Air Conditioning',
  'Benefit Builder',
  'Lefty Cartel',
  "Car's Collision & Refinish Shop",
  'FC Photo Houston',
  'Terracotta Construction',
  'JustWell Clinical Research',
  'ColorFuse Prints',
  'Stephen Long for Congress',
  'The Scattered Stethoscope',
  'Get Step Ready',
  'Forge-X',
]

interface ClientNameBandProps {
  /** Client names to display. Defaults to the published /work roster. */
  names?: string[]
  label?: string
  /** Render the trailing "See the work" link to /work. */
  showWorkLink?: boolean
}

/**
 * Understated single-row band of real client names. Server component.
 * Static flex-wrap on purpose -- no marquee (marquees are a template tell).
 */
export default function ClientNameBand({
  names = DEFAULT_CLIENTS,
  label = 'Built for real businesses',
  showWorkLink = true,
}: ClientNameBandProps) {
  return (
    <section className="bg-black border-y border-surface-border py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500 mb-6">
          {label}
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
          {names.map((name) => (
            <li
              key={name}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-400 whitespace-nowrap"
            >
              {name}
            </li>
          ))}
          {showWorkLink ? (
            <li>
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                See the work
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  )
}
