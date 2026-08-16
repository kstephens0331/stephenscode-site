'use client'

import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// Demo-scoped localStorage-backed state. Loads after mount (avoids SSR
// hydration mismatches) and saves on every change thereafter.
export default function usePersistentState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initial)
  const loaded = useRef(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) setState(JSON.parse(raw) as T)
    } catch {
      // Corrupted or unavailable storage -- keep in-memory defaults.
    }
    loaded.current = true
  }, [key])

  useEffect(() => {
    if (!loaded.current) return
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Storage unavailable -- state stays in memory for this session.
    }
  }, [key, state])

  return [state, setState]
}
