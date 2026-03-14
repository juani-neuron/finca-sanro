'use client';

import { useBreeding, useSemenProduction } from '@/hooks/useBreeding';
import { MetricCard } from '@/components/ui/metric-card';
import { Baby, HeartPulse, Beaker, TrendingUp } from 'lucide-react';

export function MaquilaKPIs() {
  const { records, active } = useBreeding();
  const { totalDoses, totalSold } = useSemenProduction();

  const pregnant = records.filter((r) => r.status === 'confirmed_pregnant').length;
  const foaled = records.filter((r) => r.status === 'foaled').length;
  const fertilityRate = records.filter((r) => r.pregnancyDiagnosis?.result !== 'pending').length > 0
    ? Math.round(
        (records.filter((r) => r.status === 'confirmed_pregnant' || r.status === 'foaled').length /
          records.filter((r) => r.pregnancyDiagnosis?.result !== 'pending').length) *
          100
      )
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Baby}
        label="Maquilas Activas"
        value={active.length}
        sub={`${pregnant} gestantes, ${active.length - pregnant} en servicio`}
      />
      <MetricCard
        icon={HeartPulse}
        label="Potros Nacidos"
        value={foaled}
        sub="Este ciclo"
        trend={{ value: `${fertilityRate}% fertilidad`, positive: fertilityRate >= 60 }}
      />
      <MetricCard
        icon={Beaker}
        label="Dosis Producidas"
        value={totalDoses}
        sub={`${totalSold} vendidas`}
        trend={{ value: `${Math.round((totalSold / totalDoses) * 100)}%`, positive: true }}
      />
      <MetricCard
        icon={TrendingUp}
        label="Tasa de Venta"
        value={`${Math.round((totalSold / totalDoses) * 100)}%`}
        sub={`${totalDoses - totalSold} dosis en inventario`}
      />
    </div>
  );
}
