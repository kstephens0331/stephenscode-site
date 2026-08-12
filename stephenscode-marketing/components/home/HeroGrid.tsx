'use client'

import { useEffect, useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'

interface HeroGridProps {
  /** Hero scroll progress: 0 at top of page, 1 when the hero has scrolled past. */
  progress: MotionValue<number>
}

interface Dot {
  /** Flat-grid position on the 34px lattice (the site's house dot pattern). */
  fx: number
  fy: number
  /** Perspective "floor" position projected toward the horizon. */
  px: number
  py: number
  depth: number
  /** Cursor energy, decays per frame. */
  e: number
}

const SPACING = 34
const CURSOR_RADIUS = 170

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * The Build Grid -- cursor-reactive perspective dot-grid canvas.
 *
 * Three aria-hidden, pointer-events-none layers:
 * 1. Always-rendered static fallback: the house 34px dot pattern + two aurora
 *    drift blobs (mobile / reduced-motion / no-JS get this).
 * 2. A canvas mounted only on fine-pointer desktop without reduced motion.
 *    Each dot stores both a flat lattice position and a perspective floor
 *    position; per frame they lerp by scroll progress, so the tilted 3D floor
 *    lies down into the site's ordinary flat grid as you scroll.
 * 3. Cursor glow: dots within 170px of the pointer energize brand-orange and
 *    decay at 0.94/frame.
 *
 * Perf rules: dpr capped at 1.5; rAF is event-gated (pointermove, progress
 * change, or live energy) and the loop cancels itself when idle, so a static
 * hero costs 0 CPU.
 */
export default function HeroGrid({ progress }: HeroGridProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasEnabled, setCanvasEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduced) setCanvasEnabled(true)
  }, [])

  useEffect(() => {
    if (!canvasEnabled) return
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return
    const section = root.closest('section')
    const ctx = canvas.getContext('2d')
    if (!ctx || !section) return

    let W = 0
    let H = 0
    let dots: Dot[] = []
    let mx = -9999
    let my = -9999
    let raf = 0

    const build = () => {
      const rect = section.getBoundingClientRect()
      W = rect.width
      H = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const horizon = H * 0.34
      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 1
      dots = []
      for (let r = 0; r < rows; r++) {
        // Top rows sit far away on the perspective floor.
        const z = 1 + (1 - r / rows) * 2.4
        for (let c = 0; c < cols; c++) {
          const fx = c * SPACING + 2
          const fy = r * SPACING + 2
          const px = W / 2 + ((fx - W / 2) / z) * 1.9
          const py = horizon + ((fy - horizon) / z) * 2.2
          dots.push({ fx, fy, px, py, depth: 1 / z, e: 0 })
        }
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const frame = () => {
      raf = 0
      const p = easeOutCubic(Math.min(Math.max(progress.get(), 0), 1))
      ctx.clearRect(0, 0, W, H)
      let live = false
      for (const d of dots) {
        // Lerp perspective floor -> flat lattice by scroll progress.
        const x = d.px + (d.fx - d.px) * p
        const y = d.py + (d.fy - d.py) * p
        const dist = Math.hypot(x - mx, y - my)
        if (dist < CURSOR_RADIUS) {
          d.e = Math.max(d.e, (1 - dist / CURSOR_RADIUS) ** 2)
        }
        const base = 0.04 + d.depth * 0.05
        if (d.e > 0.01) {
          d.e *= 0.94
          live = true
          ctx.fillStyle = `rgba(239,78,34,${base + d.e * 0.75})`
        } else {
          ctx.fillStyle = `rgba(255,255,255,${base})`
        }
        ctx.beginPath()
        ctx.arc(x, y, 1 + d.depth * 0.4 + d.e * 1.1, 0, Math.PI * 2)
        ctx.fill()
      }
      // Keep animating only while energy is decaying; otherwise go idle.
      if (live) schedule()
    }

    const onPointerMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mx = ev.clientX - rect.left
      my = ev.clientY - rect.top
      schedule()
    }

    const onPointerLeave = () => {
      mx = -9999
      my = -9999
      schedule()
    }

    build()
    schedule()

    const unsubscribe = progress.on('change', schedule)
    const ro = new ResizeObserver(() => {
      build()
      schedule()
    })
    ro.observe(section)
    section.addEventListener('pointermove', onPointerMove)
    section.addEventListener('pointerleave', onPointerLeave)

    return () => {
      unsubscribe()
      ro.disconnect()
      section.removeEventListener('pointermove', onPointerMove)
      section.removeEventListener('pointerleave', onPointerLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [canvasEnabled, progress])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Static fallback: house dot pattern. Fades out when the canvas takes
          over so dots don't double. */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          canvasEnabled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '34px 34px',
        }}
      />
      {/* Aurora drift blobs -- mobile's share of the wow, cheap transform-only. */}
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      {canvasEnabled ? <canvas ref={canvasRef} className="absolute inset-0" /> : null}
    </div>
  )
}
