import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ameriuse — Dealership Operating System',
  description:
    'The all-in-one platform for independent auto dealers. CRM, website builder, inventory management, messaging, inspections, GPS tracking, and more — unified in a single system.',
  openGraph: {
    title: 'Ameriuse — Dealership Operating System',
    description:
      'Run your entire dealership from one platform. CRM, website builder, listing feeds, messaging, inspections, and GPS — all connected.',
    url: 'https://ameriuse.com',
    siteName: 'Ameriuse',
    type: 'website',
  },
};

/* ── Inline SVG icons (no external deps) ──────────────────────────── */

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function IconMessageSquare() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconClipboardCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 10 10-12h-9l1-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */

const capabilities = [
  {
    icon: <IconUsers />,
    title: 'CRM & Lead Management',
    description:
      'Capture leads from your website, phone, and walk-ins. Track every interaction, automate follow-ups, and move prospects through your pipeline with full visibility.',
  },
  {
    icon: <IconGlobe />,
    title: 'Website Builder',
    description:
      'Launch a professional dealer website in minutes. Choose from multiple templates, customize your branding, and publish your inventory — no developer required.',
  },
  {
    icon: <IconBarChart />,
    title: 'Listing Feeds & Syndication',
    description:
      'Syndicate your inventory to Facebook Marketplace, Google Vehicle Ads, Craigslist, and more. Manage all listing channels from a single dashboard.',
  },
  {
    icon: <IconMessageSquare />,
    title: 'Messaging & Follow-Up',
    description:
      'SMS and email from one inbox. Send appointment reminders, status updates, and follow-ups. Templates, scheduling, and conversation history — all built in.',
  },
  {
    icon: <IconClipboardCheck />,
    title: 'Inspections & Reconditioning',
    description:
      'Digital multi-point inspections with photo evidence. Track reconditioning tasks, assign vendors, and get vehicles front-line ready faster.',
  },
  {
    icon: <IconMapPin />,
    title: 'GPS & Lot Management',
    description:
      'Real-time vehicle tracking, geofencing, trip recording, and lot visibility. Know where every unit is, monitor test drives, and protect your assets.',
  },
];

const advantages = [
  'One login for your entire operation — no switching between apps',
  'Customer data flows from lead to sale without manual re-entry',
  'Real-time dashboards show exactly where your business stands',
  'Built specifically for independent and BHPH dealers',
  'Mobile-first design — manage your lot from your phone',
  'No long-term contracts — scale up or down as you grow',
];

/* ── Page Component ───────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ──── NAVIGATION ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 min-h-0 min-w-0">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: '"DM Sans", sans-serif' }}>
              ameriuse
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#platform" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Platform
            </a>
            <a href="#capabilities" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Capabilities
            </a>
            <a href="#why" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Why Ameriuse
            </a>
            <a
              href="mailto:support@ameriuse.com"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 min-h-0"
            >
              Contact Sales
            </a>
          </nav>
          {/* Mobile CTA */}
          <a
            href="mailto:support@ameriuse.com"
            className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white md:hidden min-h-0 min-w-0"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ──── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-20 pt-16 sm:pt-24 lg:pt-32">
        {/* Subtle background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 min-h-0 min-w-0">
              <IconZap />
              <span>Built for Independent Dealers</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl" style={{ lineHeight: '1.1' }}>
              The operating system
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                for your dealership
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              CRM, website, inventory, messaging, inspections, GPS — everything you need to run your lot, unified in one platform. Stop juggling disconnected tools.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:support@ameriuse.com?subject=Demo%20Request"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:w-auto"
              >
                Book a Demo
                <IconArrowRight />
              </a>
              <a
                href="mailto:support@ameriuse.com?subject=Getting%20Started"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Hero visual — abstract dashboard mockup */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 h-6 flex-1 rounded-md bg-gray-200" />
              </div>
              {/* Dashboard mockup */}
              <div className="grid grid-cols-12 gap-4 p-6">
                {/* Sidebar */}
                <div className="col-span-3 hidden space-y-3 lg:block">
                  <div className="h-8 w-24 rounded-lg bg-blue-600" />
                  <div className="mt-6 space-y-2">
                    {['Dashboard', 'Vehicles', 'Leads', 'Messages', 'Tasks'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg px-3 py-2">
                        <div className="h-4 w-4 rounded bg-gray-200" />
                        <span className="text-xs font-medium text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main content */}
                <div className="col-span-12 space-y-4 lg:col-span-9">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: 'Active Inventory', value: '47', color: 'bg-blue-50 text-blue-700' },
                      { label: 'New Leads', value: '12', color: 'bg-green-50 text-green-700' },
                      { label: 'Pending Tasks', value: '8', color: 'bg-amber-50 text-amber-700' },
                      { label: 'This Month', value: '$124K', color: 'bg-purple-50 text-purple-700' },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
                        <p className="text-xs font-medium opacity-70">{stat.label}</p>
                        <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Content rows */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl border border-gray-100 p-4">
                        <div className="h-24 rounded-lg bg-gray-100" />
                        <div className="mt-3 h-3 w-3/4 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── PLATFORM OVERVIEW ───────────────────────────────── */}
      <section id="platform" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              One platform. Every part of your dealership.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Ameriuse replaces the patchwork of spreadsheets, sticky notes, and disconnected software that most independent dealers rely on. From the moment you acquire a vehicle to the moment you hand over the keys, every step lives in one system.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: <IconLayers />,
                title: 'Unified Data',
                text: 'Customer, vehicle, and transaction data connected across every screen. No duplicate entry, no lost information.',
              },
              {
                icon: <IconZap />,
                title: 'Built for Speed',
                text: 'Fast, mobile-first interface designed for the pace of a real lot. Works on your phone, tablet, or desktop.',
              },
              {
                icon: <IconShield />,
                title: 'Enterprise Grade',
                text: 'Role-based access control, encrypted data, audit trails, and compliance-ready infrastructure.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CAPABILITIES ────────────────────────────────────── */}
      <section id="capabilities" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to run your lot
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Six integrated modules that cover the full dealership lifecycle.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  {cap.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── WHY AMERIUSE ────────────────────────────────────── */}
      <section id="why" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why dealers switch to Ameriuse
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Independent dealers don&apos;t need ten different subscriptions and a IT department to compete. Ameriuse gives you the same operational power as franchise stores — at a fraction of the cost and complexity.
              </p>
              <ul className="mt-8 space-y-4">
                {advantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 min-h-0 min-w-0">
                      <IconCheck />
                    </span>
                    <span className="text-base text-gray-700">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right visual — comparison */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-600">Without Ameriuse</h3>
                <ul className="mt-4 space-y-2 text-sm text-red-700">
                  <li>Separate CRM, DMS, and inventory tools that don&apos;t talk to each other</li>
                  <li>Leads fall through the cracks between systems</li>
                  <li>Manual data re-entry across multiple platforms</li>
                  <li>No single view of your customer or your lot</li>
                  <li>Multiple subscriptions adding up to $500+/month</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-green-600">With Ameriuse</h3>
                <ul className="mt-4 space-y-2 text-sm text-green-700">
                  <li>One platform from acquisition to sold — no gaps</li>
                  <li>Every lead tracked, every follow-up automated</li>
                  <li>Enter data once, use it everywhere</li>
                  <li>Real-time dashboards for inventory, sales, and operations</li>
                  <li>One subscription, full operational coverage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── SOCIAL PROOF ────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: '6', label: 'Integrated Modules' },
              { value: '24/7', label: 'System Uptime' },
              { value: '<2min', label: 'Average Response Time' },
              { value: '100%', label: 'Mobile Ready' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to run your dealership from one place?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            See how Ameriuse can streamline your operations. Book a personalized demo with our team, or get started today.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-500 sm:w-auto"
            >
              Book a Demo
              <IconArrowRight />
            </a>
            <a
              href="mailto:support@ameriuse.com?subject=Getting%20Started"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-700 px-8 py-3.5 text-base font-semibold text-gray-300 transition-all hover:border-gray-500 hover:text-white sm:w-auto"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* ──── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 bg-gray-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <span className="text-xl font-extrabold text-white" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                ameriuse
              </span>
              <p className="mt-1 text-sm text-gray-500">Dealership Operating System</p>
            </div>
            <nav className="flex flex-wrap items-center gap-6">
              <a href="mailto:support@ameriuse.com" className="text-sm text-gray-400 transition-colors hover:text-white min-h-0 min-w-0">
                Support
              </a>
              <Link href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white min-h-0 min-w-0">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 transition-colors hover:text-white min-h-0 min-w-0">
                Terms & Conditions
              </Link>
            </nav>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ameriuse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
