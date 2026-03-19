'use client';

interface ConditionScoreRingProps {
  /** Score from 0–100 or null/undefined if no inspection */
  score: number | null | undefined;
  /** Diameter of the SVG ring in pixels. Default: 120 */
  size?: number;
}

function getScoreColor(score: number | null | undefined): string {
  if (score == null) return '#6b7280'; // gray
  if (score >= 75) return '#16a34a';   // green
  if (score >= 50) return '#d97706';   // yellow/amber
  return '#dc2626';                    // red
}

function getScoreLabel(score: number | null | undefined): string {
  if (score == null) return 'No Data';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Work';
}

/**
 * Animated SVG ring showing the vehicle condition score.
 * Color: green ≥75, yellow ≥50, red <50, gray if no score.
 */
export default function ConditionScoreRing({ score, size = 120 }: ConditionScoreRingProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const strokeWidth = size * 0.085;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score != null ? Math.max(0, Math.min(100, score)) / 100 : 0;
  const dashOffset = circumference * (1 - pct);
  const cx = size / 2;
  const cy = size / 2;

  const scoreFontSize = size * 0.26;
  const labelFontSize = size * 0.12;

  return (
    <div className="flex flex-col items-center select-none" aria-label={`Condition score: ${score ?? 'N/A'} out of 100`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        role="img"
        aria-hidden="true"
      >
        {/* Track ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Score ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {/* Score number */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={scoreFontSize}
          fontWeight="800"
          fontFamily="Inter, system-ui, sans-serif"
          dy="-0.15em"
        >
          {score != null ? score : '—'}
        </text>
        {/* "out of 100" label */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#9ca3af"
          fontSize={labelFontSize}
          fontWeight="500"
          fontFamily="Inter, system-ui, sans-serif"
          dy={`${scoreFontSize * 0.7}px`}
        >
          out of 100
        </text>
      </svg>
      <div
        className="mt-1 text-xs font-semibold"
        style={{ color }}
      >
        {label}
      </div>
    </div>
  );
}
