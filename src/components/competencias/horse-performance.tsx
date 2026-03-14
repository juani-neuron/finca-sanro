'use client';

import { useCompetitions } from '@/hooks/useCompetitions';
import { useHorses } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { Trophy, Medal, Target } from 'lucide-react';
import Link from 'next/link';

interface HorseStats {
  horseId: string;
  name: string;
  total: number;
  wins: number;
  podiums: number;
  bestScore: number;
  disciplines: string[];
}

export function HorsePerformance() {
  const { records } = useCompetitions();
  const { horses } = useHorses();

  // Aggregate stats per horse
  const horseIds = Array.from(new Set(records.map((r) => r.horseId)));
  const stats: HorseStats[] = horseIds.map((id) => {
    const horseRecords = records.filter((r) => r.horseId === id);
    const horse = horses.find((h) => h.id === id);
    return {
      horseId: id,
      name: horse?.name || id,
      total: horseRecords.length,
      wins: horseRecords.filter((r) => r.placement?.includes('1er')).length,
      podiums: horseRecords.filter(
        (r) => r.placement?.includes('1er') || r.placement?.includes('2do') || r.placement?.includes('3er')
      ).length,
      bestScore: Math.max(...horseRecords.filter((r) => r.score).map((r) => r.score!), 0),
      disciplines: Array.from(new Set(horseRecords.map((r) => r.discipline))),
    };
  });

  // Sort by wins descending
  stats.sort((a, b) => b.wins - a.wins || b.podiums - a.podiums);

  return (
    <div>
      <SectionLabel className="mb-4">Rendimiento por Caballo</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <Link key={stat.horseId} href={`/caballos/${stat.horseId}`}>
            <Card>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg text-text-primary">{stat.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {stat.total} competencia{stat.total !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {idx === 0 && (
                    <div className="p-2 rounded-lg bg-gold-glow">
                      <Trophy className="w-5 h-5 text-gold" />
                    </div>
                  )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-bg-elevated rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Medal className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <p className="font-serif text-lg text-text-primary">{stat.wins}</p>
                    <p className="text-[10px] text-text-muted">1er Lugar</p>
                  </div>
                  <div className="text-center p-2 bg-bg-elevated rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="w-3.5 h-3.5 text-emerald" />
                    </div>
                    <p className="font-serif text-lg text-text-primary">{stat.podiums}</p>
                    <p className="text-[10px] text-text-muted">Podios</p>
                  </div>
                  <div className="text-center p-2 bg-bg-elevated rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="w-3.5 h-3.5 text-blue" />
                    </div>
                    <p className="font-serif text-lg text-text-primary">{stat.bestScore.toFixed(1)}</p>
                    <p className="text-[10px] text-text-muted">Mejor Score</p>
                  </div>
                </div>

                {/* Disciplines */}
                <div className="flex flex-wrap gap-1.5">
                  {stat.disciplines.map((d) => (
                    <span
                      key={d}
                      className="text-[10px] font-medium uppercase tracking-wider text-gold border border-gold-border rounded-full px-2 py-0.5"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
