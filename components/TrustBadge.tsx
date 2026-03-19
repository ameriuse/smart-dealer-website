/**
 * Trust badges shown on home page and vehicle cards.
 */

interface TrustBadgeProps {
  type: 'obd' | 'gps' | 'nhtsa' | 'ai';
  size?: 'sm' | 'md' | 'lg';
}

const BADGE_DATA = {
  obd: {
    icon: '🔬',
    label: 'OBD Verified',
    description: 'Real scanner data',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  gps: {
    icon: '📍',
    label: 'GPS Tracked',
    description: 'Location history',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
  },
  nhtsa: {
    icon: '🏛️',
    label: 'NHTSA Checked',
    description: 'Recalls verified',
    color: 'text-green-700 bg-green-50 border-green-200',
  },
  ai: {
    icon: '🤖',
    label: 'AI Inspected',
    description: '200+ point check',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
} as const;

export default function TrustBadge({ type, size = 'md' }: TrustBadgeProps) {
  const badge = BADGE_DATA[type];

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        <span className="text-sm leading-none">{badge.icon}</span>
        {badge.label}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${badge.color}`}>
        <span className="text-2xl leading-none">{badge.icon}</span>
        <div>
          <div className="font-bold text-sm">{badge.label}</div>
          <div className="text-xs opacity-80">{badge.description}</div>
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${badge.color}`}>
      <span className="text-base leading-none">{badge.icon}</span>
      {badge.label}
    </span>
  );
}
