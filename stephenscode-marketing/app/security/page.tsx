import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Security & Trust',
  description:
    'How StephensCode secures customer software and data. Controls aligned to SOC 2 and ISO 27001, plus HIPAA-aligned safeguards for healthcare engagements.',
  keywords: [
    'StephensCode security',
    'SOC 2',
    'ISO 27001',
    'HIPAA',
    'trust center',
    'data security',
    'business associate agreement',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Security & Trust',
    description:
      'Controls aligned to SOC 2 and ISO 27001, HIPAA-aligned safeguards, and BAAs available for healthcare engagements.',
    url: 'https://www.stephenscode.dev/security',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Trust',
    description: 'Controls aligned to SOC 2 and ISO 27001, HIPAA-aligned safeguards, and BAAs available for healthcare engagements.',
    images: ['/twitter-image'],
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/security',
  },
}

const frameworks = [
  {
    name: 'SOC 2',
    detail:
      'Our security program is designed and operated to align with the SOC 2 Trust Services Criteria for security, availability, and confidentiality. Formal SOC 2 Type II attestation is on our roadmap.',
  },
  {
    name: 'ISO/IEC 27001',
    detail:
      'Our information security management system is built around the ISO/IEC 27001 control set. Certification is on our roadmap.',
  },
  {
    name: 'HIPAA',
    detail:
      'We apply administrative, physical, and technical safeguards aligned to the HIPAA Security Rule and can execute Business Associate Agreements for healthcare engagements.',
  },
]

const controls = [
  {
    title: 'Access control',
    body: 'Least-privilege access with unique, named identities and multi-factor authentication for administrative access. Access is reviewed on a recurring basis and revoked promptly on role change.',
  },
  {
    title: 'Encryption',
    body: 'Customer traffic is encrypted in transit with modern TLS. Data at rest is protected with industry-standard encryption on the systems that store it.',
  },
  {
    title: 'Network protection',
    body: 'Internet-facing services sit behind a web application firewall with rate limiting, abuse controls, and network segmentation between environments.',
  },
  {
    title: 'Monitoring & logging',
    body: 'Security-relevant events are logged and monitored, with automated alerting on anomalies and a defined escalation path.',
  },
  {
    title: 'Secure development',
    body: 'Changes follow a documented lifecycle with a structured self-review checklist, automated static analysis, dependency scanning, and secret scanning before code ships.',
  },
  {
    title: 'Backup & recovery',
    body: 'Production data is backed up automatically, and backups are restore-tested on a schedule so recovery is proven, not assumed.',
  },
  {
    title: 'Incident response',
    body: 'A documented incident response process, including breach-notification procedures, with a post-incident review after every event.',
  },
  {
    title: 'Vendor management',
    body: 'We maintain a current subprocessor list, review vendors for adequate safeguards, and execute BAAs with any vendor that would handle protected health information.',
  },
]

export default function Security() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-black via-surface to-surface-card text-white py-20 sm:py-24 border-b border-surface-border">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-accent-400 font-semibold tracking-wide uppercase text-sm mb-3">
            Security &amp; Trust
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security is how we engineer, not an afterthought
          </h1>
          <p className="text-lg leading-8 text-gray-300 max-w-3xl">
            StephensCode builds and operates software and networking services for
            business customers. This page summarizes the controls we run and the
            standards our program is built around. We are glad to share detailed
            documentation with customers and prospects under NDA.
          </p>
        </div>
      </section>

      {/* Frameworks */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">
            Standards and frameworks
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {frameworks.map((f) => (
              <div
                key={f.name}
                className="border border-surface-border rounded-xl p-6 bg-surface-card hover:border-primary-500 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {f.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">
            We use one unified control set to satisfy all three, and maintain our
            policies and evidence as version-controlled records so they stay
            current with what we actually run.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-surface-card py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">What we do</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {controls.map((c) => (
              <div
                key={c.title}
                className="bg-surface border border-surface-border rounded-xl p-6 hover:border-primary-500 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data privacy + HIPAA */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Data privacy</h2>
            <p className="text-gray-400 leading-relaxed">
              We collect only the data needed to provide our services, classify it
              by sensitivity, retain it only as long as necessary, and dispose of
              it securely. We do not sell customer data.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              HIPAA &amp; healthcare
            </h2>
            <p className="text-gray-400 leading-relaxed">
              StephensCode does not require access to protected health information
              to deliver its standard services. Where an engagement involves PHI,
              we execute a Business Associate Agreement and apply HIPAA Security
              Rule safeguards to the systems in scope.
            </p>
          </div>
        </div>
      </section>

      {/* Request docs + disclosure */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:py-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Request our documentation</h2>
          <p className="text-gray-200 max-w-3xl mb-6">
            Security questionnaires, our controls summary, and framework mapping
            are available to customers and qualified prospects under NDA. We also
            welcome responsible-disclosure reports; please contact us before
            disclosing publicly so we can investigate and remediate.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:security@stephenscode.dev"
              className="inline-flex items-center rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 transition-colors"
            >
              security@stephenscode.dev
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3 transition-colors"
            >
              Contact us
            </Link>
          </div>
          <p className="text-gray-300 text-sm mt-8">
            Program status: SOC 2 and ISO 27001 readiness in progress; HIPAA-aligned
            safeguards operational; formal attestation and certification are on our
            roadmap.
          </p>
        </div>
      </section>
    </>
  )
}
