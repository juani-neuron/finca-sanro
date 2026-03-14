'use client';

import { useState } from 'react';
import { Horse, VetRecordType } from '@/types';
import { useVeterinary } from '@/hooks/useVeterinary';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import {
  Syringe, Bug, Stethoscope, Scan, Dna, Scissors, Pill, AlertCircle,
  CalendarClock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TabSaludProps {
  horse: Horse;
}

const typeConfig: Record<VetRecordType, { icon: LucideIcon; label: string; color: string; bgColor: string }> = {
  vaccine: { icon: Syringe, label: 'Vacuna', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  deworming: { icon: Bug, label: 'Desparasitación', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  checkup: { icon: Stethoscope, label: 'Revisión', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  radiograph: { icon: Scan, label: 'Radiografía', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  genetic_test: { icon: Dna, label: 'Genética', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  surgery: { icon: Scissors, label: 'Cirugía', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  treatment: { icon: Pill, label: 'Tratamiento', color: '#F97316', bgColor: 'rgba(249, 115, 22, 0.12)' },
  illness: { icon: AlertCircle, label: 'Enfermedad', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
};

const ALL_TYPES: (VetRecordType | 'all')[] = ['all', 'vaccine', 'deworming', 'checkup', 'radiograph', 'genetic_test', 'treatment', 'surgery', 'illness'];
const typeLabels: Record<string, string> = {
  all: 'Todos',
  vaccine: 'Vacunas',
  deworming: 'Desparasitación',
  checkup: 'Revisiones',
  radiograph: 'Radiografías',
  genetic_test: 'Genéticas',
  treatment: 'Tratamientos',
  surgery: 'Cirugías',
  illness: 'Enfermedades',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabSalud({ horse }: TabSaludProps) {
  const [typeFilter, setTypeFilter] = useState<VetRecordType | 'all'>('all');

  const { records, pendingFollowUps } = useVeterinary({
    horseId: horse.id,
    type: typeFilter === 'all' ? undefined : typeFilter,
  });

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Follow-ups alert */}
      {pendingFollowUps.length > 0 && (
        <Card hover={false}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-amber-500/12">
                <CalendarClock className="w-4 h-4 text-amber-500" />
              </div>
              <SectionLabel>Seguimientos Pendientes</SectionLabel>
            </div>
            <div className="space-y-2">
              {pendingFollowUps.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg bg-bg-elevated text-[12px]">
                  <span className="text-text-secondary">{r.description}</span>
                  <span className="text-amber-500 font-medium">{formatDate(r.nextFollowUp!)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Records */}
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <Stethoscope className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>Historial Veterinario</SectionLabel>
            <span className="ml-auto text-[12px] text-text-muted">{records.length} registros</span>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {ALL_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                  typeFilter === t
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'bg-bg-elevated text-text-muted hover:text-text-secondary border border-transparent'
                }`}
              >
                {typeLabels[t]}
              </button>
            ))}
          </div>

          {/* Records list */}
          {records.length > 0 ? (
            <div className="space-y-2">
              {records.map((record) => {
                const config = typeConfig[record.type];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={record.id}
                    className="p-4 rounded-lg bg-bg-elevated border border-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg shrink-0 mt-0.5"
                        style={{ backgroundColor: config.bgColor }}
                      >
                        <Icon className="w-4 h-4" style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-[13px] text-text-primary font-medium">{record.description}</p>
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                            style={{ backgroundColor: config.bgColor, color: config.color }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-text-muted">
                          <span>{formatDate(record.date)}</span>
                          <span>·</span>
                          <span>{record.vet}</span>
                        </div>
                        {record.results && (
                          <p className="text-[12px] text-text-secondary mt-2 p-2 rounded bg-bg/50">{record.results}</p>
                        )}
                        {record.nextFollowUp && (
                          <p className="text-[11px] text-amber-500 mt-1.5">
                            Próximo seguimiento: {formatDate(record.nextFollowUp)}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-muted py-8 text-center">No hay registros veterinarios{typeFilter !== 'all' ? ` de tipo "${typeLabels[typeFilter]}"` : ''}.</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
