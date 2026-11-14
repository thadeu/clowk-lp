import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SITE_URL = 'https://clowk.in';
const OG_IMAGE = `${SITE_URL}/og-image.png?v=2`;

const TITLE = 'Clowk — Small tools you run on your own servers';
const DESCRIPTION =
  'Clowk makes self-hosted tools: auth for sign-in, ndb for search on NDJSON, voodu for deploys, anway for background jobs, cronota for NFS-e and 1billion for email.';

export const metadata: Metadata = {
  title: { default: TITLE, template: '%s · Clowk' },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Clowk',
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Clowk — Small tools you run on your own servers',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Clowk',
    statusBarStyle: 'black-translucent',
    startupImage: ['/icons/icon-512.png?v=2'],
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
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#0C0014]">{children}</body>
    </html>
  );
}
