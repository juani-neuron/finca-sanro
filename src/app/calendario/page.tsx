'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarGrid } from '@/components/calendario/calendar-grid';
import { WeekView } from '@/components/calendario/week-view';
import { CalendarFilters } from '@/components/calendario/calendar-filters';
import { EventDetail } from '@/components/calendario/event-detail';
import { Card } from '@/components/ui/card';
import { CalendarEvent, CalendarEventType } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  LayoutList,
  AlertTriangle,
} from 'lucide-react';

type ViewMode = 'month' | 'week';

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function CalendarioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 13)); // March 2026
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [filterType, setFilterType] = useState<CalendarEventType | null>(null);
  const [filterHorseId, setFilterHorseId] = useState<string | null>(null);

  const { events, overdue } = useCalendar();

  // Apply local filters
  const filteredEvents = useMemo(() => {
    let filtered = events;
    if (filterType) {
      filtered = filtered.filter((e) => e.type === filterType);
    }
    if (filterHorseId) {
      filtered = filtered.filter((e) => e.horseIds.includes(filterHorseId));
    }
    return filtered;
  }, [events, filterType, filterHorseId]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const weekStart = getWeekStart(currentDate);

  const navigate = (direction: -1 | 1) => {
    const d = new Date(currentDate);
    if (viewMode === 'month') {
      d.setMonth(d.getMonth() + direction);
    } else {
      d.setDate(d.getDate() + direction * 7);
    }
    setCurrentDate(d);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 2, 13));
  };

  const weekEndDate = new Date(weekStart);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  const weekLabel = `${weekStart.getDate()} ${MONTHS_ES[weekStart.getMonth()].substring(0, 3)} — ${weekEndDate.getDate()} ${MONTHS_ES[weekEndDate.getMonth()].substring(0, 3)} ${weekEndDate.getFullYear()}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Calendario</h1>
          <p className="text-sm text-text-secondary mt-1">
            Gestión de eventos, entrenamientos y citas veterinarias
          </p>
        </div>
        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-bg-elevated rounded-lg p-1">
          <button
            onClick={() => setViewMode('month')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'month'
                ? 'bg-gold text-bg'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Mensual
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'week'
                ? 'bg-gold text-bg'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            Semanal
          </button>
        </div>
      </div>

      {/* Overdue alerts */}
      {overdue.length > 0 && (
        <Card hover={false}>
          <div className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red">
                {overdue.length} evento{overdue.length > 1 ? 's' : ''} vencido{overdue.length > 1 ? 's' : ''}
              </p>
              <div className="mt-1 space-y-0.5">
                {overdue.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="text-xs text-text-secondary hover:text-gold transition-colors block"
                  >
                    {evt.title} — {new Date(evt.date + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <CalendarFilters
        activeType={filterType}
        onTypeChange={setFilterType}
        activeHorseId={filterHorseId}
        onHorseChange={setFilterHorseId}
      />

      {/* Navigation + Calendar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Month/Week navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary" />
              </button>
              <h2 className="text-lg font-semibold text-text-primary min-w-[200px] text-center">
                {viewMode === 'month'
                  ? `${MONTHS_ES[month - 1]} ${year}`
                  : weekLabel}
              </h2>
              <button
                onClick={() => navigate(1)}
                className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="text-xs text-gold hover:text-gold-light transition-colors font-medium"
            >
              Hoy
            </button>
          </div>

          {/* Calendar view */}
          {viewMode === 'month' ? (
            <CalendarGrid
              year={year}
              month={month}
              events={filteredEvents}
              onSelectEvent={setSelectedEvent}
              selectedEventId={selectedEvent?.id}
            />
          ) : (
            <WeekView
              weekStart={weekStart}
              events={filteredEvents}
              onSelectEvent={setSelectedEvent}
              selectedEventId={selectedEvent?.id}
            />
          )}
        </div>

        {/* Event detail sidebar (desktop) */}
        <div className="lg:w-72 xl:w-80">
          {selectedEvent ? (
            <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          ) : (
            <div className="bg-bg-card border border-border rounded-xl p-6 text-center">
              <CalendarDays className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Selecciona un evento</p>
              <p className="text-xs text-text-muted mt-1">para ver detalles</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
