'use client';

import { useFeedInventory, useFeedPurchases } from '@/hooks/useFeed';
import { MetricCard } from '@/components/ui/metric-card';
import { formatCurrency } from '@/lib/utils';
import { Package, Clock, AlertTriangle, DollarSign } from 'lucide-react';

export function FeedKPIs() {
  const { totalDailyCost, totalMonthyCost, lowStockCount, avgDaysLeft, totalProducts } = useFeedInventory();
  const { totalSpent } = useFeedPurchases();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Package}
        label="Productos en Inventario"
        value={totalProducts}
        sub={`${lowStockCount > 0 ? `${lowStockCount} bajo stock` : 'Todo abastecido'}`}
        trend={lowStockCount > 0 ? { value: `${lowStockCount} alertas`, positive: false } : undefined}
      />
      <MetricCard
        icon={Clock}
        label="Días Promedio de Stock"
        value={avgDaysLeft}
        sub="Antes de reabastecer"
        trend={{ value: avgDaysLeft >= 10 ? 'Bien' : 'Bajo', positive: avgDaysLeft >= 10 }}
      />
      <MetricCard
        icon={DollarSign}
        label="Costo Diario"
        value={formatCurrency(totalDailyCost)}
        sub={`${formatCurrency(totalMonthyCost)}/mes estimado`}
      />
      <MetricCard
        icon={AlertTriangle}
        label="Total Invertido"
        value={formatCurrency(totalSpent)}
        sub="Compras acumuladas"
      />
    </div>
  );
}
