'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useCalendar } from '@/hooks/useCalendar';
import { useStaff } from '@/hooks/useStaff';
import { CalendarEvent } from '@/types';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

const eventTypeIcons: Record<string, string> = {
  training: '🏇',
  vet: '🩺',
  farrier: '🔧',
  breeding: '💎',
  competition: '🏆',
  keuring: '⭐',
  vaccination: '💉',
  other: '📋',
};

export function WelcomeCard() {
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const { events, overdue } = useCalendar();
  const { staff } = useStaff();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(
    (e) => e.date === todayStr && e.status === 'scheduled'
  );
  const tasks: CalendarEvent[] = [...overdue, ...todayEvents];

  const [sentReminders, setSentReminders] = useState<Set<string>>(new Set());

  const getStaffName = (staffId?: string) => {
    if (!staffId) return 'Sin asignar';
    const member = staff.find((m) => m.id === staffId);
    return member ? member.name : 'Sin asignar';
  };

  const handleSendReminder = (taskId: string) => {
    setSentReminders((prev) => new Set(prev).add(taskId));
  };

  return (
    <Card hover={false}>
      <div className="p-5 flex items-center gap-5">
        <div className="flex-shrink-0">
          <Image
            src="/logo.avif"
            alt="Finca Sanro"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-secondary">{greeting},</p>
          <h2 className="text-xl font-semibold text-text-primary mt-0.5">Jonathan</h2>
          <p className="text-sm text-text-muted mt-1">
            Bienvenido a Finca Sanro — que tengas un excelente día.
          </p>
          <p className="text-xs text-text-muted mt-1 capitalize">{today}</p>
        </div>
      </div>

      <div className="px-5 pb-5 border-t border-border-subtle pt-3 mt-1">
        <p className="text-xs font-medium text-text-secondary mb-2">
          Tu equipo tiene estas tareas pendientes:
        </p>
        {tasks.length > 0 ? (
          <ul className="space-y-2.5">
            {tasks.map((task) => {
              const staffName = getStaffName(task.staffId);
              const isSent = sentReminders.has(task.id);

              return (
                <li key={task.id} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5">{eventTypeIcons[task.type] || '📋'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-text-primary truncate">{task.title}</span>
                      {task.status === 'overdue' && (
                        <span className="text-red-400 text-[10px] font-medium flex-shrink-0">
                          Atrasada
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <span className="text-text-muted text-[11px] truncate">
                        Encargado: {staffName}
                      </span>
                      <button
                        onClick={() => handleSendReminder(task.id)}
                        disabled={isSent}
                        className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded transition-all duration-300 ${
                          isSent
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                            : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 cursor-pointer'
                        }`}
                      >
                        {isSent ? 'Enviado ✓' : 'Manda reminder'}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-text-muted">
            No hay tareas pendientes para hoy
          </p>
        )}
      </div>
    </Card>
  );
}
