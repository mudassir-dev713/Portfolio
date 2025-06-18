import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import PerformanceMonitor from './components/PerformanceMonitor';
import PreloadManager from './components/PreloadManager';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Mudassir - Full Stack Web Developer | React, Next.js, Node.js',
  description:
    'Self-taught web developer specializing in React, Next.js, and modern web technologies. Building fast, accessible, and visually appealing web applications.',
  keywords: [
    'web developer',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'full stack developer',
    'frontend developer',
  ],
  authors: [{ name: 'Mudassir' }],
  creator: 'Mudassir',
  publisher: 'Mudassir',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Mudassir - Full Stack Web Developer',
    description:
      'Self-taught web developer specializing in React, Next.js, and modern web technologies.',
    siteName: 'Mudassir Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mudassir - Full Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mudassir - Full Stack Web Developer',
    description:
      'Self-taught web developer specializing in React, Next.js, and modern web technologies.',
    images: ['/og-image.png'],
    creator: '@Mudassir82794462',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mudassir',
              jobTitle: 'Full Stack Web Developer',
              description:
                'Self-taught web developer specializing in React, Next.js, and modern web technologies',
              url: 'https://your-domain.com',
              sameAs: [
                'https://github.com/yourusername',
                'https://linkedin.com/in/yourusername',
              ],
              knowsAbout: [
                'React',
                'Next.js',
                'JavaScript',
                'TypeScript',
                'Node.js',
                'Web Development',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
            }),
          }}
        />
      </head>
      <body className="dark:bg-black-100 bg-white overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PerformanceMonitor />
          <PreloadManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
