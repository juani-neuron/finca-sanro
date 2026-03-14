'use client';

import { useBreeding } from '@/hooks/useBreeding';
import { useHorse } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { BreedingRecord } from '@/types';
import Link from 'next/link';

const serviceTypeLabels: Record<string, string> = {
  natural: 'Natural',
  fresh_semen: 'Semen Fresco',
  frozen_semen: 'Semen Congelado',
};

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  serviced: { label: 'En Servicio', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  confirmed_pregnant: { label: 'Gestante', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  not_pregnant: { label: 'No Preñada', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  foaled: { label: 'Parida', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  lost: { label: 'Perdida', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ServiceRow({ record }: { record: BreedingRecord }) {
  const stallion = useHorse(record.stallionId);
  const mare = useHorse(record.mareId);
  const cfg = statusConfig[record.status];

  return (
    <tr className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors">
      <td className="px-4 py-3">
        <Link href={`/caballos/${record.stallionId}`} className="hover:text-gold transition-colors">
          <span className="font-serif text-sm text-text-primary">{stallion?.name || record.stallionId}</span>
        </Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/caballos/${record.mareId}`} className="hover:text-gold transition-colors">
          <span className="text-sm text-text-secondary">{mare?.name || record.mareId}</span>
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary hidden sm:table-cell">
        {formatDate(record.serviceDate)}
      </td>
      <td className="px-4 py-3 text-sm text-text-muted hidden md:table-cell">
        {serviceTypeLabels[record.serviceType]}
      </td>
      <td className="px-4 py-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
          style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
          {cfg.label}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-text-muted hidden lg:table-cell">
        {record.expectedFoalingDate ? formatDate(record.expectedFoalingDate) : '—'}
      </td>
    </tr>
  );
}

export function ServicesTable() {
  const { records } = useBreeding();

  // Sort: active first, then by service date descending
  const sorted = [...records].sort((a, b) => {
    const priority: Record<string, number> = {
      serviced: 0,
      confirmed_pregnant: 1,
      foaled: 2,
      not_pregnant: 3,
      lost: 4,
    };
    const pDiff = (priority[a.status] ?? 5) - (priority[b.status] ?? 5);
    if (pDiff !== 0) return pDiff;
    return new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime();
  });

  return (
    <div>
      <SectionLabel className="mb-4">Servicios de Maquila</SectionLabel>
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Semental
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Yegua
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Fecha Servicio
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden lg:table-cell">
                  Fecha Esperada
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((record) => (
                <ServiceRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
