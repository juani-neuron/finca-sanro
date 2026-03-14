'use client';

import { motion } from 'framer-motion';
import { useBreeding } from '@/hooks/useBreeding';
import { useHorse } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { BreedingRecord } from '@/types';
import {
  FileText,
  Search,
  Syringe,
  Stethoscope,
  HeartPulse,
  Baby,
  ChevronRight,
} from 'lucide-react';

const stages = [
  { key: 'solicitud', label: 'Solicitud', icon: FileText, statuses: [] as string[] },
  { key: 'evaluacion', label: 'Evaluación', icon: Search, statuses: [] as string[] },
  { key: 'servicio', label: 'Servicio', icon: Syringe, statuses: ['serviced'] },
  { key: 'diagnostico', label: 'Diagnóstico', icon: Stethoscope, statuses: ['not_pregnant'] },
  { key: 'gestacion', label: 'Gestación', icon: HeartPulse, statuses: ['confirmed_pregnant'] },
  { key: 'parto', label: 'Parto', icon: Baby, statuses: ['foaled'] },
];

function RecordChip({ record }: { record: BreedingRecord }) {
  const stallion = useHorse(record.stallionId);
  const mare = useHorse(record.mareId);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-bg-elevated border border-border text-[11px]"
    >
      <span className="font-serif text-gold truncate">{stallion?.name.split(' ')[0] || '?'}</span>
      <span className="text-text-muted">×</span>
      <span className="text-text-secondary truncate">{mare?.name.split(' ')[0] || '?'}</span>
    </motion.div>
  );
}

export function BreedingPipeline() {
  const { records } = useBreeding();

  const getRecordsForStage = (statuses: string[]) =>
    records.filter((r) => statuses.includes(r.status));

  return (
    <div>
      <SectionLabel className="mb-4">Pipeline de Reproducción</SectionLabel>
      <Card hover={false}>
        <div className="p-4 md:p-6">
          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-start gap-0">
            {stages.map((stage, i) => {
              const stageRecords = getRecordsForStage(stage.statuses);
              const Icon = stage.icon;
              const isActive = stageRecords.length > 0;

              return (
                <div key={stage.key} className="flex items-start flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                        isActive
                          ? 'bg-gold-glow border border-gold-border'
                          : 'bg-bg-elevated border border-border'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-text-muted'}`}
                      />
                    </motion.div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isActive ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full mb-2 ${
                        isActive
                          ? 'bg-gold-muted text-gold font-semibold'
                          : 'bg-bg-elevated text-text-muted'
                      }`}
                    >
                      {stageRecords.length}
                    </span>
                    <div className="flex flex-col gap-1 w-full px-1">
                      {stageRecords.map((r) => (
                        <RecordChip key={r.id} record={r} />
                      ))}
                    </div>
                  </div>
                  {i < stages.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-text-muted mt-4 flex-shrink-0 mx-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical */}
          <div className="flex flex-col gap-3 md:hidden">
            {stages.map((stage) => {
              const stageRecords = getRecordsForStage(stage.statuses);
              const Icon = stage.icon;
              const isActive = stageRecords.length > 0;

              return (
                <div
                  key={stage.key}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isActive ? 'bg-gold-glow border border-gold-border' : 'bg-bg-elevated'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-gold' : 'text-text-muted'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? 'text-text-primary' : 'text-text-muted'
                        }`}
                      >
                        {stage.label}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-gold-muted text-gold font-semibold'
                            : 'bg-bg text-text-muted'
                        }`}
                      >
                        {stageRecords.length}
                      </span>
                    </div>
                    {stageRecords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {stageRecords.map((r) => (
                          <RecordChip key={r.id} record={r} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
