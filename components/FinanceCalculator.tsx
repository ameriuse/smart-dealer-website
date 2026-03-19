'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface FinanceCalculatorProps {
  /** Vehicle price in dollars. If omitted, user can enter manually. */
  price?: number;
  /** Dealer slug for the "Apply" link */
  slug?: string;
}

const TERM_OPTIONS = [36, 48, 60, 72] as const;
type Term = (typeof TERM_OPTIONS)[number];

/**
 * Live finance calculator with real amortization math.
 * monthlyPayment = principal * (r * (1+r)^n) / ((1+r)^n - 1)
 * where r = APR/12/100, n = term in months
 */
export default function FinanceCalculator({ price, slug }: FinanceCalculatorProps) {
  const defaultPrice = price ?? 25000;

  const [vehiclePrice, setVehiclePrice] = useState<number>(defaultPrice);
  const [downPayment, setDownPayment] = useState<number>(Math.round(defaultPrice * 0.1));
  const [term, setTerm] = useState<Term>(60);
  const [apr, setApr] = useState<number>(7.9);
  const [monthly, setMonthly] = useState<number>(0);

  const calculate = useCallback(() => {
    const principal = Math.max(0, vehiclePrice - downPayment);
    if (principal <= 0) {
      setMonthly(0);
      return;
    }
    const r = apr / 12 / 100;
    const n = term;

    if (r === 0) {
      setMonthly(principal / n);
      return;
    }

    const pow = Math.pow(1 + r, n);
    const payment = (principal * r * pow) / (pow - 1);
    setMonthly(isFinite(payment) && payment > 0 ? payment : 0);
  }, [vehiclePrice, downPayment, term, apr]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const maxDown = Math.round(vehiclePrice * 0.5);
  const totalCost = monthly * term;
  const totalInterest = totalCost - (vehiclePrice - downPayment);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">Payment Estimator</h2>
          <p className="text-xs text-gray-400">Adjust to see monthly payment</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Vehicle Price (editable only if not pre-filled) */}
        {!price && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Vehicle Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value)))}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={0}
                step={500}
              />
            </div>
          </div>
        )}

        {price && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Vehicle Price</span>
            <span className="font-bold text-gray-900">{formatCurrency(vehiclePrice)}</span>
          </div>
        )}

        {/* Down Payment Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Down Payment
            </label>
            <span className="text-sm font-bold text-gray-900">{formatCurrency(downPayment)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={maxDown}
            step={250}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$0</span>
            <span>{formatCurrency(maxDown)}</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Loan Term (months)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TERM_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  term === t
                    ? 'text-white border-blue-600'
                    : 'text-gray-600 border-gray-200 hover:border-gray-400 bg-white'
                }`}
                style={term === t ? { backgroundColor: 'var(--primary, #2563eb)', borderColor: 'var(--primary, #2563eb)' } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* APR Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Interest Rate (APR)
            </label>
            <span className="text-sm font-bold text-gray-900">{apr.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={3}
            max={25}
            step={0.1}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>3%</span>
            <span>25%</span>
          </div>
        </div>

        {/* Result */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: 'linear-gradient(135deg, var(--primary, #2563eb)15, var(--primary, #2563eb)08)' }}
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Estimated Monthly Payment
          </p>
          <div
            className="text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--primary, #2563eb)' }}
          >
            {monthly > 0 ? `$${Math.ceil(monthly).toLocaleString()}` : '$—'}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            /mo for {term} months
          </p>

          {monthly > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/60 rounded-xl p-2">
                <div className="font-semibold text-gray-600">Loan Amount</div>
                <div className="font-bold text-gray-900">{formatCurrency(vehiclePrice - downPayment)}</div>
              </div>
              <div className="bg-white/60 rounded-xl p-2">
                <div className="font-semibold text-gray-600">Total Interest</div>
                <div className="font-bold text-gray-900">{formatCurrency(Math.max(0, totalInterest))}</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={slug ? `/d/${slug}/financing` : '#'}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--primary, #2563eb)' }}
        >
          Apply for Financing
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        <p className="text-center text-xs text-gray-400">
          Estimate only. Actual rates may vary.
        </p>
      </div>
    </div>
  );
}
