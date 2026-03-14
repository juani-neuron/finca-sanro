'use client';

import { Horse, BreedingStatus, ServiceType, SemenQuality } from '@/types';
import { useBreeding, useSemenProduction } from '@/hooks/useBreeding';
import { useHorses } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import { Heart, FlaskConical } from 'lucide-react';

interface TabReproduccionProps {
  horse: Horse;
}

const statusConfig: Record<BreedingStatus, { label: string; color: string; bgColor: string }> = {
  serviced: { label: 'Servida', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  confirmed_pregnant: { label: 'Gestante', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  not_pregnant: { label: 'No Gestante', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  foaled: { label: 'Nacido', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  lost: { label: 'Pérdida', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.12)' },
};

const serviceTypeLabels: Record<ServiceType, string> = {
  natural: 'Monta Natural',
  fresh_semen: 'Semen Fresco',
  frozen_semen: 'Semen Congelado',
};

const qualityColors: Record<SemenQuality, { color: string; bgColor: string }> = {
  excellent: { color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  good: { color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  fair: { color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  poor: { color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
};

const qualityLabels: Record<SemenQuality, string> = {
  excellent: 'Excelente',
  good: 'Buena',
  fair: 'Regular',
  poor: 'Mala',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabReproduccion({ horse }: TabReproduccionProps) {
  const isStallion = horse.sex === 'stallion';
  const { horses } = useHorses();

  const breedingFilters = isStallion
    ? { stallionId: horse.id }
    : { mareId: horse.id };

  const { records: breedingRecords } = useBreeding(breedingFilters);
  const { production, totalDoses, totalSold, averageQuality } = useSemenProduction(
    isStallion ? horse.id : undefined
  );

  const getHorseName = (id: string) => {
    const h = horses.find((h) => h.id === id);
    return h?.name || id;
  };

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breeding Records */}
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <Heart className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>{isStallion ? 'Servicios Reproductivos' : 'Historial Reproductivo'}</SectionLabel>
            <span className="ml-auto text-[12px] text-text-muted">{breedingRecords.length} registros</span>
          </div>

          {breedingRecords.length > 0 ? (
            <div className="space-y-3">
              {breedingRecords.map((record) => {
                const st = statusConfig[record.status];
                const partnerName = isStallion
                  ? getHorseName(record.mareId)
                  : getHorseName(record.stallionId);

                return (
                  <div key={record.id} className="p-4 rounded-lg bg-bg-elevated border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[13px] text-text-primary font-medium">
                          {isStallion ? 'Yegua: ' : 'Semental: '}
                          <span className="font-serif text-gold">{partnerName}</span>
                        </p>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          {formatDate(record.serviceDate)} · {serviceTypeLabels[record.serviceType]}
                        </p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: st.bgColor, color: st.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.color }} />
                        {st.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {record.pregnancyDiagnosis && (
                        <div className="p-2 rounded bg-bg/50 text-center">
                          <p className="text-[10px] text-text-muted">Diagnóstico</p>
                          <p className="text-[12px] text-text-primary font-medium">
                            {record.pregnancyDiagnosis.result === 'positive' ? 'Positivo' :
                              record.pregnancyDiagnosis.result === 'negative' ? 'Negativo' : 'Pendiente'}
                          </p>
                        </div>
                      )}
                      {record.expectedFoalingDate && (
                        <div className="p-2 rounded bg-bg/50 text-center">
                          <p className="text-[10px] text-text-muted">Parto Esperado</p>
                          <p className="text-[12px] text-text-primary font-medium">{formatDate(record.expectedFoalingDate)}</p>
                        </div>
                      )}
                      {record.actualFoalingDate && (
                        <div className="p-2 rounded bg-bg/50 text-center">
                          <p className="text-[10px] text-text-muted">Parto Real</p>
                          <p className="text-[12px] text-text-primary font-medium">{formatDate(record.actualFoalingDate)}</p>
                        </div>
                      )}
                      {record.foalId && (
                        <div className="p-2 rounded bg-bg/50 text-center">
                          <p className="text-[10px] text-text-muted">Cría</p>
                          <p className="text-[12px] text-gold font-medium font-serif">{getHorseName(record.foalId)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-muted py-8 text-center">Sin registros reproductivos.</p>
          )}
        </div>
      </Card>

      {/* Semen Production — Stallions only */}
      {isStallion && production.length > 0 && (
        <Card hover={false}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <FlaskConical className="w-4 h-4 text-gold" />
              </div>
              <SectionLabel>Producción de Semen</SectionLabel>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-bg-elevated text-center">
                <p className="font-serif text-xl text-text-primary font-bold">{totalDoses}</p>
                <p className="text-[10px] text-text-muted">Dosis Producidas</p>
              </div>
              <div className="p-3 rounded-lg bg-bg-elevated text-center">
                <p className="font-serif text-xl text-text-primary font-bold">{totalSold}</p>
                <p className="text-[10px] text-text-muted">Dosis Vendidas</p>
              </div>
              <div className="p-3 rounded-lg bg-bg-elevated text-center">
                <p className="font-serif text-xl text-gold font-bold">{Math.round(averageQuality * 100)}%</p>
                <p className="text-[10px] text-text-muted">Calidad Excelente</p>
              </div>
            </div>

            {/* Production table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-muted font-medium">Fecha</th>
                    <th className="text-center py-2 text-text-muted font-medium">Producidas</th>
                    <th className="text-center py-2 text-text-muted font-medium">Vendidas</th>
                    <th className="text-right py-2 text-text-muted font-medium">Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {production.map((p, i) => {
                    const qc = qualityColors[p.quality];
                    return (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 text-text-secondary">{formatDate(p.date)}</td>
                        <td className="py-2.5 text-center text-text-primary font-medium">{p.dosesProduced}</td>
                        <td className="py-2.5 text-center text-text-primary font-medium">{p.dosesSold}</td>
                        <td className="py-2.5 text-right">
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{ backgroundColor: qc.bgColor, color: qc.color }}
                          >
                            {qualityLabels[p.quality]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
