import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ameriuse — The Operating System for Independent Dealers',
  description:
    'Stop juggling 6 different tools. Ameriuse unifies CRM, inventory, website, messaging, inspections, and GPS into one platform built for independent auto dealers.',
  openGraph: {
    title: 'Ameriuse — The Operating System for Independent Dealers',
    description:
      'One platform replaces your CRM, DMS, website builder, messaging tool, inspection app, and GPS tracker. Built for independent and BHPH dealers.',
    url: 'https://ameriuse.com',
    siteName: 'Ameriuse',
    type: 'website',
  },
};

/* ── Inline SVG icons ──────────────────────────────────────────────── */

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

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */

const capabilities = [
  {
    icon: <IconUsers />,
    title: 'Never Lose a Lead',
    subtitle: 'CRM & Lead Management',
    description:
      'Every inquiry — web, phone, walk-in — lands in one pipeline. Automatic follow-ups make sure no lead goes cold. You see who needs attention right now, not tomorrow.',
  },
  {
    icon: <IconMessageSquare />,
    title: 'Respond in Seconds, Not Hours',
    subtitle: 'SMS & Email Messaging',
    description:
      'Text and email customers from one inbox. Pre-built templates, scheduled messages, and full conversation history mean your team responds faster than the competition.',
  },
  {
    icon: <IconGlobe />,
    title: 'Your Website, Live in Minutes',
    subtitle: 'Website Builder',
    description:
      'Pick a template, add your logo, and your inventory goes live. No developer, no monthly website fee. Customers browse, inquire, and book appointments directly.',
  },
  {
    icon: <IconBarChart />,
    title: 'Publish Everywhere at Once',
    subtitle: 'Listing Feeds & Syndication',
    description:
      'One click pushes your inventory to Facebook Marketplace, Google Vehicle Ads, Craigslist, and more. Update once — every channel updates automatically.',
  },
  {
    icon: <IconClipboardCheck />,
    title: 'Front-Line Ready, Faster',
    subtitle: 'Inspections & Reconditioning',
    description:
      'Digital multi-point inspections with photo proof. Assign recon tasks, track vendor work, and know exactly when each vehicle is ready to sell.',
  },
  {
    icon: <IconMapPin />,
    title: 'Know Where Every Car Is',
    subtitle: 'GPS & Lot Management',
    description:
      'Real-time tracking, geofencing, and trip logs for every unit on your lot. Monitor test drives live, get alerts on unauthorized movement, protect your assets 24/7.',
  },
];

const replaces = [
  { tool: 'Standalone CRM', example: 'DealerSocket, Elead' },
  { tool: 'Separate DMS', example: 'Frazer, DealerCenter' },
  { tool: 'Website builder', example: 'Dealer.com, DealerFire' },
  { tool: 'SMS platform', example: 'Podium, Kenect' },
  { tool: 'Inspection app', example: 'AutoGrade, paper forms' },
  { tool: 'GPS tracker dashboard', example: 'Spireon, Ituran' },
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
            <a href="#problem" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Why Ameriuse
            </a>
            <a href="#capabilities" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Platform
            </a>
            <a href="#compare" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Compare
            </a>
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 min-h-0"
            >
              Book a Demo
            </a>
          </nav>
          {/* Mobile CTA */}
          <a
            href="mailto:support@ameriuse.com?subject=Demo%20Request"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white md:hidden min-h-0 min-w-0"
          >
            Book Demo
          </a>
        </div>
      </header>

      {/* ──── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-20 pt-16 sm:pt-24 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 min-h-0 min-w-0">
              <IconZap />
              <span>One platform replaces six tools</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl" style={{ lineHeight: '1.1' }}>
              Stop running your
              <br />
              dealership from
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                six different apps
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Ameriuse replaces your CRM, DMS, website builder, messaging tool, inspection app, and GPS tracker with one connected platform.
              <span className="font-medium text-gray-900"> Built specifically for independent and BHPH dealers.</span>
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
                Get Started Free
              </a>
            </div>
            {/* Trust nudge */}
            <p className="mt-6 text-sm text-gray-400">No credit card required. Set up in under 10 minutes.</p>
          </div>

          {/* Hero visual — dashboard mockup */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 flex h-6 flex-1 items-center rounded-md bg-gray-200 px-3">
                  <span className="text-[10px] text-gray-400">app.ameriuse.com/dashboard</span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-3 hidden space-y-3 lg:block">
                  <div className="h-8 w-24 rounded-lg bg-blue-600" />
                  <div className="mt-6 space-y-2">
                    {['Dashboard', 'Vehicles', 'Leads', 'Messages', 'Tasks'].map((item, i) => (
                      <div key={item} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${i === 0 ? 'bg-blue-50' : ''}`}>
                        <div className={`h-4 w-4 rounded ${i === 0 ? 'bg-blue-400' : 'bg-gray-200'}`} />
                        <span className={`text-xs font-medium ${i === 0 ? 'text-blue-700' : 'text-gray-500'}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 space-y-4 lg:col-span-9">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: 'Active Inventory', value: '47', color: 'bg-blue-50 text-blue-700' },
                      { label: 'New Leads Today', value: '12', color: 'bg-green-50 text-green-700' },
                      { label: 'Pending Recon', value: '8', color: 'bg-amber-50 text-amber-700' },
                      { label: 'Revenue (MTD)', value: '$124K', color: 'bg-purple-50 text-purple-700' },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
                        <p className="text-xs font-medium opacity-70">{stat.label}</p>
                        <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
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

      {/* ──── PROBLEM → SOLUTION ───────────────────────────────── */}
      <section id="problem" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              You&apos;re paying for six tools that don&apos;t talk to each other
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Most independent dealers juggle separate software for CRM, inventory, websites, texting, inspections, and GPS. Data gets re-entered. Leads slip through. You waste hours switching between tabs. Ameriuse puts it all in one place.
            </p>
          </div>

          {/* What Ameriuse replaces */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {replaces.map((item) => (
              <div key={item.tool} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 px-5 py-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <IconCheck />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Replaces your {item.tool}</p>
                  <p className="text-xs text-gray-500">{item.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform pillars */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: <IconLayers />,
                title: 'One Source of Truth',
                text: 'Customer, vehicle, and deal data connected across every screen. Enter it once — use it everywhere. No more copy-pasting between apps.',
              },
              {
                icon: <IconZap />,
                title: 'Speed That Sells Cars',
                text: 'Respond to leads in seconds, not hours. Publish inventory instantly. Get vehicles front-line ready faster. Speed is your competitive advantage.',
              },
              {
                icon: <IconShield />,
                title: 'Control & Visibility',
                text: 'Real-time dashboards show your inventory, leads, revenue, and operations at a glance. Role-based access keeps your team focused and accountable.',
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

          {/* Section CTA */}
          <div className="mt-12 text-center">
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              See how it works — book a 15-minute demo
              <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ──── CAPABILITIES ────────────────────────────────────── */}
      <section id="capabilities" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Six modules. One platform. Zero gaps.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From the moment you acquire a vehicle to the moment you hand over the keys — every step lives in Ameriuse.
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
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-600">{cap.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{cap.description}</p>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div className="mt-14 text-center">
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
            >
              Book a Demo
              <IconArrowRight />
            </a>
            <p className="mt-3 text-sm text-gray-400">See all six modules in action. 15 minutes, no pressure.</p>
          </div>
        </div>
      </section>

      {/* ──── COMPARISON ───────────────────────────────────────── */}
      <section id="compare" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The difference is obvious
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what changes when you stop stitching together disconnected software.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Without */}
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-600">Without Ameriuse</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'Leads come in from 4 places — nobody knows who followed up',
                  'Customer texts your personal phone — no record, no accountability',
                  'Recon status lives on a whiteboard that nobody updates',
                  'Inventory goes on your website days after it hits the lot',
                  'You pay $500+/month for tools that don\'t connect',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                      <IconX />
                    </span>
                    <span className="text-sm text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-green-600">With Ameriuse</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'Every lead auto-captured and assigned — nothing falls through',
                  'All texts and emails in one inbox with full history',
                  'Recon tasks tracked digitally with photos, vendors, and timelines',
                  'Inventory goes live the moment you add a vehicle',
                  'One subscription covers your entire operation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <IconCheck />
                    </span>
                    <span className="text-sm text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section CTA */}
          <div className="mt-12 text-center">
            <a
              href="mailto:support@ameriuse.com?subject=Demo%20Request"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Ready to make the switch? Let&apos;s talk
              <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ──── TRUST / METRICS ──────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: '6-in-1', label: 'Tools Replaced' },
              { value: '< 2 min', label: 'Avg. Lead Response' },
              { value: '99.9%', label: 'Platform Uptime' },
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

      {/* ──── WHY DEALERS SWITCH ───────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built for how you actually work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Ameriuse gives independent dealers the same operational power as franchise stores — without the complexity or the price tag.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <ul className="space-y-5">
              {[
                { text: 'One login for your entire operation', detail: 'No switching between 6 different apps to run your day' },
                { text: 'Data flows from lead to sale automatically', detail: 'Customer info, vehicle details, and deal history — connected end to end' },
                { text: 'Real-time dashboards that actually matter', detail: 'Inventory aging, lead pipeline, revenue trends — all at a glance' },
                { text: 'Built for independents and BHPH, not enterprise', detail: 'No bloated features you\'ll never use. Fast setup, no IT team required' },
                { text: 'Works on your phone', detail: 'Full functionality from the lot, the auction, or anywhere else' },
                { text: 'No long-term contracts', detail: 'Month-to-month pricing. Scale up or down as your business changes' },
              ].map((adv) => (
                <li key={adv.text} className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 min-h-0 min-w-0">
                    <IconCheck />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-gray-900">{adv.text}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{adv.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Section CTA */}
          <div className="mt-14 text-center">
            <a
              href="mailto:support@ameriuse.com?subject=Getting%20Started"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Start your free trial today
              <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ──── FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your dealership deserves better than a spreadsheet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Join independent dealers who replaced their patchwork of tools with one platform that actually works together. Set up takes less than 10 minutes.
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
              Get Started Free
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500">No credit card required. No long-term contract.</p>
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
              <p className="mt-1 text-sm text-gray-500">The Dealership Operating System</p>
            </div>
            <nav className="flex flex-wrap items-center gap-6">
              <a href="mailto:support@ameriuse.com" className="text-sm text-gray-400 transition-colors hover:text-white min-h-0 min-w-0">
                Contact
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
