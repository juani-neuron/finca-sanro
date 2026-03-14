'use client';

import { Horse, Discipline, HorseCondition } from '@/types';
import { useTraining } from '@/hooks/useTraining';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, Zap, TrendingUp } from 'lucide-react';

interface TabEntrenamientoProps {
  horse: Horse;
}

const disciplineConfig: Record<Discipline, { label: string; color: string; bgColor: string }> = {
  dressage: { label: 'Dressage', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  driving: { label: 'Enganche', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  show: { label: 'Exhibición', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  ground_work: { label: 'Trabajo en mano', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  conditioning: { label: 'Acondicionamiento', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
};

const conditionConfig: Record<HorseCondition, { label: string; color: string }> = {
  excellent: { label: 'Excelente', color: '#10B981' },
  good: { label: 'Bueno', color: '#3B82F6' },
  fair: { label: 'Regular', color: '#F59E0B' },
  tired: { label: 'Cansado', color: '#F97316' },
  injured: { label: 'Lesionado', color: '#EF4444' },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabEntrenamiento({ horse }: TabEntrenamientoProps) {
  const { sessions, totalMinutes, totalSessions } = useTraining({ horseId: horse.id });

  // Discipline breakdown
  const disciplineBreakdown = sessions.reduce((acc, s) => {
    acc[s.discipline] = (acc[s.discipline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Dumbbell, label: 'Sesiones', value: totalSessions },
          { icon: Clock, label: 'Minutos Totales', value: totalMinutes },
          { icon: Zap, label: 'Duración Prom.', value: `${avgDuration} min` },
          { icon: TrendingUp, label: 'Disciplinas', value: Object.keys(disciplineBreakdown).length },
        ].map((kpi) => (
          <Card key={kpi.label} hover={false}>
            <div className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-1.5 rounded-lg bg-gold-glow">
                  <kpi.icon className="w-4 h-4 text-gold" />
                </div>
              </div>
              <p className="font-serif text-xl text-text-primary font-bold">{kpi.value}</p>
              <p className="text-[10px] text-text-muted mt-0.5">{kpi.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Discipline breakdown */}
      {Object.keys(disciplineBreakdown).length > 0 && (
        <Card hover={false}>
          <div className="p-5">
            <SectionLabel className="mb-3">Distribución por Disciplina</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {Object.entries(disciplineBreakdown).map(([disc, count]) => {
                const config = disciplineConfig[disc as Discipline];
                const pct = Math.round((count / totalSessions) * 100);
                return (
                  <div
                    key={disc}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <span className="text-[12px] font-medium" style={{ color: config.color }}>
                      {config.label}
                    </span>
                    <span className="text-[11px] text-text-muted">{count} ({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Sessions list */}
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <Dumbbell className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>Sesiones de Entrenamiento</SectionLabel>
          </div>

          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((session) => {
                const disc = disciplineConfig[session.discipline];
                const cond = conditionConfig[session.horseCondition];
                return (
                  <motion.div
                    key={session.id}
                    className="p-4 rounded-lg bg-bg-elevated border border-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ backgroundColor: disc.bgColor, color: disc.color }}
                        >
                          {disc.label}
                        </span>
                        <span className="text-[12px] text-text-muted">{formatDate(session.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-muted">{session.duration} min</span>
                        <span className="text-[10px] font-medium" style={{ color: cond.color }}>
                          {cond.label}
                        </span>
                      </div>
                    </div>

                    {/* Exercises */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {session.exercises.map((ex, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] rounded bg-bg/50 text-text-secondary border border-border/50"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>

                    {session.notes && (
                      <p className="text-[12px] text-text-secondary italic">{session.notes}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-muted py-8 text-center">Sin sesiones de entrenamiento registradas.</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
