'use client';

import { motion } from 'framer-motion';
import { FeedKPIs } from '@/components/alimentacion/feed-kpis';
import { InventoryTable } from '@/components/alimentacion/inventory-table';
import { PurchaseHistory } from '@/components/alimentacion/purchase-history';
import { FeedPlans } from '@/components/alimentacion/feed-plans';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function AlimentacionPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Alimentación</h1>
        <p className="text-sm text-text-secondary mt-1">
          Inventario de alimentos, compras y planes de alimentación
        </p>
      </div>

      <FeedKPIs />

      <GoldDivider />

      <InventoryTable />

      <GoldDivider />

      <FeedPlans />

      <GoldDivider />

      <PurchaseHistory />
    </motion.div>
  );
}
