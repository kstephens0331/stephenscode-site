'use client'

// Client-side password gate for the private MissionReady partnership proposal.
// The proposal is a self-contained interactive HTML document rendered inside an iframe
// (srcDoc) so its inline styles and model script stay isolated from the marketing site.
// This is a deterrent for a private, unlisted, noindex page, not hard security. Change the
// password by setting NEXT_PUBLIC_PROPOSAL_PW in Vercel, or edit PW below.
import { useCallback, useEffect, useRef, useState } from 'react'
import { proposalHtml } from './proposalHtml'

const PW = process.env.NEXT_PUBLIC_PROPOSAL_PW || 'SemperFi2026'

export default function Gate() {
  const [ok, setOk] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  // hydrate unlock state after mount (sessionStorage is client-only)
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mr_ok') === '1') setOk(true)
    } catch {
      /* ignore */
    }
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === PW) {
      try {
        sessionStorage.setItem('mr_ok', '1')
      } catch {
        /* ignore */
      }
      setOk(true)
      setErr(false)
    } else {
      setErr(true)
    }
  }

  // size the iframe to its content so the whole document shows and only the page scrolls
  const fit = useCallback(() => {
    const f = frame.current
    try {
      const d = f?.contentDocument
      if (f && d?.documentElement) {
        f.style.height = Math.max(d.documentElement.scrollHeight, d.body?.scrollHeight ?? 0) + 'px'
      }
    } catch {
      /* same-origin srcDoc, should not throw */
    }
  }, [])

  useEffect(() => {
    if (!ok) return undefined
    fit()
    const id = setInterval(fit, 400)
    const stop = setTimeout(() => clearInterval(id), 4000)
    window.addEventListener('resize', fit)
    return () => {
      clearInterval(id)
      clearTimeout(stop)
      window.removeEventListener('resize', fit)
    }
  }, [ok, fit])

  if (ok) {
    return (
      <iframe
        ref={frame}
        title="MissionReady Partnership Proposal"
        srcDoc={proposalHtml}
        onLoad={fit}
        style={{ width: '100%', border: 0, display: 'block', minHeight: '100vh', background: '#F6F3EC' }}
      />
    )
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
      <form
        onSubmit={submit}
        style={{ width: '100%', maxWidth: 420, background: '#16181d', border: '1px solid #2a2f39', borderRadius: 14, padding: '28px 26px', boxShadow: '0 10px 40px rgba(0,0,0,.35)' }}
      >
        <div style={{ font: '600 11px/1 ui-monospace,Menlo,monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#CB9C40' }}>MissionReady</div>
        <h1 style={{ font: '600 23px/1.1 Georgia,serif', margin: '11px 0 6px', color: '#E9E6DE' }}>Partnership proposal</h1>
        <p style={{ color: '#9E9A8F', fontSize: 14, margin: '0 0 18px', lineHeight: 1.5 }}>
          This document is private. Enter the password you were given to view it.
        </p>
        <input
          type="password"
          value={pw}
          autoFocus
          placeholder="Password"
          onChange={(e) => {
            setPw(e.target.value)
            setErr(false)
          }}
          style={{ width: '100%', padding: '11px 13px', borderRadius: 9, border: '1px solid #2a2f39', background: '#0f1115', color: '#E9E6DE', fontSize: 15, outline: 'none' }}
        />
        {err && <div style={{ color: '#e0715f', fontSize: 13, marginTop: 9 }}>That password is not right. Try again.</div>}
        <button
          type="submit"
          style={{ width: '100%', marginTop: 14, padding: '11px 13px', borderRadius: 9, border: 0, background: '#CB9C40', color: '#15181E', font: '600 15px system-ui', cursor: 'pointer' }}
        >
          View proposal
        </button>
      </form>
    </div>
  )
}
