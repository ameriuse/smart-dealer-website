'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BrandLockup from './brand-lockup';

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════ */

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          observer.disconnect();
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════════ */

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

function IconMessageSquare() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconClipboardCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 10 10-12h-9l1-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const toolsReplaced = [
  { tool: 'CRM', replaces: 'DealerSocket, Elead', icon: <IconUsers /> },
  { tool: 'DMS', replaces: 'Frazer, DealerCenter', icon: <IconDatabase /> },
  { tool: 'Website', replaces: 'Dealer.com, DealerFire', icon: <IconGlobe /> },
  { tool: 'Messaging', replaces: 'Podium, Kenect', icon: <IconMessageSquare /> },
  { tool: 'Inspection', replaces: 'AutoGrade, paper forms', icon: <IconClipboardCheck /> },
  { tool: 'GPS', replaces: 'Spireon, LoJack, Ituran', icon: <IconMapPin /> },
];

const modules = [
  {
    icon: <IconUsers />,
    title: 'Never Lose a Lead',
    category: 'CRM & Lead Management',
    bullets: [
      'Every inquiry from web, phone, walk-in — one pipeline',
      'Auto follow-ups, assignment rules, status tracking',
      'Full deal history linked to customer',
    ],
  },
  {
    icon: <IconMessageSquare />,
    title: 'Respond in Seconds',
    category: 'SMS & Email Messaging',
    bullets: [
      'One inbox for all texts and emails',
      'Pre-built templates + scheduled messages',
      'Full conversation history, no personal phone texting',
    ],
  },
  {
    icon: <IconGlobe />,
    title: 'Your Website, Live in Minutes',
    category: 'Website Builder',
    bullets: [
      'Pick template, add logo, inventory goes live',
      'No developer needed, no separate monthly fee',
      'Customers browse, inquire, book appointments directly',
    ],
  },
  {
    icon: <IconBarChart />,
    title: 'Publish Everywhere at Once',
    category: 'Listing Syndication',
    bullets: [
      'One click: Facebook Marketplace, Google Vehicle Ads, Craigslist',
      'Update once — all channels sync automatically',
    ],
  },
  {
    icon: <IconClipboardCheck />,
    title: 'Front-Line Ready, Faster',
    category: 'Inspection & Recon',
    bullets: [
      'Digital multi-point inspection with R/Y/G scoring + photos',
      '200+ DTC codes, OBD-powered health score',
      'Recon task workflow: assign vendors, track status, photo proof',
      'Public shareable inspection report (customer-facing link)',
    ],
  },
  {
    icon: <IconMapPin />,
    title: 'Know Where Every Car Is',
    category: 'GPS & Lot Management',
    bullets: [
      'Real-time tracking + live lot map',
      'Geofencing, trip logs, test drive monitoring',
      'Theft alerts, unauthorized movement detection',
      '24/7 asset protection',
    ],
  },
];

const gpsFeatures = [
  'Real-time position on lot map',
  'Geofencing with enter/exit alerts',
  'Test drive monitoring (speed, distance, duration)',
  'Unauthorized movement: >1mi MEDIUM, >10mi HIGH, >100mi CRITICAL',
  'Trip recording + full history',
];

const obdFeatures = [
  '37 live vehicle PIDs via Bluetooth',
  'VIN read + auto-decode',
  'Health score 0–100 across 7 categories',
  '200+ DTC codes with cause + repair cost estimate',
  'Mode 06 predictive failure detection',
  'Fraud detection: recently cleared codes flagged',
  'Auto-fills inspection form from scan data',
];

const withoutList = [
  'Leads come in from 4 places — nobody knows who followed up',
  'Customers text your personal phone — no record, no accountability',
  'Recon status lives on a whiteboard nobody updates',
  'Inventory goes online days after it hits the lot',
  'You pay $500+/month for tools that don\'t connect',
  'No idea where your cars are after a test drive',
];

const withList = [
  'Every lead auto-captured, assigned, tracked — nothing falls through',
  'All texts + emails in one inbox with full history',
  'Recon tasks tracked digitally with vendors, photos, timelines',
  'Inventory goes live the moment you add a vehicle',
  'One subscription covers CRM + GPS + Inspection + Website + Messaging',
  'Real-time GPS with theft alerts and test drive monitoring',
];

const advantages = [
  { bold: 'One login for your entire operation', detail: 'No switching between 6 different apps to run your day' },
  { bold: 'Data flows from lead to sale automatically', detail: 'Customer, vehicle, and deal data connected end to end' },
  { bold: 'Real-time dashboards that actually matter', detail: 'Inventory aging, lead pipeline, revenue — all at a glance' },
  { bold: 'Built for independents and BHPH — not enterprise', detail: 'No bloated features you\'ll never use. Fast setup, no IT required' },
  { bold: 'Works from the lot, the auction, or anywhere', detail: 'Full functionality from your phone — iOS and Android' },
  { bold: 'No long-term contracts', detail: 'Month-to-month pricing. Scale up or down anytime' },
];

/* ═══════════════════════════════════════════════════════════════════
   GLASS CARD WRAPPER
   ═══════════════════════════════════════════════════════════════════ */

function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-[0_8px_40px_-12px_rgba(37,99,235,0.15)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function HomeContent() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const displayFont = '"Barlow Condensed", sans-serif';

  return (
    <div className="min-h-screen bg-[#0a0a0f]" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ──── NAV ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center min-h-0 min-w-0 group" aria-label="Smart Dealer home">
            <BrandLockup mode="dealer" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#problem" className="text-sm font-medium text-white/50 transition-colors hover:text-white min-h-0 min-w-0">
              Why Ameriuse
            </a>
            <a href="#capabilities" className="text-sm font-medium text-white/50 transition-colors hover:text-white min-h-0 min-w-0">
              Platform
            </a>
            <a href="#compare" className="text-sm font-medium text-white/50 transition-colors hover:text-white min-h-0 min-w-0">
              Compare
            </a>
            <a
              href="/login"
              className="text-sm font-medium text-white/50 transition-colors hover:text-white min-h-0 min-w-0"
            >
              Log In
            </a>
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 min-h-0"
              style={{ animation: 'home-glow-pulse 3s ease-in-out infinite' }}
            >
              Book a Demo
            </a>
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="/login"
              className="text-sm text-white/50 min-h-0 min-w-0"
            >
              Log In
            </a>
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white min-h-0 min-w-0"
            >
              Demo
            </a>
          </div>
        </div>
      </header>

      {/* ──── HERO ────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        <div
          className="absolute left-1/2 top-[30%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37,99,235,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Light streaks */}
        <div className="absolute left-0 top-[30%] h-[1px] w-[200px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)', animation: 'home-streak 8s linear infinite' }} />
        <div className="absolute left-0 top-[55%] h-[1px] w-[300px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.2), transparent)', animation: 'home-streak 12s linear 4s infinite' }} />
        <div className="absolute left-0 top-[75%] h-[1px] w-[150px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', animation: 'home-streak 10s linear 7s infinite' }} />
        {/* Ghosted logo watermark */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block" style={{ width: 500, height: 500 }}>
          <Image
            src="/logo.png"
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(10) opacity(0.04)' }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400 min-h-0 min-w-0">
              <span className="h-2 w-2 rounded-full bg-blue-400" style={{ animation: 'home-glow-pulse 2s ease-in-out infinite' }} />
              One platform replaces six tools
            </div>

            <h1
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: displayFont, lineHeight: '1.05' }}
            >
              STOP RUNNING YOUR
              <br />
              DEALERSHIP FROM
              <br />
              <span className="text-blue-400">SIX DIFFERENT APPS.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              Ameriuse replaces your CRM, DMS, website builder, messaging tool, inspection app, and GPS tracker — with one connected platform built for independent dealers.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 sm:w-auto"
                style={{ animation: 'home-glow-pulse 3s ease-in-out infinite' }}
              >
                Book a Demo
                <IconArrowRight />
              </a>
              <a
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-4 text-base font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/[0.2] hover:bg-white/[0.06] sm:w-auto"
              >
                Log In to App
              </a>
            </div>

            <p className="mt-6 text-sm text-white/25">
              No credit card required · Set up in under 10 minutes
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="mx-auto mt-16 max-w-4xl" style={{ animation: 'home-float 6s ease-in-out infinite' }}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#111318]/80 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/[0.04] px-3">
                  <span className="text-[10px] text-white/25">smartdealer.ameriuse.com/dashboard</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                  <p className="text-[10px] text-blue-400/60">Inventory</p>
                  <p className="mt-1 text-xl font-bold text-blue-400">47</p>
                </div>
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3">
                  <p className="text-[10px] text-green-400/60">New Leads</p>
                  <p className="mt-1 text-xl font-bold text-green-400">12</p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                  <p className="text-[10px] text-amber-400/60">Recon</p>
                  <p className="mt-1 text-xl font-bold text-amber-400">8</p>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-3">
                  <p className="text-[10px] text-purple-400/60">Revenue</p>
                  <p className="mt-1 text-xl font-bold text-purple-400">$124K</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
                <div className="flex h-20 items-end gap-[3px]">
                  {[35, 55, 40, 70, 50, 85, 60, 75, 90, 65, 80, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-blue-500/30 transition-all hover:bg-blue-500/50"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-[9px] text-white/20">Jan</span>
                  <span className="text-[9px] text-white/20">Dec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── THE PROBLEM ─────────────────────────────────── */}
      <section id="problem" className="scroll-mt-20 bg-[#0e1018] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: displayFont }}
              >
                You&apos;re Paying for Six Tools
                <br />
                <span className="text-white/50">That Don&apos;t Talk to Each Other</span>
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Most independent dealers juggle separate software for CRM, inventory, websites, texting, inspections, and GPS. Data gets re-entered. Leads slip through. Ameriuse puts it all in one place.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {toolsReplaced.map((item, i) => (
              <Reveal key={item.tool} delay={0.05 * i}>
                <GlassCard className="p-5 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    {item.icon}
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">{item.tool}</p>
                  <p className="mt-1 text-[11px] text-white/30">Replaces {item.replaces}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-12 text-center text-lg font-semibold text-white/70">
              One login. One subscription. <span className="text-blue-400">Everything connected.</span>
            </p>
          </Reveal>

          {/* Pillars */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: <IconLayers />, title: 'One Source of Truth', text: 'Customer, vehicle, and deal data connected across every screen. Enter it once — use it everywhere.' },
              { icon: <IconZap />, title: 'Speed That Sells Cars', text: 'Respond to leads in seconds. Publish inventory instantly. Get vehicles front-line ready faster.' },
              { icon: <IconShield />, title: 'Control & Visibility', text: 'Real-time dashboards. Role-based access. Full operational transparency at a glance.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.1 * i}>
                <GlassCard className="p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.2}>
            <div className="mt-14 text-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex items-center gap-2 text-base font-semibold text-blue-400 transition-colors hover:text-blue-300 min-h-0 min-w-0"
              >
                See how it works — book a 15-minute demo
                <IconArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── GPS + OBD DIFFERENTIATOR ────────────────────── */}
      <section className="relative overflow-hidden py-24">
        {/* Blue accent lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 min-h-0 min-w-0">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                Only Platform With This Capability
              </div>
              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: displayFont }}
              >
                The Only Dealer Platform With
                <br />
                <span className="text-blue-400">Live GPS + OBD Intelligence</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* GPS Column */}
            <Reveal delay={0.1}>
              <GlassCard className="p-8" hover={false}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                    <IconMapPin />
                  </div>
                  <h3 className="text-xl font-bold text-white">GPS Tracking</h3>
                </div>
                <ul className="space-y-3">
                  {gpsFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-blue-400/60">
                  Replaces Spireon / LoJack at a fraction of the cost
                </p>
              </GlassCard>
            </Reveal>

            {/* OBD Column */}
            <Reveal delay={0.2}>
              <GlassCard className="p-8" hover={false}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                    <IconCpu />
                  </div>
                  <h3 className="text-xl font-bold text-white">OBD Diagnostics</h3>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 min-h-0 min-w-0">
                    AT INTAKE
                  </span>
                </div>
                <ul className="space-y-3">
                  {obdFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>

          {/* Callout */}
          <Reveal delay={0.3}>
            <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-6 text-center">
              <p className="text-base font-semibold text-blue-300">
                No competitor offers GPS + OBD + Inspection in one connected workflow.
              </p>
              <p className="mt-1 text-sm text-white/30">
                Not Spireon. Not AutoVitals. Not Rapid Recon.
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.35}>
            <div className="mt-10 text-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500"
                style={{ animation: 'home-glow-pulse 3s ease-in-out infinite' }}
              >
                Book a Demo
                <IconArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── SIX MODULES ─────────────────────────────────── */}
      <section id="capabilities" className="scroll-mt-20 bg-[#0e1018] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: displayFont }}
              >
                Six Modules. One Platform.{' '}
                <span className="text-blue-400">Zero Gaps.</span>
              </h2>
              <p className="mt-4 text-lg text-white/50">
                From the moment you acquire a vehicle to the moment you hand over the keys — every step lives in Ameriuse.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => (
              <Reveal key={mod.title} delay={0.08 * i}>
                <GlassCard className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    {mod.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{mod.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-400/70">
                    {mod.category}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {mod.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                        <span className="text-sm text-white/50">{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.4}>
            <div className="mt-14 text-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500"
                style={{ animation: 'home-glow-pulse 3s ease-in-out infinite' }}
              >
                Book a Demo
                <IconArrowRight />
              </a>
              <p className="mt-3 text-sm text-white/25">
                See all six modules in action. 15 minutes, no pressure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── COMPARISON ──────────────────────────────────── */}
      <section id="compare" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: displayFont }}
              >
                The Difference Is <span className="text-blue-400">Obvious</span>
              </h2>
              <p className="mt-4 text-lg text-white/50">
                See what changes when you stop stitching together disconnected software.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Without */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">
                  Without Ameriuse
                </h3>
                <ul className="mt-6 space-y-4">
                  {withoutList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                        <IconX />
                      </span>
                      <span className="text-sm text-red-200/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* With */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-green-400">
                  With Ameriuse
                </h3>
                <ul className="mt-6 space-y-4">
                  {withList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                        <IconCheck />
                      </span>
                      <span className="text-sm text-green-200/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex items-center gap-2 text-base font-semibold text-blue-400 transition-colors hover:text-blue-300 min-h-0 min-w-0"
              >
                Ready to make the switch? Let&apos;s talk
                <IconArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── STATS ───────────────────────────────────────── */}
      <section className="bg-[#0e1018] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { display: <Counter target={6} />, label: 'Tools Replaced' },
              { display: '< 2 min', label: 'Avg Lead Response' },
              { display: <><Counter target={99} />.9%</>, label: 'Platform Uptime' },
              { display: <><Counter target={100} suffix="%" /></>, label: 'Mobile Ready' },
            ].map((stat) => (
              <Reveal key={stat.label} delay={0.05}>
                <div className="text-center">
                  <p
                    className="text-4xl font-extrabold text-white sm:text-5xl"
                    style={{ fontFamily: displayFont }}
                  >
                    {stat.display}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/40">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── ADVANTAGES ──────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: displayFont }}
              >
                Built for How You <span className="text-blue-400">Actually Work</span>
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Ameriuse gives independent dealers the same operational power as franchise stores — without the complexity or the price tag.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-2xl">
            <ul className="space-y-6">
              {advantages.map((adv, i) => (
                <Reveal key={adv.bold} delay={0.06 * i}>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 min-h-0 min-w-0">
                      <IconCheck />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{adv.bold}</p>
                      <p className="mt-0.5 text-sm text-white/40">{adv.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="mt-14 text-center">
              <a
                href="mailto:support@ameriuse.com?subject=Getting%20Started"
                className="inline-flex items-center gap-2 text-base font-semibold text-blue-400 transition-colors hover:text-blue-300 min-h-0 min-w-0"
              >
                Start your free trial today
                <IconArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── FINAL CTA ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#060609] py-24">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: displayFont }}
            >
              Your Dealership Deserves Better
              <br />
              <span className="text-white/40">Than a Spreadsheet</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/40">
              Join independent dealers who replaced their patchwork of tools with one platform that actually works together.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 sm:w-auto"
                style={{ animation: 'home-glow-pulse 3s ease-in-out infinite' }}
              >
                Book a Demo
                <IconArrowRight />
              </a>
              <a
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-4 text-base font-semibold text-white/80 transition-all hover:border-white/[0.2] hover:bg-white/[0.06] sm:w-auto"
              >
                Log In to App
              </a>
            </div>
            <p className="mt-5 text-sm text-white/20">
              No credit card required · No long-term contract · Set up in 10 minutes
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──── FOOTER ──────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#050508] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <Image
                src="/logo.png"
                alt="Ameriuse"
                width={120}
                height={28}
                className="h-7 w-auto opacity-70"
              />
              <p className="mt-2 text-sm text-white/30">The Dealership Operating System</p>
            </div>
            <nav className="flex flex-wrap items-center gap-6">
              <a
                href="mailto:support@ameriuse.com"
                className="text-sm text-white/30 transition-colors hover:text-white min-h-0 min-w-0"
              >
                Contact
              </a>
              <Link
                href="/privacy"
                className="text-sm text-white/30 transition-colors hover:text-white min-h-0 min-w-0"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/30 transition-colors hover:text-white min-h-0 min-w-0"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>
          {/* Social links */}
          <div className="mt-8 border-t border-white/[0.06] pt-6 flex justify-center gap-3">
            <a href="https://www.instagram.com/ameriuse?igsh=Y2R2bmM5OW12dWkx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link social-link-lg" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/share/18Pgn8bjcQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link social-link-lg" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/ameriuse/" target="_blank" rel="noopener noreferrer" className="social-link social-link-lg" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <div className="mt-4 text-center text-sm text-white/20">
            &copy; {new Date().getFullYear()} Ameriuse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
