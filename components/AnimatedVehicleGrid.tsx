'use client';

import { motion } from 'framer-motion';
import VehicleCard from './VehicleCard';
import type { VehicleListItem } from '@/lib/types';

interface AnimatedVehicleGridProps {
  vehicles: VehicleListItem[];
  slug: string;
  showPricing: boolean;
  className?: string;
  priorityCount?: number;
}

export default function AnimatedVehicleGrid({
  vehicles,
  slug,
  showPricing,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5',
  priorityCount = 3,
}: AnimatedVehicleGridProps) {
  return (
    <div className={className}>
      {vehicles.map((vehicle, i) => (
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.4) }}
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.13)' }}
          className="h-full"
        >
          <VehicleCard
            vehicle={vehicle}
            slug={slug}
            showPricing={showPricing}
            priority={i < priorityCount}
          />
        </motion.div>
      ))}
    </div>
  );
}
