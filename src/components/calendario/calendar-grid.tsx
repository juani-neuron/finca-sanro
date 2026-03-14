'use client';

import { motion } from 'framer-motion';
import { CalendarEvent } from '@/types';
import { getEventTypeConfig } from '@/lib/utils';

const DAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface CalendarGridProps {
  year: number;
  month: number; // 1-12
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  selectedEventId?: string | null;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  // Monday = 0, Sunday = 6
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function CalendarGrid({ year, month, events, onSelectEvent, selectedEventId }: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDate = today.getDate();

  // Group events by day
  const eventsByDay: Record<number, CalendarEvent[]> = {};
  events.forEach((evt) => {
    const d = new Date(evt.date + 'T12:00:00');
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(evt);
    }
  });

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad to complete last week
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_ES.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-semibold uppercase tracking-wider text-text-muted py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 border-t border-l border-border">
        {cells.map((day, i) => {
          const dayEvents = day ? eventsByDay[day] || [] : [];
          const isToday = isCurrentMonth && day === todayDate;
          const hasOverdue = dayEvents.some((e) => e.status === 'overdue');

          return (
            <div
              key={i}
              className={`relative border-r border-b border-border min-h-[80px] md:min-h-[100px] p-1.5 transition-colors ${
                day ? 'hover:bg-bg-elevated/50 cursor-default' : 'bg-bg/50'
              }`}
            >
              {day && (
                <>
                  <span
                    className={`inline-flex items-center justify-center text-xs w-6 h-6 rounded-full ${
                      isToday
                        ? 'bg-gold text-bg font-bold'
                        : hasOverdue
                        ? 'text-red font-medium'
                        : 'text-text-secondary'
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.slice(0, 3).map((evt) => {
                      const config = getEventTypeConfig(evt.type);
                      const isSelected = evt.id === selectedEventId;
                      return (
                        <motion.button
                          key={evt.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectEvent(evt)}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] leading-tight truncate transition-all ${
                            isSelected ? 'ring-1 ring-gold' : ''
                          } ${evt.status === 'overdue' ? 'animate-pulse' : ''}`}
                          style={{
                            backgroundColor: config.bgColor,
                            color: config.color,
                          }}
                        >
                          {evt.title.length > 20 ? evt.title.substring(0, 20) + '...' : evt.title}
                        </motion.button>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <p className="text-[9px] text-text-muted px-1">
                        +{dayEvents.length - 3} más
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
