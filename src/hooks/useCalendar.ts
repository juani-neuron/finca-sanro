import { calendarEvents } from '@/data/calendar';
import { CalendarEvent, CalendarEventType, EventStatus } from '@/types';

interface CalendarFilters {
  type?: CalendarEventType;
  status?: EventStatus;
  horseId?: string;
  month?: number; // 1-12
  year?: number;
}

export function useCalendar(filters?: CalendarFilters) {
  let filtered = [...calendarEvents];

  if (filters?.type) {
    filtered = filtered.filter((e) => e.type === filters.type);
  }
  if (filters?.status) {
    filtered = filtered.filter((e) => e.status === filters.status);
  }
  if (filters?.horseId) {
    filtered = filtered.filter((e) => e.horseIds.includes(filters.horseId!));
  }
  if (filters?.month && filters?.year) {
    filtered = filtered.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === filters.month && d.getFullYear() === filters.year;
    });
  }

  const upcoming = filtered
    .filter((e) => e.status === 'scheduled' && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const overdue = filtered.filter((e) => e.status === 'overdue');

  return {
    events: filtered,
    upcoming,
    overdue,
    total: filtered.length,
  };
}

export function useCalendarEvent(id: string): CalendarEvent | undefined {
  return calendarEvents.find((e) => e.id === id);
}
