'use client';

import { useCalendar } from '@/hooks/useCalendar';
import { useBreeding } from '@/hooks/useBreeding';
import { useHorses } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { AlertTriangle, Clock, Baby, Syringe } from 'lucide-react';

interface Alert {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
}

export function AlertsPanel() {
  const { overdue } = useCalendar();
  const { active } = useBreeding();
  const { horses } = useHorses();

  const alerts: Alert[] = [];

  // Overdue events
  overdue.forEach((event) => {
    alerts.push({
      id: `overdue-${event.id}`,
      icon: <Clock className="w-4 h-4" />,
      title: 'Evento vencido',
      description: event.title,
      severity: 'critical',
    });
  });

  // Pregnant mares with upcoming foaling
  active
    .filter((r) => r.status === 'confirmed_pregnant' && r.expectedFoalingDate)
    .forEach((record) => {
      const mare = horses.find((h) => h.id === record.mareId);
      const daysUntil = Math.ceil(
        (new Date(record.expectedFoalingDate!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntil <= 90) {
        alerts.push({
          id: `foaling-${record.id}`,
          icon: <Baby className="w-4 h-4" />,
          title: `Parto en ${daysUntil} días`,
          description: mare?.name || 'Yegua desconocida',
          severity: daysUntil <= 30 ? 'critical' : 'warning',
        });
      }
    });

  // Pending pregnancy diagnosis
  active
    .filter((r) => r.status === 'serviced')
    .forEach((record) => {
      const mare = horses.find((h) => h.id === record.mareId);
      alerts.push({
        id: `diag-${record.id}`,
        icon: <Syringe className="w-4 h-4" />,
        title: 'Diagnóstico pendiente',
        description: mare?.name || 'Yegua desconocida',
        severity: 'warning',
      });
    });

  const severityColors = {
    critical: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.25)' },
    warning: { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.25)' },
    info: { bg: 'rgba(59, 130, 246, 0.12)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.25)' },
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <SectionLabel>Alertas</SectionLabel>
        {alerts.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-bg text-red text-[10px] font-bold">
            {alerts.length}
          </span>
        )}
      </div>
      <Card hover={false}>
        <div className="divide-y divide-border">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <AlertTriangle className="w-8 h-8 text-text-muted mb-2" />
              <p className="text-sm text-text-secondary">Sin alertas pendientes</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const colors = severityColors[alert.severity];
              return (
                <div key={alert.id} className="flex items-start gap-3 px-4 py-3">
                  <div
                    className="p-1.5 rounded-lg flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {alert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{alert.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{alert.description}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
