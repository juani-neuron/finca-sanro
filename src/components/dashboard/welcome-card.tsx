'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useCalendar } from '@/hooks/useCalendar';
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
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(
    (e) => e.date === todayStr && e.status === 'scheduled'
  );
  const tasks: CalendarEvent[] = [...overdue, ...todayEvents];

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
          Estas son tus tareas para hoy:
        </p>
        {tasks.length > 0 ? (
          <ul className="space-y-1.5">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-2 text-xs">
                <span>{eventTypeIcons[task.type] || '📋'}</span>
                <span className="text-text-primary truncate">{task.title}</span>
                {task.status === 'overdue' && (
                  <span className="text-red-400 text-[10px] font-medium ml-auto flex-shrink-0">
                    Atrasada
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-text-muted">
            No hay tareas programadas para hoy
          </p>
        )}
      </div>
    </Card>
  );
}
