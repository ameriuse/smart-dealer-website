'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  slug: string;
  placeholder?: string;
  className?: string;
}

const ROTATING_PLACEHOLDERS = [
  'Search by make, model, or year...',
  'Try: Toyota under $20k',
  'Find: Low mileage SUV',
  'Looking for: Pickup truck AWD',
  'Search: Honda Accord 2020+',
  'Browse: Electric vehicles',
];

/**
 * Animated search bar with rotating placeholder text.
 * Navigates to SRP with ?search= query param.
 */
export default function SearchBar({ slug, placeholder, className = '' }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentPlaceholder = placeholder ?? ROTATING_PLACEHOLDERS[placeholderIdx];

  // Typewriter effect
  useEffect(() => {
    if (query) return; // Stop animation when user is typing

    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayedPlaceholder.length < currentPlaceholder.length) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(currentPlaceholder.slice(0, displayedPlaceholder.length + 1));
        }, 50);
      } else {
        // Pause before erasing
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      if (displayedPlaceholder.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedPlaceholder(displayedPlaceholder.slice(0, -1));
        }, 25);
      } else {
        setPlaceholderIdx((i) => (i + 1) % ROTATING_PLACEHOLDERS.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, isTyping, currentPlaceholder, query]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push(`/d/${slug}/inventory`);
      return;
    }
    // Parse simple natural language
    const q = query.toLowerCase();
    const params = new URLSearchParams();

    // Extract make
    const makes = ['toyota', 'honda', 'ford', 'chevrolet', 'chevy', 'bmw', 'mercedes', 'audi', 'nissan', 'hyundai', 'kia', 'jeep', 'ram', 'gmc', 'subaru', 'mazda', 'volkswagen', 'vw', 'lexus', 'acura'];
    for (const make of makes) {
      if (q.includes(make)) {
        params.set('make', make === 'chevy' ? 'Chevrolet' : make === 'vw' ? 'Volkswagen' : make.charAt(0).toUpperCase() + make.slice(1));
        break;
      }
    }

    // Extract price
    const priceMatch = q.match(/under\s*\$?(\d+)k?/);
    if (priceMatch) {
      const val = parseInt(priceMatch[1]);
      params.set('priceMax', val >= 1000 ? String(val) : String(val * 1000));
    }

    router.push(`/d/${slug}/inventory?${params.toString()}`);
  }, [query, slug, router]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={displayedPlaceholder || ROTATING_PLACEHOLDERS[0]}
          aria-label="Search vehicles"
          className="w-full pl-12 pr-32 py-4 text-base sm:text-lg text-gray-900 bg-white rounded-2xl border-0 shadow-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shadow-sm hover:brightness-95 transition-all"
          style={{ backgroundColor: 'var(--primary, #2563eb)' }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
