import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SACVPN | Enterprise-Grade VPN Security | StephensCode',
  description: 'SACVPN provides enterprise-grade VPN security for businesses. Secure your remote workforce and protect sensitive data with military-grade encryption.',
  keywords: [
    'enterprise VPN',
    'business VPN solution',
    'secure remote access',
    'corporate VPN',
    'VPN security Houston',
    'private network Texas',
    'secure business communications'
  ],
  openGraph: {
    title: 'SACVPN | Enterprise-Grade VPN Security | StephensCode',
    description: 'SACVPN provides enterprise-grade VPN security for businesses. Secure your remote workforce and protect sensitive data with military-grade encryption.',
    url: 'https://stephenscode.dev/sacvpn',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stephenscode.dev/sacvpn',
  },
}

export default function SACVPNPage() {
  const features = [
    {
      icon: '🔒',
      title: 'Military-Grade Encryption',
      description: 'AES-256 encryption protects all data in transit, the same standard used by government agencies and financial institutions.'
    },
    {
      icon: '🌐',
      title: 'Global Server Network',
      description: 'Access secure servers worldwide for fast, reliable connections no matter where your team is located.'
    },
    {
      icon: '👥',
      title: 'Multi-User Management',
      description: 'Easy admin dashboard to manage team access, permissions, and monitor usage across your organization.'
    },
    {
      icon: '🚀',
      title: 'High-Speed Performance',
      description: 'Optimized infrastructure ensures minimal latency so your team can work without slowdowns.'
    },
    {
      icon: '📱',
      title: 'Cross-Platform Support',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. Protect all your devices with a single solution.'
    },
    {
      icon: '🛡️',
      title: 'Zero-Log Policy',
      description: 'We never track, store, or share your browsing activity. Your business data stays private.'
    },
  ]

  const useCases = [
    {
      title: 'Remote Workforce Security',
      description: 'Protect employees working from home, coffee shops, or on the road. Ensure secure access to company resources from anywhere.',
      icon: '🏠'
    },
    {
      title: 'Secure Client Communications',
      description: 'Keep client data and communications protected. Essential for law firms, healthcare providers, and financial services.',
      icon: '💼'
    },
    {
      title: 'Public Wi-Fi Protection',
      description: 'Shield your team from hackers on public networks. Hotels, airports, and conferences are prime targets for data theft.',
      icon: '📶'
    },
    {
      title: 'Compliance Requirements',
      description: 'Meet security requirements for HIPAA, PCI-DSS, and other regulatory frameworks that require encrypted communications.',
      icon: '✅'
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-20"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-blue-500/20 border border-blue-500/30 px-6 py-3 text-sm font-semibold text-blue-300 mb-8">
              <span className="mr-2">🔐</span>
              Enterprise-Grade VPN Security
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SACVPN
              </span>
            </h1>

            <p className="text-2xl font-semibold text-blue-200 mb-4">
              Secure Access. Complete Privacy. Zero Compromise.
            </p>

            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade VPN security built for businesses that take data protection seriously.
              Protect your remote workforce, secure sensitive communications, and ensure compliance
              with industry regulations.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://sacvpn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-105"
              >
                <span>Get SACVPN</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                <span>Contact Sales</span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Built by StephensCode • Trusted by businesses nationwide
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why SACVPN?</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Enterprise Security Made Simple
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              All the security features your business needs, without the complexity of enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-gray-50 p-8 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all hover:shadow-xl border border-gray-100 hover:border-blue-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Use Cases</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Built for Business
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-start gap-6 rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 text-5xl">{useCase.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Simple Setup</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Get Protected in Minutes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Subscribe</h3>
              <p className="text-gray-600">
                Choose your plan based on team size and needs. No long-term contracts required.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Install</h3>
              <p className="text-gray-600">
                Download the app on any device. Simple one-click installation with no technical expertise needed.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600">
                One click to connect. Your entire team is now protected with enterprise-grade encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of businesses that trust SACVPN to protect their data,
            secure their communications, and keep their teams safe online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://sacvpn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-105"
            >
              <span>Visit SACVPN.com</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/services/enterprise-vpn"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>View Add-On Details</span>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Questions? <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact our team</Link> for enterprise pricing and custom solutions.
          </p>
        </div>
      </section>
    </>
  )
}
