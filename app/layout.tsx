import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import StructuredData from '@/components/StructuredData';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tushar Kumar',
  description: 'Portfolio of Tushar Kumar - Python Backend Engineer specializing in AI, Machine Learning, and Full-Stack Development. Experienced in building scalable applications with Azure, OpenAI, Django, and Next.js.',
  keywords: [
    'Tushar Kumar',
    'Python Developer',
    'Backend Engineer',
    'AI Engineer',
    'Machine Learning',
    'Azure',
    'OpenAI',
    'Django',
    'Next.js',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Tushar Kumar' }],
  creator: 'Tushar Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    siteName: 'Tushar Kumar Portfolio',
    title: 'Tushar Kumar | Python Backend Engineer & AI/ML Enthusiast',
    description: 'Portfolio showcasing projects in AI, Machine Learning, and Full-Stack Development',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tushar Kumar Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Kumar | Python Backend Engineer',
    description: 'Portfolio showcasing projects in AI, Machine Learning, and Full-Stack Development',
    creator: '@the_name_Tushar',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yourportfolio.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for faster lookups */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/profile.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body suppressHydrationWarning>
        <StructuredData />
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
