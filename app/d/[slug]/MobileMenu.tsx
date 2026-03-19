'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  slug: string;
  navLinks: Array<{ href: string; label: string }>;
  phone: string | null;
}

export default function MobileMenu({ slug, navLinks, phone }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex-shrink-0">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white flex flex-col shadow-2xl">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-base font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                  <svg className="w-4 h-4 ml-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-4 py-5 border-t border-gray-100 space-y-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phone}
                </a>
              )}
              <Link
                href={`/d/${slug}/financing`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-colors"
                style={{ backgroundColor: 'var(--primary, #1d4ed8)' }}
              >
                Get Pre-Approved
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
