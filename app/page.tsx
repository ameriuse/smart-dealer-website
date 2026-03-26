import type { Metadata } from 'next';
import HomeContent from './_components/home-content';

export const metadata: Metadata = {
  title: 'Ameriuse — The Inspection-First Dealer OS',
  description:
    'Stop juggling 6 different tools. Ameriuse unifies CRM, inventory, website, messaging, inspections, GPS, and OBD diagnostics into one platform built for independent auto dealers.',
  openGraph: {
    title: 'Ameriuse — The Inspection-First Dealer OS',
    description:
      'One platform replaces your CRM, DMS, website builder, messaging tool, inspection app, and GPS tracker. Built for independent and BHPH dealers.',
    url: 'https://ameriuse.com',
    siteName: 'Ameriuse',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
