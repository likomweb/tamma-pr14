import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3014';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Editorial serif for premium headlines
const fraunces = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const viewport = {
  themeColor: '#f8f7f3',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'SARL TAMMA EPC SOLUTIONS | Energy • Oil & Gas Algeria',
  description: 'Leader en ingénierie EPC, conception et réalisation de grands projets d\'infrastructures d\'énergie, pétrole et gaz en Algérie. Catégorie VII, ISO 9001, 14001, 45001.',
  keywords: [
    'SARL TAMMA',
    'TAMMA EPC',
    'Oil and Gas Algeria',
    'Énergie Algérie',
    'Sonatrach',
    'Sonelgaz',
    'Poste haute tension',
    'Hassi Messaoud',
    'Génie civil pétrolier'
  ],
  authors: [{ name: 'SARL TAMMA SERVICES' }],
  creator: 'SARL TAMMA SERVICES',
  publisher: 'SARL TAMMA SERVICES',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    title: 'SARL TAMMA EPC SOLUTIONS | Energy • Oil & Gas Algeria',
    description: 'Catégorie VII — Étude, conception et réalisation de grands projets d\'infrastructures d\'énergie, pétrole et gaz en Algérie.',
    siteName: 'SARL TAMMA SERVICES',
    url: siteUrl,
    images: [{
      url: '/images/context/hero.webp',
      width: 1200,
      height: 630,
      alt: 'SARL TAMMA EPC Solutions — Energy and infrastructure projects in Algeria',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARL TAMMA EPC SOLUTIONS | Energy • Oil & Gas Algeria',
    description: 'Étude, conception et réalisation de projets EPC d’énergie, pétrole et gaz en Algérie.',
    images: ['/images/context/hero.webp'],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-DZ': `${siteUrl}/?lang=fr`,
      'en-DZ': `${siteUrl}/?lang=en`,
      'ar-DZ': `${siteUrl}/?lang=ar`,
      'x-default': `${siteUrl}/?lang=fr`,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'application-name': 'SARL TAMMA EPC',
    'apple-mobile-web-app-title': 'SARL TAMMA',
    'geo.region': 'DZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-[var(--color-paper)] text-[var(--color-charcoal)] font-body antialiased selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)] scroll-snap-type-y-proximity">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
