'use client';

import { useCalendar } from '@/hooks/useCalendar';
import { getEventTypeConfig } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CalendarPreview() {
  const { upcoming } = useCalendar();
  const next5 = upcoming.slice(0, 5);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Calendario</SectionLabel>
        <Link
          href="/calendario"
          className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"
        >
          Ver todo <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <Card hover={false}>
        <div className="divide-y divide-border">
          {next5.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CalendarDays className="w-8 h-8 text-text-muted mb-2" />
              <p className="text-sm text-text-secondary">Sin eventos próximos</p>
            </div>
          ) : (
            next5.map((event) => {
              const config = getEventTypeConfig(event.type);
              return (
                <div key={event.id} className="flex items-start gap-3 px-4 py-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: config.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-muted">{formatDate(event.date)}</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: config.bgColor, color: config.color }}
                      >
                        {config.label}
                      </span>
                    </div>
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
