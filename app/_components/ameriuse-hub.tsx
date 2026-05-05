import Link from 'next/link';
import BrandLockup from './brand-lockup';

const products = [
  {
    name: 'Smart Dealer',
    label: 'Dealer workflow',
    description:
      'Inspection-first software for dealer inventory, recon, customer messaging, and vehicle handoff workflows.',
    href: 'https://smartdealer.ameriuse.com',
    cta: 'Open Smart Dealer',
  },
  {
    name: 'SmartCAN Pro',
    label: 'Vehicle data intelligence',
    description:
      'CAN bus analysis, live capture workflows, demos, and tooling for builders working with real vehicle data.',
    href: 'https://smartcan.ameriuse.com',
    cta: 'Try SmartCAN',
  },
];

export default function AmeriuseHub() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08111f] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(47,107,255,0.28),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(45,212,255,0.18),transparent_34%),linear-gradient(180deg,#08111f_0%,#0b1020_56%,#070b14_100%)]" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ameriuse home">
          <BrandLockup mode="hub" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 md:flex">
          <a href="https://smartdealer.ameriuse.com" className="transition hover:text-white">
            Smart Dealer
          </a>
          <a href="https://smartcan.ameriuse.com" className="transition hover:text-white">
            SmartCAN Pro
          </a>
          <Link href="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
            Ameriuse ecosystem
          </p>
          <h1 className="font-['Barlow_Condensed'] text-6xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Ameriuse builds vehicle commerce and intelligence tools.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Ameriuse is the parent company for products that help dealers manage vehicle workflows and help builders understand real vehicle data.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://smartdealer.ameriuse.com"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2f6bff] px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/40 transition hover:bg-[#2458d8]"
            >
              Open Smart Dealer
            </a>
            <a
              href="https://smartcan.ameriuse.com"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/12"
            >
              Try SmartCAN Pro
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/25 backdrop-blur">
          <div className="rounded-2xl border border-cyan-300/15 bg-[#06121f] p-5">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-bold text-cyan-200">Product system</span>
              <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">Live domains</span>
            </div>
            <div className="space-y-4">
              <FlowRow label="Parent company" value="ameriuse.com" />
              <FlowRow label="Dealer product" value="smartdealer.ameriuse.com" />
              <FlowRow label="Vehicle data product" value="smartcan.ameriuse.com" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Products</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Focused products under one Ameriuse brand.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.075]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{product.label}</p>
              <h3 className="mt-4 text-2xl font-black text-white">{product.name}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-300">{product.description}</p>
              <span className="mt-6 inline-flex text-sm font-black text-cyan-200 transition group-hover:text-cyan-100">
                {product.cta}
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="font-bold text-white">Ameriuse</div>
          <div className="flex flex-wrap gap-5">
            <a href="https://smartdealer.ameriuse.com" className="hover:text-white">Smart Dealer</a>
            <a href="https://smartcan.ameriuse.com" className="hover:text-white">SmartCAN Pro</a>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FlowRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  );
}
