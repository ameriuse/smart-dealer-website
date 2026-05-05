import type { Metadata } from 'next';
import { headers } from 'next/headers';

import AmeriuseHub from './_components/ameriuse-hub';
import HomeContent from './_components/home-content';

const SMART_DEALER_HOST = 'smartdealer.ameriuse.com';

function isSmartDealerHost(host: string | null) {
  return host?.split(':')[0].toLowerCase() === SMART_DEALER_HOST;
}

export function generateMetadata(): Metadata {
  const host = headers().get('host');

  if (isSmartDealerHost(host)) {
    return {
      metadataBase: new URL('https://smartdealer.ameriuse.com'),
      title: 'Smart Dealer by Ameriuse - Inspection-First Dealer OS',
      description:
        'Smart Dealer is Ameriuse pilot software for inspection-first dealer workflows, inventory, messaging, and vehicle handoff.',
      alternates: {
        canonical: 'https://smartdealer.ameriuse.com',
      },
      icons: {
        icon: [{ url: '/dealer-favicon.svg?v=202605', type: 'image/svg+xml' }],
        apple: [{ url: '/dealer-apple-touch-icon.png?v=202605' }],
      },
      manifest: '/dealer.webmanifest',
      openGraph: {
        title: 'Smart Dealer by Ameriuse',
        description:
          'Inspection-first dealer workflows for inventory, messaging, recon, and vehicle handoff.',
        url: 'https://smartdealer.ameriuse.com',
        siteName: 'Smart Dealer by Ameriuse',
        images: [{ url: new URL('https://smartdealer.ameriuse.com/og-smartdealer.svg?v=202605'), width: 1200, height: 630 }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Smart Dealer by Ameriuse',
        description:
          'Inspection-first dealer workflows for inventory, messaging, recon, and vehicle handoff.',
        images: [new URL('https://smartdealer.ameriuse.com/og-smartdealer.svg?v=202605')],
      },
    };
  }

  return {
    metadataBase: new URL('https://ameriuse.com'),
    title: 'Ameriuse - Vehicle Commerce and Intelligence',
    description:
      'Ameriuse is the parent company for Smart Dealer and SmartCAN Pro, building vehicle commerce and intelligence tools.',
    alternates: {
      canonical: 'https://ameriuse.com',
    },
    icons: {
      icon: [{ url: '/favicon.svg?v=202605', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-touch-icon.png?v=202605' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: 'Ameriuse - Vehicle Commerce and Intelligence',
      description:
        'Parent company for Smart Dealer and SmartCAN Pro: tools for dealer workflows and vehicle data intelligence.',
      url: 'https://ameriuse.com',
      siteName: 'Ameriuse',
      images: [{ url: new URL('https://ameriuse.com/og-ameriuse.svg?v=202605'), width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ameriuse - Vehicle Commerce and Intelligence',
      description:
        'Parent company for Smart Dealer and SmartCAN Pro: tools for dealer workflows and vehicle data intelligence.',
      images: [new URL('https://ameriuse.com/og-ameriuse.svg?v=202605')],
    },
  };
}

export default function HomePage() {
  const host = headers().get('host');
  return isSmartDealerHost(host) ? <HomeContent /> : <AmeriuseHub />;
}
