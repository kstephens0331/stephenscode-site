'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string | null
  colors: ColorPalette
  onDismiss: () => void
}

export default function Toast({ message, colors, onDismiss }: ToastProps) {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-white max-w-sm"
      style={{ backgroundColor: colors.primaryDark }}
    >
      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-semibold">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="p-1 rounded-lg hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
