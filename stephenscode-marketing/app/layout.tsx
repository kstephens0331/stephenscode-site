import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import FloatingContactButton from '@/components/FloatingContactButton'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import TrustedTypesPolicy from '@/components/TrustedTypesPolicy'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://stephenscode.dev'),
  title: {
    default: 'Conroe Web Developer | Houston Web Development | StephensCode',
    template: '%s | StephensCode'
  },
  description: 'Veteran owned web developer in Conroe TX serving Houston. Custom websites from $250, small business websites, affordable web design. 14+ years experience. Call (936) 323-4527.',
  keywords: [
    // Primary location keywords
    'Conroe web developer',
    'Houston web development',
    'The Woodlands web developer',
    'Montgomery County web development',
    'Spring TX web developer',
    'Tomball web design',
    'Magnolia TX website developer',
    'Humble TX web developer',
    'Katy web development',
    'Sugar Land web design',
    'Cypress TX web developer',
    // Service keywords
    'custom website development',
    'small business website',
    'affordable web design',
    'e-commerce website development',
    'website redesign services',
    'responsive web design',
    'SEO web development',
    'business website builder',
    'professional website design',
    'mobile-friendly websites',
    // Specialty services
    'API integration services',
    'web scraping services',
    'business automation',
    'custom web applications',
    'WordPress alternative',
    // MSP/IT keywords
    'managed IT services Houston',
    'IT support Conroe',
    'cybersecurity services Texas',
    'MSP Houston',
    'business IT solutions',
    'cloud services Houston',
    'network security Texas',
    // Business identity keywords
    'veteran owned web developer',
    'veteran owned business Texas',
    'flat rate web design',
    'web developer near me',
    'Texas web development company',
    'Houston area IT services',
  ],
  authors: [{ name: 'Kyle Stephens', url: 'https://stephenscode.dev/about' }],
  creator: 'StephensCode LLC',
  publisher: 'StephensCode LLC',
  icons: {
    icon: '/images/favicon-512.png',
    shortcut: '/images/favicon-512.png',
    apple: '/images/favicon-512.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stephenscode.dev',
    siteName: 'StephensCode',
    title: 'Conroe Web Developer | Houston Web Development | Veteran Owned',
    description: 'Affordable web design Houston from $250. Custom websites for small business. Veteran owned web developer serving The Woodlands and Montgomery County.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conroe Web Developer | Affordable Web Design Houston',
    description: 'Veteran owned web developer. Small business websites from $250. Serving Houston and The Woodlands.',
    creator: '@stephenscode',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console verified via DNS TXT record
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <TrustedTypesPolicy />
        <LocalBusinessSchema />
        {/* Ahrefs Analytics */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="FWknMXQC00ZmslHU5xYYhQ" async></script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />

        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingContactButton />
      </body>
    </html>
  )
}
