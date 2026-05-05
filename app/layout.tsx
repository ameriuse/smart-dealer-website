import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';

const SMART_DEALER_HOST = 'smartdealer.ameriuse.com';

export function generateMetadata(): Metadata {
  const host = headers().get('host')?.split(':')[0].toLowerCase();
  const isSmartDealer = host === SMART_DEALER_HOST;

  return {
    title: {
      default: isSmartDealer
        ? 'Smart Dealer by Ameriuse - Inspection-First Dealer OS'
        : 'Ameriuse - Vehicle Commerce and Intelligence',
      template: isSmartDealer ? '%s - Smart Dealer' : '%s - Ameriuse',
    },
    description: isSmartDealer
      ? 'Smart Dealer is Ameriuse pilot software for inspection-first dealer workflows, inventory, messaging, and vehicle handoff.'
      : 'Ameriuse builds vehicle commerce and intelligence tools for dealers, builders, and teams working with vehicle data.',
    robots: 'index, follow',
    icons: {
      icon: [
        {
          url: isSmartDealer ? '/dealer-favicon.svg?v=202605' : '/favicon.svg?v=202605',
          type: 'image/svg+xml',
        },
      ],
      apple: [
        {
          url: isSmartDealer ? '/dealer-apple-touch-icon.png?v=202605' : '/apple-touch-icon.png?v=202605',
        },
      ],
    },
    manifest: isSmartDealer ? '/dealer.webmanifest' : '/site.webmanifest',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#08111f] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
