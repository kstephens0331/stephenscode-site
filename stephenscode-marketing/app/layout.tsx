import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stephenscode.dev'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'StephensCode | Veteran-Owned Web Development | Conroe TX',
    template: '%s | StephensCode'
  },
  description: 'Veteran-owned web development serving Houston & Conroe. Custom websites, business dashboards & automation. 14+ years experience. Pricing starts at $250.',
  keywords: [
    'web developer Conroe TX',
    'custom website development Houston',
    'veteran-owned web design',
    'business automation Houston',
    'HVAC website design',
    'e-commerce development Texas',
    'custom dashboard development'
  ],
  authors: [{ name: 'Kyle Stephens', url: 'https://www.stephenscode.dev/about' }],
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
    url: 'https://www.stephenscode.dev',
    siteName: 'StephensCode',
    title: 'StephensCode | Veteran-Owned Web Development | Conroe TX',
    description: 'Custom websites, dashboards, and automation by a veteran-owned company serving Houston and Conroe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StephensCode | Veteran-Owned Web Development',
    description: 'Custom websites and business solutions serving Houston and Conroe.',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W7W7DR4VYJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W7W7DR4VYJ');
          `}
        </Script>

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
      </body>
    </html>
  )
}
