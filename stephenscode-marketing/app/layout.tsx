import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stephenscode.dev'),
  title: {
    default: 'StephensCode | Veteran-Owned Web Development | Conroe TX',
    template: '%s | StephensCode'
  },
  description: 'Veteran-owned web development serving Houston & Conroe. Custom websites, business dashboards, and automation. 14+ years experience. Transparent flat-rate pricing from $250.',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
