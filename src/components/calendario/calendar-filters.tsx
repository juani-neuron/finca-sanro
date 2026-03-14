'use client';

import { CalendarEventType } from '@/types';
import { getEventTypeConfig } from '@/lib/utils';
import { useHorses } from '@/hooks/useHorses';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const eventTypes: CalendarEventType[] = [
  'training',
  'vet',
  'farrier',
  'breeding',
  'competition',
  'keuring',
  'vaccination',
  'other',
];

interface CalendarFiltersProps {
  activeType: CalendarEventType | null;
  onTypeChange: (type: CalendarEventType | null) => void;
  activeHorseId: string | null;
  onHorseChange: (horseId: string | null) => void;
}

export function CalendarFilters({
  activeType,
  onTypeChange,
  activeHorseId,
  onHorseChange,
}: CalendarFiltersProps) {
  const { horses } = useHorses();
  const [horseOpen, setHorseOpen] = useState(false);

  const selectedHorse = activeHorseId ? horses.find((h) => h.id === activeHorseId) : null;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Event type pills */}
      <div className="flex flex-wrap gap-1.5 flex-1">
        <button
          onClick={() => onTypeChange(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeType === null
              ? 'bg-gold text-bg'
              : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
          }`}
        >
          Todos
        </button>
        {eventTypes.map((type) => {
          const config = getEventTypeConfig(type);
          const isActive = activeType === type;
          return (
            <button
              key={type}
              onClick={() => onTypeChange(isActive ? null : type)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
              style={{
                backgroundColor: isActive ? config.bgColor : undefined,
                color: isActive ? config.color : undefined,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Horse filter dropdown */}
      <div className="relative">
        <button
          onClick={() => setHorseOpen(!horseOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-xs text-text-secondary hover:text-text-primary transition-colors min-w-[160px]"
        >
          <span className="truncate">
            {selectedHorse ? selectedHorse.name : 'Todos los caballos'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${horseOpen ? 'rotate-180' : ''}`} />
        </button>
        {horseOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 max-h-60 overflow-y-auto bg-bg-card border border-border rounded-lg shadow-xl z-50">
            <button
              onClick={() => {
                onHorseChange(null);
                setHorseOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-bg-elevated transition-colors ${
                !activeHorseId ? 'text-gold' : 'text-text-secondary'
              }`}
            >
              Todos los caballos
            </button>
            {horses.map((horse) => (
              <button
                key={horse.id}
                onClick={() => {
                  onHorseChange(horse.id);
                  setHorseOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-bg-elevated transition-colors ${
                  activeHorseId === horse.id ? 'text-gold' : 'text-text-secondary'
                }`}
              >
                {horse.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
