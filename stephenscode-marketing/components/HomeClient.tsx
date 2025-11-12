'use client'

import { useEffect } from 'react'

export default function HomeClient() {
  useEffect(() => {
    // Add custom CSS animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }

      .animation-delay-200 {
        animation-delay: 0.2s;
      }

      .animation-delay-400 {
        animation-delay: 0.4s;
      }

      .animation-delay-600 {
        animation-delay: 0.6s;
      }

      .animation-delay-800 {
        animation-delay: 0.8s;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
