import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern website packages, managed IT (MSP) subscriptions, payment, refunds, ownership of delivered work, and use of the StephensCode customer portal.',
  keywords: [
    'StephensCode terms of service',
    'web development contract terms',
    'managed IT service agreement',
    'refund policy',
    'website ownership terms',
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Terms of Service',
    description:
      'The terms that govern website packages, managed IT (MSP) subscriptions, payment, refunds, ownership of delivered work, and use of the StephensCode customer portal.',
    url: 'https://www.stephenscode.dev/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    description:
      'The terms that govern website packages, managed IT (MSP) subscriptions, payment, refunds, ownership of delivered work, and use of the StephensCode customer portal.',
    images: ['/twitter-image'],
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/terms',
  },
}

const EFFECTIVE_DATE = 'August 1, 2026'

const toc = [
  { id: 'introduction', label: '1. Agreement to Terms' },
  { id: 'definitions', label: '2. Definitions & Scope of Services' },
  { id: 'website-packages', label: '3. Website & Platform Packages' },
  { id: 'msp-services', label: '4. Managed IT (MSP) Services' },
  { id: 'custom-quotes', label: '5. Custom Quotes & Statements of Work' },
  { id: 'payment', label: '6. Payment Terms & Billing' },
  { id: 'refunds', label: '7. Refunds & Cancellation' },
  { id: 'timeline', label: '8. Timeline, Revisions & Your Responsibilities' },
  { id: 'ownership', label: '9. Ownership of Deliverables' },
  { id: 'domains-hosting', label: '10. Domains, Hosting & Third-Party Accounts' },
  { id: 'customer-portal', label: '11. Customer Portal & Acceptable Use' },
  { id: 'warranty', label: '12. Warranty Disclaimer' },
  { id: 'liability', label: '13. Limitation of Liability' },
  { id: 'indemnification', label: '14. Indemnification' },
  { id: 'confidentiality', label: '15. Confidentiality' },
  { id: 'testimonials', label: '16. Testimonials & Case Studies' },
  { id: 'termination', label: '17. Termination' },
  { id: 'governing-law', label: '18. Governing Law & Disputes' },
  { id: 'changes', label: '19. Changes to These Terms' },
  { id: 'general', label: '20. General Provisions' },
  { id: 'contact', label: '21. Contact Us' },
]

function Section({
  id,
  num,
  title,
  tone = 'white',
  children,
}: {
  id: string
  num: string
  title: string
  tone?: 'white' | 'muted'
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          <span className="text-primary-600">{num}.</span> {title}
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">{children}</div>
      </div>
    </section>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-slate-900 pt-2">{children}</h3>
}

export default function Terms() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-primary-400 font-semibold tracking-wide uppercase text-sm mb-3">
            Terms of Service
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The terms behind every project</h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            These Terms of Service govern your purchase and use of website packages, managed IT
            (MSP) subscriptions, and other services from StephensCode LLC, including payment,
            refunds, ownership of what we build for you, and use of our customer portal. Please
            read them before purchasing a service or signing up for the customer portal.
          </p>
          <p className="text-slate-400 text-sm mt-6">
            Effective date: {EFFECTIVE_DATE} &middot; Last updated: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
            Contents
          </h2>
          <nav aria-label="Table of contents">
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-primary-600 hover:text-primary-700 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <Section id="introduction" num="1" title="Agreement to Terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a binding agreement between you
          (&ldquo;you,&rdquo; &ldquo;Client,&rdquo; or &ldquo;Customer&rdquo;) and StephensCode
          LLC (&ldquo;StephensCode,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), a veteran-owned, Texas-based web development and managed IT
          company. By purchasing a website package, subscribing to a managed IT plan, requesting
          a custom quote, creating an account at customer.stephenscode.dev, or otherwise engaging
          us for services, you agree to be bound by these Terms.
        </p>
        <p>
          If you are entering into these Terms on behalf of a company or other legal entity, you
          represent that you have the authority to bind that entity, in which case
          &ldquo;you&rdquo; refers to that entity.
        </p>
        <p>
          By using our Services, you represent that you are at least 18 years old and have the
          legal capacity to enter into a binding contract, whether on your own behalf or on behalf
          of an entity you represent. You consent to receive notices, invoices, proposals, and
          agreements from us electronically, by email or through the Customer Portal, and agree
          that your electronic acceptance of these Terms or of a quote or proposal &mdash;
          including by clicking to accept, replying by email, or submitting a deposit payment
          &mdash; has the same legal effect as a handwritten signature.
        </p>
        <p>
          These Terms work alongside our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          , which explains how we collect and use Personal Information, and, where applicable, a
          signed proposal, invoice, or statement of work for your specific project. If a signed
          proposal or statement of work conflicts with these Terms on a particular point, the
          signed document controls for that project.
        </p>
      </Section>

      <Section id="definitions" num="2" title="Definitions & Scope of Services" tone="muted">
        <p>
          <strong>&ldquo;Services&rdquo;</strong> means any website package, add-on, premium
          build, managed IT (MSP) plan, cybersecurity service, cloud service, hourly support
          engagement, or custom development, automation, or integration work that StephensCode
          provides to you, as described on stephenscode.dev or in a proposal we send you.
        </p>
        <p>
          <strong>&ldquo;Deliverables&rdquo;</strong> means the website, application, admin
          portal, dashboard, integration, script, document, or other work product we create for
          you under a specific engagement.
        </p>
        <p>
          <strong>&ldquo;Customer Portal&rdquo;</strong> means the account-based web application
          at customer.stephenscode.dev through which customers can view orders and invoices,
          submit update and module requests, request plan upgrades, and manage account settings.
        </p>
        <p>
          Current service descriptions and flat-rate pricing for website packages appear on our{' '}
          <Link href="/pricing" className="text-primary-600 hover:underline">
            Pricing
          </Link>{' '}
          and{' '}
          <Link href="/services" className="text-primary-600 hover:underline">
            Services
          </Link>{' '}
          pages; managed IT plan pricing appears on our{' '}
          <Link href="/msp" className="text-primary-600 hover:underline">
            Managed IT Services
          </Link>{' '}
          page. Those pages are incorporated into these Terms by reference for whichever
          Service(s) you purchase, and are the authoritative statement of current pricing and
          what each tier includes as of your order date.
        </p>
      </Section>

      <Section id="website-packages" num="3" title="Website & Platform Packages">
        <p>
          We offer several flat-rate website and platform tiers, each with its own included
          features, page counts, and typical timeline, as detailed on the relevant service page.
          As of the effective date of these Terms, representative tiers include:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Core packages ranging from Plug and Play ($250) and Website Rebuild ($350) to Standard Website ($950) and E-Commerce Website ($1,100);</li>
          <li>Premium builds ranging from the Premium Build ($2,000) and Custom Business Platform ($5,000) to the Enterprise Platform ($7,500); and</li>
          <li>Enterprise Custom projects (mobile apps, 40+ pages, complex integrations), which are quoted individually rather than flat-rated.</li>
        </ul>
        <p>
          Flat-rate pricing is based on the scope, page count, and features described for that
          tier on the relevant service page at the time you order. Work that falls outside that
          published scope &mdash; additional pages, custom functionality not listed, third-party
          accounts or subscriptions you choose to add, or a rush timeline (see Section 8) &mdash;
          is billed separately, either at a quoted flat amount or, where noted, at our standard
          hourly rate for revisions and change requests.
        </p>
      </Section>

      <Section id="msp-services" num="4" title="Managed IT (MSP) Services" tone="muted">
        <p>
          Our managed IT plans (Essential IT, Business Pro, Complete IT, and related
          cybersecurity, cloud, and Microsoft 365 add-ons) are subscription services billed
          monthly, per user or per service as described on the relevant plan page, through our
          Stripe-based billing system. Managed IT plans are month-to-month with no long-term
          contract: you may cancel future billing at any time as described in Section 7.
        </p>
        <p>
          Certain IT services &mdash; including Break/Fix Support, IT Consulting, Network
          Installation, Security Assessments, Compliance Services, and Cloud Migration &mdash;
          are billed hourly or as a one-time flat fee rather than a recurring subscription, as
          described on the relevant service page. Onboarding for a new managed IT client may
          include a network or security assessment before your recurring plan begins.
        </p>
        <p>
          No cybersecurity service, product, or configuration can guarantee prevention of every
          cyberattack, data breach, or system failure, and we make no such guarantee. We will
          implement the security measures described in your plan or statement of work using
          reasonable care and industry-standard practices. Except in the case of our gross
          negligence or willful misconduct, we are not liable for losses arising from a security
          incident, breach, or attack that occurs despite those agreed-upon measures having been
          properly implemented and maintained, including where the incident results from your own
          action or inaction (such as ignoring a patching or password-hygiene recommendation), a
          zero-day vulnerability, or a failure of a third-party vendor&apos;s product or service.
        </p>
      </Section>

      <Section id="custom-quotes" num="5" title="Custom Quotes & Statements of Work">
        <p>
          Services such as API integration, web scraping, business automation, Enterprise Custom
          builds, security assessments, compliance services, and cloud migrations are priced
          individually based on your specific requirements rather than a published flat rate. For
          these engagements, we will provide a written quote or proposal describing the scope,
          price, payment schedule, and estimated timeline. That quote, once you accept it (in
          writing, by email, or by paying the deposit invoice), becomes part of your agreement
          with us alongside these Terms.
        </p>
      </Section>

      <Section id="payment" num="6" title="Payment Terms & Billing" tone="muted">
        <H3>6.1 How you pay</H3>
        <p>
          All online payments are processed through Stripe, a PCI-DSS Level 1 certified payment
          processor. StephensCode never receives, transmits, or stores your full card number,
          CVC, or expiration date &mdash; see our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          for details. We also accept payment by bank transfer or, for in-person arrangements,
          cash, for clients who prefer not to pay by card.
        </p>
        <H3>6.2 Website and platform projects</H3>
        <p>
          Unless a signed proposal states otherwise, website and platform projects are billed in
          two installments: 50% of the project price to begin work, and the remaining 50% upon
          completion, due before the site or platform is launched or final files are delivered.
          For projects over $3,000, we may agree to milestone-based payments instead, as set out
          in your proposal.
        </p>
        <H3>6.3 Managed IT (MSP) subscriptions</H3>
        <p>
          Managed IT plans are billed automatically through Stripe on a recurring monthly basis,
          in advance, for the billing period about to begin. If a payment fails, Stripe will
          retry it automatically; if payment cannot be collected after reasonable retries, we may
          suspend the affected services until payment is made current.
        </p>
        <H3>6.4 Hourly and one-time services</H3>
        <p>
          Hourly services (such as Break/Fix Support, IT Consulting, or revisions beyond what a
          package includes) are billed at the hourly rate quoted for that service at the time of
          the engagement, invoiced on a schedule we agree with you (typically upon completion of
          the work or monthly for ongoing hourly engagements). One-time services (such as Network
          Installation or Cloud Migration) are billed as described in your quote.
        </p>
        <H3>6.5 Late payment</H3>
        <p>
          Invoices not paid within the terms stated on the invoice may result in a pause of
          in-progress work, a delay in delivery or launch, or suspension of active managed IT or
          hosting-related services, until payment is brought current. We will make reasonable
          efforts to contact you before pausing or suspending a service for non-payment. Overdue
          balances accrue a late charge of 1.5% per month (18% per year), or the maximum rate
          permitted by Texas law if lower, from the due date until paid in full, in addition to
          any pause or suspension described above.
        </p>
      </Section>

      <Section id="refunds" num="7" title="Refunds & Cancellation">
        <H3>7.1 Website and platform projects</H3>
        <p>
          Because work begins as soon as your deposit is received &mdash; including design time,
          planning, and development &mdash; deposits are generally non-refundable once work has
          started. If you cancel a project before we have begun any work on it, we will refund
          your deposit in full. If you cancel after work has begun but before completion, we will
          invoice you for the value of work completed to date (at our standard hourly rate where
          no milestone amount applies) and refund any remaining deposit balance.
        </p>
        <H3>7.2 Managed IT (MSP) subscriptions</H3>
        <p>
          Managed IT plans are month-to-month with no long-term contract. You may cancel future
          billing at any time by notifying us or through your customer portal account settings.
          Cancellation stops future charges but does not refund the current billing period already
          paid for, except where required by law. Charges already processed for the current period
          are non-refundable.
        </p>
        <H3>7.3 Hourly and one-time services</H3>
        <p>
          Hourly work already performed is billable and non-refundable. For one-time flat-fee
          services (such as Cloud Migration or Network Installation) cancelled before work begins,
          we will refund any deposit paid; once work has begun, Section 7.1&apos;s
          work-completed-to-date approach applies.
        </p>
        <H3>7.4 Our right to cancel</H3>
        <p>
          We may decline or discontinue a project or subscription at our discretion &mdash; for
          example, for non-payment, abusive conduct, or a request to build something unlawful or
          that violates Section 11&apos;s acceptable use terms. In that case, we will refund any
          amount paid for work not yet performed.
        </p>
        <p>
          Refunds are issued to the original payment method through Stripe and may take several
          business days to appear on your statement.
        </p>
      </Section>

      <Section id="timeline" num="8" title="Timeline, Revisions & Your Responsibilities" tone="muted">
        <H3>8.1 Timeline</H3>
        <p>
          Estimated timelines are published on each service page (for example, several weeks for
          a Premium Build) and depend on you providing requested content, feedback, and approvals
          promptly. Delays on your end &mdash; missing content, slow feedback, or scope changes
          &mdash; will extend the timeline accordingly and are not a breach of these Terms by us.
          Rush delivery, where available, is billed at an additional 25% of the project price.
        </p>
        <H3>8.2 Revisions</H3>
        <p>
          The number of included revision rounds varies by package and is described on the
          relevant service page (generally two rounds for Core packages; some Premium tiers
          include unlimited revisions during the development phase). Revision requests beyond
          what your package includes, or requested after a package&apos;s revision window has
          closed, are billed at our standard hourly rate ($50/hour unless otherwise quoted).
        </p>
        <H3>8.3 Your responsibilities</H3>
        <p>
          You are responsible for providing accurate business information, timely content
          (text, images, and any specific copy you want used), and timely feedback and approvals.
          You are responsible for ensuring that any content, trademarks, or materials you provide
          to us for use in your Deliverables do not infringe a third party&apos;s rights, and you
          agree to indemnify us as described in Section 14 for claims arising from content you
          supply.
        </p>
      </Section>

      <Section id="ownership" num="9" title="Ownership of Deliverables">
        <p>
          Once a project is completed and paid in full, you own 100% of the resulting website,
          platform, content, and custom code we wrote for you, free of any further license fee to
          us. We will provide you with access to the relevant code repository, hosting account,
          and domain (which you register and own directly, as described in Section 10), and you
          are free to maintain the Deliverables yourself or engage any other developer in the
          future.
        </p>
        <p>
          Before a project is paid in full, Deliverables and any in-progress work remain our
          property. We retain ownership of our own pre-existing tools, frameworks, boilerplate,
          and general-purpose code libraries that are not unique to your project, and we may
          reuse that general-purpose code and our accumulated know-how in work we perform for
          other clients. We do not reuse content, branding, or business-specific logic created
          specifically for you in another client&apos;s project.
        </p>
        <p>
          Managed IT services do not involve a transfer of ownership of any software, hardware, or
          licenses that remain owned by their respective vendors (such as Microsoft, antivirus
          vendors, or backup providers); those are licensed to you directly or through us as your
          reseller/administrator, subject to the applicable vendor&apos;s own terms.
        </p>
      </Section>

      <Section id="domains-hosting" num="10" title="Domains, Hosting & Third-Party Accounts" tone="muted">
        <p>
          Unless you already have a domain and hosting account, we will help you register a
          domain and set up hosting (typically through Vercel or a similar modern host) in your
          own name and under your own account. You own the domain and the hosting account; we
          simply help configure them. Domain registration and hosting fees (typically around
          $120/year, billed by the registrar/host, not by us) are separate from our project fees
          unless your proposal states otherwise.
        </p>
        <p>
          If a project uses other third-party accounts or services on your behalf &mdash; email
          providers, payment processors, analytics tools, or similar &mdash; those accounts and
          any associated fees are yours, and use of those services is governed by that
          provider&apos;s own terms.
        </p>
      </Section>

      <Section id="customer-portal" num="11" title="Customer Portal & Acceptable Use">
        <p>
          If you create an account at customer.stephenscode.dev, you agree to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>provide accurate account information and keep your login credentials confidential;</li>
          <li>notify us promptly if you believe your account has been compromised;</li>
          <li>use the portal, including update requests, module requests, plan upgrades, and feedback tools, only for legitimate business purposes related to your own account and services;</li>
          <li>not attempt to access another customer&apos;s account, data, or orders, or to probe, scan, or test the portal&apos;s security without our written permission;</li>
          <li>not upload malicious files, or content that is unlawful, infringing, or that you do not have the right to share; and</li>
          <li>not use the portal to interfere with, disrupt, or place an unreasonable load on our systems.</li>
        </ul>
        <p>
          We may suspend or terminate a customer portal account for violation of these terms, for
          suspected fraud or security abuse, or for non-payment as described in Section 6.5. Plan
          upgrades initiated in the portal are processed through Stripe as described in Section
          10 of our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          ; the portal itself does not store your card details.
        </p>
      </Section>

      <Section id="warranty" num="12" title="Warranty Disclaimer" tone="muted">
        <p>
          Website and platform packages include 90 days of post-launch support, during which we
          will fix bugs and defects in the code we delivered at no additional charge. After that
          90-day period, we will generally still fix bugs in code we wrote at no charge as a
          courtesy, but we are not obligated to, and requests for new features, design changes, or
          major modifications are quoted and billed separately at any time, including during the
          90-day period.
        </p>
        <p>
          <strong>
            Except for the express 90-day support commitment described above, the Services and
            Deliverables are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
            warranties of any kind, whether express, implied, or statutory, including implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </strong>{' '}
          We do not warrant that the Deliverables will be uninterrupted, error-free, or fully
          secure, that they will meet every requirement you did not disclose to us in advance, or
          that any third-party service we integrate with (hosting, payment processors, domain
          registrars, Microsoft 365, backup providers, and similar) will perform without
          interruption, as those services are outside our control and governed by their own
          terms.
        </p>
        <p>
          <strong>No guaranteed results.</strong> For any Service that includes search engine
          optimization, local SEO, Google Business Profile guidance, content strategy, or
          advertising management, we do not guarantee specific search rankings, impressions,
          traffic levels, lead volume, conversion rates, or revenue outcomes. Search engines,
          social platforms, and advertising networks are operated by third parties whose
          algorithms, policies, and competitive landscape are outside our control and change
          without notice, and results also depend on factors specific to your business and market
          that we do not control.
        </p>
      </Section>

      <Section id="liability" num="13" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, StephensCode LLC and its owner,
          contractors, and personnel will not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits, revenue, data, or business
          opportunity, arising out of or related to the Services or Deliverables, even if we have
          been advised of the possibility of such damages.
        </p>
        <p>
          To the maximum extent permitted by applicable law, our total aggregate liability
          arising out of or relating to a given engagement will not exceed the total amount you
          actually paid us for that specific project or, for subscription services, the fees you
          paid us for that service in the three (3) months preceding the event giving rise to the
          claim.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of certain damages, so some
          of the limitations in this Section may not apply to you. In that case, our liability
          will be limited to the greatest extent permitted by applicable law.
        </p>
      </Section>

      <Section id="indemnification" num="14" title="Indemnification" tone="muted">
        <p>
          You agree to indemnify, defend, and hold harmless StephensCode LLC, its owner, and its
          contractors from any claim, demand, loss, or expense (including reasonable attorneys&apos;
          fees) arising out of: (a) content, trademarks, or materials you provided to us for use
          in your Deliverables; (b) your use of the Services or Deliverables in violation of
          these Terms or applicable law; or (c) your breach of any representation you made to us
          regarding your rights to content or materials you supplied.
        </p>
      </Section>

      <Section id="confidentiality" num="15" title="Confidentiality">
        <p>
          Each party may share non-public business, technical, or project information with the
          other in the course of the engagement. Each party agrees to use the other&apos;s
          confidential information only to perform under, or receive the benefit of, the
          engagement, and not to disclose it to third parties except as needed to perform the
          Services (for example, sharing project details with subprocessors listed in our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          ), as required by law, or with the disclosing party&apos;s consent. This does not apply
          to information that is or becomes public through no fault of the receiving party, or
          that the receiving party already lawfully knew or independently develops.
        </p>
      </Section>

      <Section id="testimonials" num="16" title="Testimonials & Case Studies">
        <p>
          We may ask for your feedback, a testimonial, or permission to feature your project as a
          case study (including your business name, logo, a description of the work, and, where
          applicable, publicly-visible results) on our website or in other marketing materials. We
          will only do so with your consent, and you may withdraw that consent for future use at
          any time by contacting us using the information in Section 21; withdrawal does not
          require us to remove materials already distributed before your request where that is not
          reasonably practical (for example, printed materials), but we will remove or update our
          own website within a reasonable time.
        </p>
      </Section>

      <Section id="termination" num="17" title="Termination" tone="muted">
        <p>
          Either party may terminate an ongoing engagement as described in Section 7 (Refunds &amp;
          Cancellation). We may also suspend or terminate your access to the Customer Portal or
          any active Service immediately, without prior notice, for non-payment, suspected fraud,
          security risk, or violation of Section 11&apos;s acceptable use terms. Sections 9
          (Ownership), 12 through 16 (Warranty Disclaimer, Limitation of Liability,
          Indemnification, Confidentiality, and Testimonials &amp; Case Studies), and 18 (Governing
          Law) survive termination of any engagement.
        </p>
      </Section>

      <Section id="governing-law" num="18" title="Governing Law & Dispute Resolution">
        <p>
          These Terms, and any dispute arising from them, from the Services, or from the
          Deliverables, are governed by the laws of the State of Texas, without regard to its
          conflict-of-laws principles. You agree that any legal action or proceeding relating to
          these Terms will be brought exclusively in the state or federal courts located in
          Montgomery County, Texas, and you consent to personal jurisdiction there.
        </p>
        <p>
          To the extent permitted by applicable law, you and StephensCode each waive any right to
          a jury trial, and to bring or participate in a class, collective, or representative
          action against the other, arising out of or relating to these Terms, the Services, or
          the Deliverables. Each of us may only bring claims in an individual capacity.
        </p>
        <p>
          Before filing a formal legal claim, we encourage you to contact us using the information
          in Section 21 so we can try to resolve the issue directly &mdash; we are a small,
          local company and would rather fix a problem than litigate it.
        </p>
      </Section>

      <Section id="changes" num="19" title="Changes to These Terms" tone="muted">
        <p>
          We may update these Terms from time to time to reflect changes in our Services, pricing
          structure, or legal requirements. We will update the &ldquo;Last updated&rdquo; date at
          the top of this page when we do. For material changes, we will provide additional
          notice, such as an email to customer portal account holders or a notice on our website,
          before the change takes effect. Changes do not apply retroactively to a project or
          subscription term that was already fully paid or in progress under a signed proposal,
          unless we agree otherwise in writing. Your continued use of the Services after a change
          takes effect constitutes acceptance of the updated Terms.
        </p>
      </Section>

      <Section id="general" num="20" title="General Provisions">
        <p>
          <strong>Entire agreement.</strong> These Terms, together with our Privacy Policy and
          any signed proposal, invoice, or statement of work for your engagement, are the entire
          agreement between you and StephensCode regarding the Services and supersede any prior
          discussions or agreements on the same subject.
        </p>
        <p>
          <strong>Severability.</strong> If any provision of these Terms is found unenforceable,
          the remaining provisions remain in full force and effect.
        </p>
        <p>
          <strong>No waiver.</strong> Our failure to enforce any provision of these Terms is not a
          waiver of our right to do so later.
        </p>
        <p>
          <strong>Assignment.</strong> You may not assign or transfer your rights under these
          Terms without our written consent. We may assign these Terms in connection with a
          merger, acquisition, or sale of assets, as described in our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          <strong>Force majeure.</strong> Neither party is liable for a delay or failure to
          perform caused by events beyond its reasonable control, including natural disasters,
          power or internet outages, or third-party service outages (such as our hosting, payment,
          or infrastructure providers).
        </p>
        <p>
          <strong>Independent contractor.</strong> StephensCode provides Services as an
          independent contractor. Nothing in these Terms creates a partnership, joint venture,
          employment, or agency relationship between you and StephensCode.
        </p>
        <p>
          <strong>Attorneys&apos; fees.</strong> In any action or proceeding to enforce these
          Terms, the prevailing party is entitled to recover its reasonable attorneys&apos; fees
          and costs, in addition to any other relief awarded.
        </p>
      </Section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24 py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-primary-400">21.</span> Contact Us
          </h2>
          <p className="text-slate-300 max-w-3xl mb-6">
            Questions about these Terms, your project, or an invoice can go straight to our team.
            We&apos;re a small company &mdash; a real person reads and answers this inbox.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="mailto:info@stephenscode.dev"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              info@stephenscode.dev
            </a>
            <Link
              href="/contact"
              className="inline-block border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contact us
            </Link>
          </div>
          <div className="text-slate-400 text-sm space-y-1">
            <p>StephensCode LLC</p>
            <p>303 Longmire Unit 1001 Ste 102, Conroe, TX 77304</p>
            <p>(936) 323-4527</p>
          </div>
        </div>
      </section>
    </main>
  )
}
