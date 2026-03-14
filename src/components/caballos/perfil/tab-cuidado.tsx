'use client';

import { Horse, ShoeType } from '@/types';
import { useFarrier, useNutrition } from '@/hooks/useCare';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import { Footprints, Utensils, Weight, Pill, Leaf } from 'lucide-react';

interface TabCuidadoProps {
  horse: Horse;
}

const shoeTypeLabels: Record<ShoeType, string> = {
  barefoot: 'Sin herraje',
  standard_shoe: 'Herraje Estándar',
  sport_shoe: 'Herraje Deportivo',
  therapeutic: 'Herraje Terapéutico',
};

const shoeTypeColors: Record<ShoeType, { color: string; bgColor: string }> = {
  barefoot: { color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  standard_shoe: { color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  sport_shoe: { color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  therapeutic: { color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabCuidado({ horse }: TabCuidadoProps) {
  const { records: farrierRecords, upcoming } = useFarrier(horse.id);
  const nutrition = useNutrition(horse.id);

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Farrier Records */}
        <Card hover={false}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <Footprints className="w-4 h-4 text-gold" />
              </div>
              <SectionLabel>Registros de Herrador</SectionLabel>
            </div>

            {/* Upcoming alert */}
            {upcoming.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/20 mb-4">
                <p className="text-[11px] text-amber-500 font-medium">
                  Próximo herraje: {formatDate(upcoming[0].nextDate)}
                </p>
              </div>
            )}

            {farrierRecords.length > 0 ? (
              <div className="space-y-3">
                {farrierRecords.map((record) => {
                  const sc = shoeTypeColors[record.type];
                  return (
                    <div key={record.id} className="p-3 rounded-lg bg-bg-elevated border border-border">
                      <div className="flex items-start justify-between mb-1.5">
                        <p className="text-[12px] text-text-muted">{formatDate(record.date)}</p>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ backgroundColor: sc.bgColor, color: sc.color }}
                        >
                          {shoeTypeLabels[record.type]}
                        </span>
                      </div>
                      <p className="text-[12px] text-text-secondary">{record.notes}</p>
                      <p className="text-[11px] text-text-muted mt-1.5">Herrador: {record.farrier}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-text-muted py-6 text-center">Sin registros de herrador.</p>
            )}
          </div>
        </Card>

        {/* Nutrition Plan */}
        <Card hover={false}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <Utensils className="w-4 h-4 text-gold" />
              </div>
              <SectionLabel>Plan Nutricional</SectionLabel>
            </div>

            {nutrition ? (
              <div className="space-y-4">
                {/* Body stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-bg-elevated text-center">
                    <div className="flex justify-center mb-1">
                      <Weight className="w-4 h-4 text-text-muted" />
                    </div>
                    <p className="font-serif text-lg text-text-primary font-bold">{nutrition.bodyWeight} kg</p>
                    <p className="text-[10px] text-text-muted">Peso Corporal</p>
                  </div>
                  <div className="p-3 rounded-lg bg-bg-elevated text-center">
                    <div className="flex justify-center mb-1">
                      <Leaf className="w-4 h-4 text-text-muted" />
                    </div>
                    <p className="font-serif text-lg text-text-primary font-bold">{nutrition.bodyConditionScore}/9</p>
                    <p className="text-[10px] text-text-muted">Condición Corporal</p>
                  </div>
                </div>

                {/* Diet details */}
                <div className="space-y-0">
                  <div className="flex justify-between items-baseline py-2.5 border-b border-border">
                    <span className="text-[12px] text-text-muted">Heno</span>
                    <span className="text-[12px] text-text-primary font-medium">{nutrition.hayType}</span>
                  </div>
                  <div className="flex justify-between items-baseline py-2.5 border-b border-border">
                    <span className="text-[12px] text-text-muted">Concentrado</span>
                    <span className="text-[12px] text-text-primary font-medium">{nutrition.concentrate}</span>
                  </div>
                  <div className="flex justify-between items-baseline py-2.5 border-b border-border">
                    <span className="text-[12px] text-text-muted">Ración Diaria</span>
                    <span className="text-[12px] text-text-primary font-medium text-right max-w-[200px]">{nutrition.dailyRation}</span>
                  </div>
                </div>

                {/* Supplements */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Pill className="w-3.5 h-3.5 text-text-muted" />
                    <span className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">Suplementos</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nutrition.supplements.map((supp, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] rounded-full bg-gold/8 text-gold border border-gold/20"
                      >
                        {supp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted py-6 text-center">Sin plan nutricional registrado.</p>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
