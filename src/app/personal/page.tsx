'use client';

import { motion } from 'framer-motion';
import { PersonalKPIs } from '@/components/personal/personal-kpis';
import { StaffGrid } from '@/components/personal/staff-grid';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function PersonalPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Personal</h1>
        <p className="text-sm text-text-secondary mt-1">
          Gestión de entrenadores, cuidadores, veterinarios y herradores
        </p>
      </div>

      <PersonalKPIs />

      <GoldDivider />

      <StaffGrid />
    </motion.div>
  );
}
