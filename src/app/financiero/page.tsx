'use client';

import { motion } from 'framer-motion';
import { FinancialKPIs } from '@/components/financiero/financial-kpis';
import { RevenueChart } from '@/components/financiero/revenue-chart';
import { CategoryBreakdown } from '@/components/financiero/category-breakdown';
import { TransactionsTable } from '@/components/financiero/transactions-table';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function FinancieroPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Financiero</h1>
        <p className="text-sm text-text-secondary mt-1">
          Dashboard financiero con ingresos, gastos y tendencias
        </p>
      </div>

      <FinancialKPIs />

      <GoldDivider />

      <RevenueChart />

      <CategoryBreakdown />

      <GoldDivider />

      <TransactionsTable />
    </motion.div>
  );
}
