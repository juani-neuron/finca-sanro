'use client';

import { MetricCard } from '@/components/ui/metric-card';
import { useHorses } from '@/hooks/useHorses';
import { useBreeding, useSemenProduction } from '@/hooks/useBreeding';
import { useCalendar } from '@/hooks/useCalendar';
import { Crown, Heart, Droplets, CalendarDays } from 'lucide-react';

export function KPIRow() {
  const { total, stallions, mares, foals } = useHorses();
  const { active } = useBreeding();
  const { totalSold } = useSemenProduction();
  const { upcoming } = useCalendar();

  const pregnantMares = mares.filter((m) => m.status === 'pregnant').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Crown}
        label="Total Caballos"
        value={total}
        sub={`${stallions.length} sementales · ${mares.length} yeguas · ${foals.length} potros`}
      />
      <MetricCard
        icon={Heart}
        label="Yeguas Gestantes"
        value={pregnantMares}
        sub={`${active.length} procesos reproductivos activos`}
        trend={{ value: `${pregnantMares}/${mares.length}`, positive: true }}
      />
      <MetricCard
        icon={Droplets}
        label="Dosis Vendidas"
        value={totalSold}
        sub="Temporada 2026"
        trend={{ value: '+12%', positive: true }}
      />
      <MetricCard
        icon={CalendarDays}
        label="Próximos Eventos"
        value={upcoming.length}
        sub="Programados esta semana"
      />
    </div>
  );
}
