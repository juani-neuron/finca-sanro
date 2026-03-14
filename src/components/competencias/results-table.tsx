'use client';

import { useState } from 'react';
import { useCompetitions } from '@/hooks/useCompetitions';
import { useHorse } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { CompetitionRecord, CompetitionDiscipline } from '@/types';
import { Filter } from 'lucide-react';

const disciplineLabels: Record<CompetitionDiscipline, string> = {
  dressage: 'Dressage',
  driving: 'Driving',
  show: 'Show',
  keuring: 'Keuring',
};

const disciplineColors: Record<CompetitionDiscipline, { color: string; bgColor: string }> = {
  dressage: { color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  driving: { color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  show: { color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  keuring: { color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

function PlacementBadge({ placement }: { placement?: string }) {
  if (!placement) return <span className="text-text-muted">—</span>;

  let color = '#9CA3AF';
  let bgColor = 'rgba(156, 163, 175, 0.12)';

  if (placement.includes('1er')) {
    color = '#C8A04A';
    bgColor = 'rgba(200, 160, 74, 0.12)';
  } else if (placement.includes('2do')) {
    color = '#9CA3AF';
    bgColor = 'rgba(156, 163, 175, 0.12)';
  } else if (placement.includes('3er')) {
    color = '#CD7F32';
    bgColor = 'rgba(205, 127, 50, 0.12)';
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{ backgroundColor: bgColor, color }}
    >
      {placement}
    </span>
  );
}

function ResultRow({ record }: { record: CompetitionRecord }) {
  const horse = useHorse(record.horseId);
  const dCfg = disciplineColors[record.discipline];

  return (
    <tr className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors">
      <td className="px-4 py-3">
        <span className="font-serif text-sm text-text-primary">{horse?.name || record.horseId}</span>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary hidden sm:table-cell">
        {record.event}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{ backgroundColor: dCfg.bgColor, color: dCfg.color }}
        >
          {disciplineLabels[record.discipline]}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary hidden lg:table-cell">
        {record.level}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary hidden sm:table-cell">
        {formatDate(record.date)}
      </td>
      <td className="px-4 py-3 font-serif text-sm text-text-primary text-center hidden md:table-cell">
        {record.score?.toFixed(1) || '—'}
      </td>
      <td className="px-4 py-3">
        <PlacementBadge placement={record.placement} />
      </td>
    </tr>
  );
}

export function ResultsTable() {
  const { records } = useCompetitions();
  const [disciplineFilter, setDisciplineFilter] = useState<CompetitionDiscipline | ''>('');

  const filtered = disciplineFilter
    ? records.filter((r) => r.discipline === disciplineFilter)
    : records;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Historial de Resultados</SectionLabel>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-text-muted" />
          <select
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value as CompetitionDiscipline | '')}
            className="bg-bg-elevated border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none focus:border-gold-border"
          >
            <option value="">Todas las disciplinas</option>
            {Object.entries(disciplineLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Caballo
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Evento
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Disciplina
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden lg:table-cell">
                  Nivel
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <ResultRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
