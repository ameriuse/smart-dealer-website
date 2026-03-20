'use client';

import { useEffect, useRef } from 'react';

interface ScoreRingProps {
  score: number;
  color: string;
  label: string | null;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Animated SVG circular score ring.
 * Animates from 0 to score on mount using CSS animation.
 */
export default function ScoreRing({ score, color, label }: ScoreRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    const target = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
    // Start fully hidden
    circle.style.strokeDashoffset = String(CIRCUMFERENCE);
    // Force reflow
    void circle.getBoundingClientRect();
    // Animate to target
    circle.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)';
    circle.style.strokeDashoffset = String(target);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
        {/* Track */}
        <circle
          cx="60" cy="60" r={RADIUS}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        {/* Filled arc */}
        <circle
          ref={circleRef}
          cx="60" cy="60" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
        {/* Score text — counter-rotated so it's upright */}
        <text
          x="60" y="60"
          textAnchor="middle"
          dominantBaseline="central"
          className="rotate-90"
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: '60px 60px',
            fontSize: '26px',
            fontWeight: '800',
            fill: color,
            fontFamily: 'DM Sans, Inter, system-ui, sans-serif',
          }}
        >
          {score}
        </text>
      </svg>
      {label && (
        <span className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: color + '18', color }}>
          {label}
        </span>
      )}
    </div>
  );
}
