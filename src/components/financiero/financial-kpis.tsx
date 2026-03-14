'use client';

import { useFinancialKPIs } from '@/hooks/useFinancial';
import { MetricCard } from '@/components/ui/metric-card';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function FinancialKPIs() {
  const kpis = useFinancialKPIs();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={TrendingUp}
        label="Ingresos Totales"
        value={formatCurrency(kpis.totalIncome)}
        sub="Acumulado"
      />
      <MetricCard
        icon={TrendingDown}
        label="Gastos Totales"
        value={formatCurrency(kpis.totalExpenses)}
        sub="Acumulado"
      />
      <MetricCard
        icon={Wallet}
        label="Balance"
        value={formatCurrency(kpis.totalBalance)}
        sub="Ingresos − Gastos"
        trend={{
          value: kpis.totalBalance >= 0 ? 'Positivo' : 'Negativo',
          positive: kpis.totalBalance >= 0,
        }}
      />
      <MetricCard
        icon={DollarSign}
        label="Ingreso Mensual"
        value={formatCurrency(kpis.monthlyIncome)}
        sub="Este mes"
        trend={
          kpis.incomeChange !== 0
            ? {
                value: `${kpis.incomeChange > 0 ? '+' : ''}${kpis.incomeChange.toFixed(0)}%`,
                positive: kpis.incomeChange >= 0,
              }
            : undefined
        }
      />
    </div>
  );
}
