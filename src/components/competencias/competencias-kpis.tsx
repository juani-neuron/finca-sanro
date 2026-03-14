'use client';

import { useCompetitions } from '@/hooks/useCompetitions';
import { MetricCard } from '@/components/ui/metric-card';
import { Trophy, Medal, Target, Star } from 'lucide-react';

export function CompetenciasKPIs() {
  const { records, wins, total } = useCompetitions();

  const podiums = records.filter(
    (r) => r.placement?.includes('1er') || r.placement?.includes('2do') || r.placement?.includes('3er')
  ).length;

  const winRate = total > 0 ? Math.round((wins.length / total) * 100) : 0;

  const disciplines = new Set(records.map((r) => r.discipline));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Trophy}
        label="Total Competencias"
        value={total}
        sub={`${disciplines.size} disciplinas`}
      />
      <MetricCard
        icon={Medal}
        label="Primeros Lugares"
        value={wins.length}
        sub="Victorias totales"
        trend={{ value: `${winRate}%`, positive: winRate >= 30 }}
      />
      <MetricCard
        icon={Target}
        label="Podios"
        value={podiums}
        sub={`${Math.round((podiums / total) * 100)}% de participaciones`}
      />
      <MetricCard
        icon={Star}
        label="Mejor Puntuación"
        value={Math.max(...records.filter((r) => r.score).map((r) => r.score!)).toFixed(1)}
        sub="Score máximo alcanzado"
      />
    </div>
  );
}
