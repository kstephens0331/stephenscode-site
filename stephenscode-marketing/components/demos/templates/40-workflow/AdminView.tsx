'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Activity, Zap, Settings } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Automation Administration</h1>
          <p className="mt-2" style={{ color: colors.textLight }}>Configure integrations and logs</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Integration Hub</h2>
            <div className="space-y-4">
              {['Email Provider', 'Calendar Service', 'CRM System', 'Payment Gateway'].map((integration, index) => (
                <div key={index} className="p-4 rounded-lg border flex items-center justify-between" style={{ borderColor: colors.border }}>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5" style={{ color: colors.primary }} />
                    <span className="font-semibold" style={{ color: colors.text }}>{integration}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Execution Logs</h2>
            <div className="space-y-3">
              {[
                { workflow: 'Customer Onboarding', status: 'Success', time: '2 min ago' },
                { workflow: 'Payment Reminder', status: 'Success', time: '15 min ago' },
                { workflow: 'Lead Nurture', status: 'Failed', time: '1 hour ago' },
              ].map((log, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold" style={{ color: colors.text }}>{log.workflow}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: colors.textLight }}>{log.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
