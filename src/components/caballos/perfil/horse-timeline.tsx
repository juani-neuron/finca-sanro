'use client';

import { Horse } from '@/types';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { useVeterinary } from '@/hooks/useVeterinary';
import { useBreeding } from '@/hooks/useBreeding';
import { useTraining } from '@/hooks/useTraining';
import { motion } from 'framer-motion';
import {
  Syringe, Stethoscope, Dna, Activity,
  Dumbbell, Baby, FlaskConical, Scissors,
  type LucideIcon,
} from 'lucide-react';

interface HorseTimelineProps {
  horse: Horse;
}

interface TimelineEvent {
  date: string;
  text: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const vetTypeIcon: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  vaccine: { icon: Syringe, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  deworming: { icon: FlaskConical, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  genetic_test: { icon: Dna, color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  checkup: { icon: Stethoscope, color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  treatment: { icon: Activity, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  radiograph: { icon: Activity, color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  surgery: { icon: Scissors, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  illness: { icon: Activity, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
};

function formatTimelineDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function HorseTimeline({ horse }: HorseTimelineProps) {
  const { records: vetRecords } = useVeterinary();
  const { records: breedingRecords } = useBreeding();
  const { sessions: trainingSessions } = useTraining();

  // Build events from all data sources
  const events: TimelineEvent[] = [];

  // Vet events for this horse
  vetRecords
    .filter(v => v.horseId === horse.id)
    .forEach(v => {
      const config = vetTypeIcon[v.type] || vetTypeIcon.checkup;
      events.push({
        date: v.date,
        text: v.description,
        icon: config.icon,
        color: config.color,
        bgColor: config.bgColor,
      });
    });

  // Breeding events for this horse
  const isStallion = horse.sex === 'stallion';
  breedingRecords
    .filter(b => isStallion ? b.stallionId === horse.id : b.mareId === horse.id)
    .forEach(b => {
      events.push({
        date: b.serviceDate,
        text: `Servicio reproductivo — ${b.serviceType === 'natural' ? 'Monta natural' : b.serviceType === 'fresh_semen' ? 'Semen fresco' : 'Semen congelado'}`,
        icon: Baby,
        color: '#10B981',
        bgColor: 'rgba(16, 185, 129, 0.12)',
      });
      if (b.actualFoalingDate) {
        events.push({
          date: b.actualFoalingDate,
          text: 'Nacimiento de potro/a exitoso',
          icon: Baby,
          color: '#C8A04A',
          bgColor: 'rgba(200, 160, 74, 0.12)',
        });
      }
    });

  // Recent training sessions (last 3)
  trainingSessions
    .filter(t => t.horseId === horse.id)
    .slice(0, 3)
    .forEach(t => {
      const disciplineLabel: Record<string, string> = {
        dressage: 'Dressage',
        driving: 'Enganche',
        show: 'Presentación',
        ground_work: 'Trabajo en mano',
        conditioning: 'Acondicionamiento',
      };
      events.push({
        date: t.date,
        text: `Entrenamiento ${disciplineLabel[t.discipline] || t.discipline} — ${t.duration} min`,
        icon: Dumbbell,
        color: '#3B82F6',
        bgColor: 'rgba(59, 130, 246, 0.12)',
      });
    });

  // Sort by date descending and limit
  events.sort((a, b) => b.date.localeCompare(a.date));
  const displayEvents = events.slice(0, 8);

  return (
    <Card hover={false}>
      <div className="p-5">
        <SectionLabel className="mb-4">Timeline Reciente</SectionLabel>

        {displayEvents.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">Sin eventos registrados</p>
        ) : (
          <div className="flex flex-col">
            {displayEvents.map((event, i) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={`${event.date}-${i}`}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  {/* Icon column with connector line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: event.bgColor }}
                    >
                      <Icon className="w-4 h-4" style={{ color: event.color }} />
                    </div>
                    {i < displayEvents.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4 min-w-0">
                    <div className="text-[10px] font-semibold text-text-muted tracking-wide">
                      {formatTimelineDate(event.date)}
                    </div>
                    <div className="text-[13px] text-text-secondary mt-0.5 leading-snug">
                      {event.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
