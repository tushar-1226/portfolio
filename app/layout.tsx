import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import StructuredData from '@/components/StructuredData';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export { metadata } from './metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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

        <link rel="icon" href="/favicon.ico" sizes="any" />


        <StructuredData />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
