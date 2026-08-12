import Image from 'next/image'

interface BrowserFrameProps {
  /** Screenshot path, e.g. /images/portfolio/amw-air-conditioning.png */
  src: string
  alt: string
  /** Real client domain shown in the URL bar, e.g. amwairconditioning.com */
  url?: string
  priority?: boolean
  sizes?: string
  className?: string
}

/**
 * Chrome-realistic browser window frame for portfolio screenshots.
 * Server component. Monochrome on-token window dots (no traffic-light
 * colors), optional mono URL chip, dark-theme layered shadow-card token.
 */
export default function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes,
  className = '',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated shadow-card ${className}`.trim()}
    >
      <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface-card px-3 py-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-surface-border" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-surface-border" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-surface-border" />
        {url ? (
          <span className="ml-3 truncate rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-gray-500">
            {url}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[8/5]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
