'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Eye, Download, Calendar, Filter } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [dateRange, setDateRange] = useState('7d')

  const metrics = [
    { icon: Users, label: 'Total Visitors', value: '24,532', change: '+12.5%', trend: 'up', color: colors.primary },
    { icon: DollarSign, label: 'Revenue', value: '$48,329', change: '+8.2%', trend: 'up', color: colors.success },
    { icon: ShoppingCart, label: 'Conversions', value: '1,284', change: '+15.7%', trend: 'up', color: colors.secondary },
    { icon: Eye, label: 'Page Views', value: '127,459', change: '-2.4%', trend: 'down', color: colors.accent },
  ]

  const revenueData = [
    { month: 'Jan', value: 42000 },
    { month: 'Feb', value: 38000 },
    { month: 'Mar', value: 45000 },
    { month: 'Apr', value: 51000 },
    { month: 'May', value: 48000 },
    { month: 'Jun', value: 54000 },
  ]

  const topProducts = [
    { name: 'Premium Package', sales: 234, revenue: '$23,400', growth: '+18%' },
    { name: 'Standard Plan', sales: 189, revenue: '$18,900', growth: '+12%' },
    { name: 'Basic Service', sales: 156, revenue: '$7,800', growth: '+8%' },
    { name: 'Add-on Feature', sales: 98, revenue: '$4,900', growth: '+25%' },
  ]

  const trafficSources = [
    { source: 'Organic Search', visitors: 12456, percentage: 51 },
    { source: 'Direct', visitors: 5892, percentage: 24 },
    { source: 'Social Media', visitors: 3679, percentage: 15 },
    { source: 'Referral', visitors: 2505, percentage: 10 },
  ]

  const maxRevenue = Math.max(...revenueData.map(d => d.value))

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Business Intelligence</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Real-time analytics and insights</p>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-lg border font-medium focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{metric.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{metric.value}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Revenue Trend</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: colors.backgroundAlt, color: colors.primary }}>
                  Revenue
                </button>
                <button className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors" style={{ color: colors.textLight }}>
                  Orders
                </button>
              </div>
            </div>

            <div className="h-80 flex items-end gap-4 px-4">
              {revenueData.map((item, index) => {
                const height = (item.value / maxRevenue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-t-lg transition-all hover:opacity-80 relative group" style={{
                      height: `${height}%`,
                      backgroundColor: colors.primary,
                      minHeight: '20px'
                    }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${(item.value / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <span className="text-sm font-medium" style={{ color: colors.textLight }}>{item.month}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Average Monthly Revenue</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>$46,333</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+12.8%</p>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Traffic Sources</h2>

            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ color: colors.text }}>{source.source}</span>
                    <span className="text-sm font-bold" style={{ color: colors.primary }}>{source.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: colors.primary
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>{source.visitors.toLocaleString()} visitors</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
              <button className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                View Detailed Report
              </button>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Top Performing Products</h2>
            <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: colors.border }}>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Product</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Sales</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Growth</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                          {index + 1}
                        </div>
                        <span className="font-semibold" style={{ color: colors.text }}>{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right" style={{ color: colors.text }}>{product.sales}</td>
                    <td className="py-4 px-4 text-right font-semibold" style={{ color: colors.primary }}>{product.revenue}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-green-600 font-semibold">{product.growth}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(product.sales / topProducts[0].sales) * 100}%`,
                            backgroundColor: colors.success
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goal Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: colors.text }}>Monthly Revenue Goal</h3>
              <TrendingUp className="w-5 h-5" style={{ color: colors.success }} />
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>$54,000</p>
            <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="h-2 rounded-full" style={{ width: '89%', backgroundColor: colors.success }} />
            </div>
            <p className="text-sm" style={{ color: colors.textLight }}>$48,329 / $54,000 (89%)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: colors.text }}>Customer Acquisition</h3>
              <Users className="w-5 h-5" style={{ color: colors.secondary }} />
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>1,200</p>
            <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="h-2 rounded-full" style={{ width: '96%', backgroundColor: colors.secondary }} />
            </div>
            <p className="text-sm" style={{ color: colors.textLight }}>1,152 / 1,200 (96%)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: colors.text }}>Conversion Rate</h3>
              <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} />
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>5.2%</p>
            <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="h-2 rounded-full" style={{ width: '104%', backgroundColor: colors.success }} />
            </div>
            <p className="text-sm" style={{ color: colors.textLight }}>5.2% / 5.0% (104%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
