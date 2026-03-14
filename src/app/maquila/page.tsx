'use client';

import { motion } from 'framer-motion';
import { MaquilaKPIs } from '@/components/maquila/maquila-kpis';
import { BreedingPipeline } from '@/components/maquila/breeding-pipeline';
import { ServicesTable } from '@/components/maquila/services-table';
import { StallionMetrics } from '@/components/maquila/stallion-metrics';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function MaquilaPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Maquila</h1>
        <p className="text-sm text-text-secondary mt-1">
          Pipeline de reproducción y gestión de servicios
        </p>
      </div>

      <MaquilaKPIs />

      <GoldDivider />

      <BreedingPipeline />

      <ServicesTable />

      <GoldDivider />

      <StallionMetrics />
    </motion.div>
  );
}
