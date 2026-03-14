'use client';

import { motion } from 'framer-motion';
import { CalendarEvent } from '@/types';
import { getEventTypeConfig } from '@/lib/utils';
import { useHorse } from '@/hooks/useHorses';

const DAYS_ES_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function EventCard({
  event,
  onSelect,
  isSelected,
}: {
  event: CalendarEvent;
  onSelect: (e: CalendarEvent) => void;
  isSelected: boolean;
}) {
  const config = getEventTypeConfig(event.type);
  const firstHorse = useHorse(event.horseIds[0]);

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(event)}
      className={`w-full text-left p-2.5 rounded-lg border transition-all ${
        isSelected
          ? 'border-gold bg-gold-glow'
          : 'border-border bg-bg-elevated hover:border-border-light'
      } ${event.status === 'overdue' ? 'border-red/30' : ''}`}
    >
      <div className="flex items-start gap-2">
        <div
          className="w-1 h-full min-h-[32px] rounded-full flex-shrink-0"
          style={{ backgroundColor: config.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-text-primary truncate">{event.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: config.bgColor, color: config.color }}
            >
              {config.label}
            </span>
            {firstHorse && (
              <span className="text-[10px] text-text-muted truncate">
                {firstHorse.name}
                {event.horseIds.length > 1 && ` +${event.horseIds.length - 1}`}
              </span>
            )}
          </div>
          {event.status === 'overdue' && (
            <span className="text-[10px] text-red mt-1 inline-block">Vencido</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

interface WeekViewProps {
  weekStart: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  selectedEventId?: string | null;
}

export function WeekView({ weekStart, events, onSelectEvent, selectedEventId }: WeekViewProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="space-y-2">
      {days.map((day, i) => {
        const dayEvents = getEventsForDay(day);
        const isToday = day.getTime() === today.getTime();
        const dayStr = day.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });

        return (
          <div
            key={i}
            className={`rounded-lg p-3 ${
              isToday ? 'bg-gold-glow border border-gold-border' : 'bg-bg-card border border-border'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isToday ? 'text-gold' : 'text-text-muted'
                }`}
              >
                {DAYS_ES_FULL[i]}
              </span>
              <span
                className={`text-xs ${isToday ? 'text-gold font-medium' : 'text-text-muted'}`}
              >
                {dayStr}
              </span>
              {isToday && (
                <span className="text-[9px] bg-gold text-bg px-1.5 py-0.5 rounded-full font-semibold">
                  HOY
                </span>
              )}
              <span className="text-[10px] text-text-muted ml-auto">
                {dayEvents.length > 0 ? `${dayEvents.length} evento${dayEvents.length > 1 ? 's' : ''}` : ''}
              </span>
            </div>
            {dayEvents.length === 0 ? (
              <p className="text-[11px] text-text-muted pl-1">Sin eventos</p>
            ) : (
              <div className="space-y-1.5">
                {dayEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onSelect={onSelectEvent}
                    isSelected={evt.id === selectedEventId}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
