'use client'

import { useRef, type ReactNode } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import HeroGrid from './HeroGrid'

/**
 * Owns the homepage hero <section> chrome: the Build Grid canvas background
 * and the scroll-scrubbed 3D exit. The hero content (H1, copy, CTAs, trust
 * row) stays server-rendered in app/page.tsx and arrives here as children,
 * so SEO and LCP are untouched.
 *
 * All transforms are identity at scroll 0, so nothing is hidden pre-hydration
 * and the H1 paints immediately with its existing entrance animation. The
 * rotateX(0 -> 6deg) with origin-top tips the whole hero plane away as it
 * exits -- transform-only and compositor-friendly. LazyMotion + m keeps the
 * framer-motion payload on this route to ~19KB gzip.
 */
export default function HeroShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 56])
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.95], [1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 6])
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative bg-black border-b border-surface-border overflow-hidden"
    >
      <HeroGrid progress={scrollYProgress} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/40 via-black/50 to-black" />
      <LazyMotion features={domAnimation} strict>
        <m.div
          className="relative"
          style={
            reduced
              ? undefined
              : {
                  y,
                  opacity,
                  rotateX,
                  transformPerspective: 1200,
                  transformOrigin: 'top center',
                }
          }
        >
          {children}
        </m.div>
      </LazyMotion>
    </section>
  )
}
