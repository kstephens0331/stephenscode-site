import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Lock, Globe, Users, Zap, Smartphone, ShieldCheck,
  Home, Briefcase, Wifi, BadgeCheck, ExternalLink,
} from 'lucide-react'

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
    url: 'https://www.stephenscode.dev/sacvpn',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/sacvpn',
  },
}

export default function SACVPNPage() {
  const features = [
    {
      Icon: Lock,
      title: 'Military-Grade Encryption',
      description: 'AES-256 encryption protects all data in transit, the same standard used by government agencies and financial institutions.'
    },
    {
      Icon: Globe,
      title: 'Global Server Network',
      description: 'Access secure servers worldwide for fast, reliable connections no matter where your team is located.'
    },
    {
      Icon: Users,
      title: 'Multi-User Management',
      description: 'Easy admin dashboard to manage team access, permissions, and monitor usage across your organization.'
    },
    {
      Icon: Zap,
      title: 'High-Speed Performance',
      description: 'Optimized infrastructure ensures minimal latency so your team can work without slowdowns.'
    },
    {
      Icon: Smartphone,
      title: 'Cross-Platform Support',
      description: 'Works on Windows, Mac, Linux, iOS, and Android. Protect all your devices with a single solution.'
    },
    {
      Icon: ShieldCheck,
      title: 'Zero-Log Policy',
      description: 'We never track, store, or share your browsing activity. Your business data stays private.'
    },
  ]

  const useCases = [
    {
      title: 'Remote Workforce Security',
      description: 'Protect employees working from home, coffee shops, or on the road. Ensure secure access to company resources from anywhere.',
      Icon: Home
    },
    {
      title: 'Secure Client Communications',
      description: 'Keep client data and communications protected. Essential for law firms, healthcare providers, and financial services.',
      Icon: Briefcase
    },
    {
      title: 'Public Wi-Fi Protection',
      description: 'Shield your team from hackers on public networks. Hotels, airports, and conferences are prime targets for data theft.',
      Icon: Wifi
    },
    {
      title: 'Compliance Requirements',
      description: 'Meet security requirements for HIPAA, PCI-DSS, and other regulatory frameworks that require encrypted communications.',
      Icon: BadgeCheck
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        {/* Soft vertical sheen — barely there, gives the canvas depth without halo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Enterprise-Grade VPN Security</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              SACVPN
            </h1>

            <p className="text-2xl font-semibold text-primary-500 mb-4">
              Secure Access. Complete Privacy. Zero Compromise.
            </p>

            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade VPN security built for businesses that take data protection seriously.
              Protect your remote workforce, secure sensitive communications, and ensure compliance
              with industry regulations.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://sacvpn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                <span>Get SACVPN</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                <span>Contact Sales</span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Built by StephensCode &middot; Trusted by businesses nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-surface py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 mb-3">Why SACVPN?</div>
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Enterprise Security Made Simple
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              All the security features your business needs, without the complexity of enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.Icon
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl bg-surface-card p-8 ring-1 ring-surface-border hover:ring-primary-500/50 transition-colors"
                >
                  <Icon className="h-6 w-6 text-primary-500 mb-4" strokeWidth={1.75} />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-surface-card py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 mb-3">Use Cases</div>
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built for Business
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {useCases.map((useCase) => {
              const Icon = useCase.Icon
              return (
                <div
                  key={useCase.title}
                  className="flex items-start gap-5 rounded-2xl bg-surface p-8 ring-1 ring-surface-border hover:ring-primary-500/50 transition-colors"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md border border-primary-500/40 text-primary-500">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 mb-3">Simple Setup</div>
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get Protected in Minutes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-md border-2 border-primary-500 bg-black flex items-center justify-center text-2xl font-bold text-primary-500 mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subscribe</h3>
              <p className="text-gray-400">
                Choose your plan based on team size and needs. No long-term contracts required.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-md border-2 border-primary-500 bg-black flex items-center justify-center text-2xl font-bold text-primary-500 mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Install</h3>
              <p className="text-gray-400">
                Download the app on any device. Simple one-click installation with no technical expertise needed.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-md border-2 border-primary-500 bg-black flex items-center justify-center text-2xl font-bold text-primary-500 mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
              <p className="text-gray-400">
                One click to connect. Your entire team is now protected with enterprise-grade encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of businesses that trust SACVPN to protect their data,
            secure their communications, and keep their teams safe online.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://sacvpn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              <span>Visit SACVPN.com</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/services/enterprise-vpn"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
            >
              <span>View Add-On Details</span>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Questions? <Link href="/contact" className="text-primary-400 hover:text-primary-300">Contact our team</Link> for enterprise pricing and custom solutions.
          </p>
        </div>
      </section>
    </>
  )
}
