import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SITE_URL = 'https://clowk.dev';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: 'Clowk — Authentication broker for every stack',
  description:
    'Clowk brokers authentication between your app and OAuth providers. No embedded UI, no per-MAU billing. SDKs for React, Next.js, Express, Hono, and Rails.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Clowk — Broker, not provider. Auth that stays out of your UI.',
    description:
      'Most auth solutions own your sign-in UI. Clowk brokers the authentication through a redirect flow — no embedded forms, no iframes, no frontend lock-in. Free forever.',
    siteName: 'Clowk',
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Clowk — Authentication broker for every stack',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clowk — Authentication broker for every stack',
    description:
      'No embedded UI, no per-MAU billing. Clowk brokers OAuth and returns a signed JWT. SDKs for React, Next.js, Express, Hono, and Rails.',
    images: [OG_IMAGE],
  },
  appleWebApp: {
    capable: true,
    title: 'Clowk',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0014' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
