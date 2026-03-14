'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CalendarEvent } from '@/types';
import { getEventTypeConfig } from '@/lib/utils';
import { useHorse } from '@/hooks/useHorses';
import { X, Clock, MapPin, User, StickyNote } from 'lucide-react';

function HorseLink({ horseId }: { horseId: string }) {
  const horse = useHorse(horseId);
  if (!horse) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-bg-elevated text-xs text-text-secondary">
      <span className="font-serif text-gold">{horse.name}</span>
    </span>
  );
}

interface EventDetailProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

export function EventDetail({ event, onClose }: EventDetailProps) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* Gold top accent */}
          <div
            className="h-[2px] w-full"
            style={{
              background: `linear-gradient(to right, ${getEventTypeConfig(event.type).color}, transparent)`,
            }}
          />
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium mb-2"
                  style={{
                    backgroundColor: getEventTypeConfig(event.type).bgColor,
                    color: getEventTypeConfig(event.type).color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: getEventTypeConfig(event.type).color }}
                  />
                  {getEventTypeConfig(event.type).label}
                </span>
                <h3 className="text-sm font-semibold text-text-primary">{event.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-bg-elevated transition-colors"
              >
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-3.5 h-3.5 text-text-muted" />
                {new Date(event.date + 'T12:00:00').toLocaleDateString('es-MX', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {event.horseIds.length > 0 && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-text-muted mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {event.horseIds.map((id) => (
                      <HorseLink key={id} horseId={id} />
                    ))}
                  </div>
                </div>
              )}

              {event.staffId && (
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <User className="w-3.5 h-3.5 text-text-muted" />
                  {event.staffId.replace('staff-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </div>
              )}

              {event.notes && (
                <div className="flex items-start gap-2">
                  <StickyNote className="w-3.5 h-3.5 text-text-muted mt-0.5" />
                  <p className="text-xs text-text-secondary leading-relaxed">{event.notes}</p>
                </div>
              )}

              {event.isRecurring && (
                <p className="text-[10px] text-gold bg-gold-glow px-2 py-1 rounded-lg inline-block">
                  Evento recurrente
                </p>
              )}

              {event.status === 'overdue' && (
                <p className="text-[10px] text-red bg-red-bg px-2 py-1 rounded-lg inline-block">
                  Vencido — reprogramar
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
