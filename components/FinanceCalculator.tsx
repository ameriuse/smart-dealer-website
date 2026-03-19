'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface FinanceCalculatorProps {
  price: number;
  slug: string;
}

const TERM_OPTIONS = [36, 48, 60, 72, 84];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

/**
 * Finance calculator with down payment, term, and APR sliders.
 * Uses standard amortization formula: M = P * r(1+r)^n / ((1+r)^n-1)
 */
export default function FinanceCalculator({ price, slug }: FinanceCalculatorProps) {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.1 / 100) * 100);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(7.9);

  const results = useMemo(() => {
    const principal = Math.max(0, price - downPayment);
    const r = apr / 12 / 100;
    let monthly: number;
    if (r === 0) {
      monthly = principal / term;
    } else {
      monthly = (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
    }
    const totalPaid = monthly * term + downPayment;
    const totalInterest = totalPaid - price;
    return { monthly, totalPaid, totalInterest, principal };
  }, [price, downPayment, term, apr]);

  const maxDown = Math.round(price * 0.5);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span className="text-base">💰</span>
          Estimate Your Payment
        </h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Vehicle Price display */}
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
          <span className="text-xs font-semibold text-gray-500">Vehicle Price</span>
          <span className="text-sm font-bold text-gray-900 tabular-nums">{formatCurrency(price)}</span>
        </div>

        {/* Down Payment Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-600">Down Payment</label>
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--primary)' }}>
              {formatCurrency(downPayment)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={maxDown}
            step={500}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--primary)' }}
            aria-label="Down payment amount"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$0</span>
            <span>{formatCurrency(maxDown)}</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2">Loan Term</label>
          <div className="grid grid-cols-5 gap-1.5">
            {TERM_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`py-2 rounded-xl text-xs font-bold transition-colors border ${
                  term === t
                    ? 'text-white border-transparent'
                    : 'text-gray-600 border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                style={term === t ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
              >
                {t}mo
              </button>
            ))}
          </div>
        </div>

        {/* APR Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-600">APR</label>
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--primary)' }}>
              {apr.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min={2.9}
            max={24.9}
            step={0.1}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--primary)' }}
            aria-label="Annual percentage rate"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2.9%</span>
            <span>24.9%</span>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: 'var(--primary)' }}>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white tabular-nums">
              {formatCurrency(Math.round(results.monthly))}<span className="text-lg font-medium opacity-80">/mo</span>
            </div>
            <div className="text-white/70 text-xs mt-1">Estimated monthly payment</div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20">
            <div className="text-center">
              <div className="text-white font-bold text-sm tabular-nums">{formatCurrency(Math.round(results.totalInterest))}</div>
              <div className="text-white/60 text-xs">Total Interest</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm tabular-nums">{formatCurrency(Math.round(results.totalPaid))}</div>
              <div className="text-white/60 text-xs">Total Cost</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Estimate only. Actual rates vary by credit score and lender.
        </p>

        <Link
          href={`/d/${slug}/financing`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
        >
          Apply for Financing →
        </Link>
      </div>
    </div>
  );
}
