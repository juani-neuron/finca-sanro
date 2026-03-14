'use client';

import { motion } from 'framer-motion';
import { CompetenciasKPIs } from '@/components/competencias/competencias-kpis';
import { ResultsTable } from '@/components/competencias/results-table';
import { HorsePerformance } from '@/components/competencias/horse-performance';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function CompetenciasPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Competencias</h1>
        <p className="text-sm text-text-secondary mt-1">
          Historial de competencias, premios y resultados KFPS
        </p>
      </div>

      <CompetenciasKPIs />

      <GoldDivider />

      <ResultsTable />

      <GoldDivider />

      <HorsePerformance />
    </motion.div>
  );
}
