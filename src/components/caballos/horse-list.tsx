'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Horse } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';
import { PredicateBadge } from '@/components/ui/predicate-badge';
import { ChevronRight } from 'lucide-react';

interface HorseListProps {
  horses: Horse[];
}

export function HorseList({ horses }: HorseListProps) {
  const router = useRouter();

  if (horses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-text-secondary">No se encontraron caballos</p>
        <p className="text-xs text-text-muted mt-1">Intenta ajustar los filtros</p>
      </div>
    );
  }

  const getAge = (dob: string) => {
    const years = new Date().getFullYear() - new Date(dob).getFullYear();
    return years;
  };

  const getSexLabel = (horse: Horse) => {
    if (horse.status === 'foal') return 'Potro/a';
    return horse.sex === 'stallion' ? 'Semental' : 'Yegua';
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_100px_100px_120px_140px_32px] gap-4 px-4 py-2.5 bg-bg-elevated text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        <span>Caballo</span>
        <span>Tipo</span>
        <span>Edad</span>
        <span>Estado</span>
        <span>Predicados</span>
        <span />
      </div>

      {/* Rows */}
      {horses.map((horse) => (
        <motion.div
          key={horse.id}
          onClick={() => router.push(`/caballos/${horse.id}`)}
          className="grid grid-cols-1 sm:grid-cols-[1fr_100px_100px_120px_140px_32px] gap-2 sm:gap-4 items-center px-4 py-3 border-t border-border cursor-pointer hover:bg-bg-card-hover transition-colors"
          whileHover={{ x: 2 }}
        >
          {/* Name */}
          <div>
            <p className="font-serif text-sm text-text-primary">{horse.name}</p>
            <p className="text-[11px] text-text-muted">{horse.kfpsNumber}</p>
          </div>

          {/* Type */}
          <div className="text-xs text-text-secondary">{getSexLabel(horse)}</div>

          {/* Age */}
          <div className="text-xs text-text-secondary">{getAge(horse.dateOfBirth)} años</div>

          {/* Status */}
          <div>
            <StatusBadge status={horse.status} />
          </div>

          {/* Predicates */}
          <div className="flex flex-wrap gap-1">
            {horse.predicates.map((p) => (
              <PredicateBadge key={p} text={p} />
            ))}
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex justify-end">
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
