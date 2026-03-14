'use client';

import type { Horse } from '@/types';
import { Card } from './card';
import { StatusBadge } from './status-badge';
import { PredicateBadge } from './predicate-badge';
import { MapPin } from 'lucide-react';

interface HorseCardProps {
  horse: Horse;
  onClick?: () => void;
}

export function HorseCard({ horse, onClick }: HorseCardProps) {
  const age = new Date().getFullYear() - new Date(horse.dateOfBirth).getFullYear();

  return (
    <Card onClick={onClick}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-serif text-lg text-text-primary">{horse.name}</h3>
            <p className="text-xs text-text-muted">{horse.kfpsNumber}</p>
          </div>
          <StatusBadge status={horse.status} />
        </div>

        {/* Predicates */}
        {horse.predicates.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {horse.predicates.map((p) => (
              <PredicateBadge key={p} text={p} />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="text-text-muted">Edad</span>
            <p className="text-text-primary">{age} años</p>
          </div>
          <div>
            <span className="text-text-muted">Color</span>
            <p className="text-text-primary">{horse.color}</p>
          </div>
          <div>
            <span className="text-text-muted">Padre</span>
            <p className="text-text-primary font-serif text-xs">{horse.sire.name}</p>
          </div>
          <div>
            <span className="text-text-muted">Madre</span>
            <p className="text-text-primary font-serif text-xs">{horse.dam.name}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1 text-xs text-text-muted pt-3 border-t border-border">
          <MapPin className="w-3 h-3" />
          <span>{horse.location}</span>
        </div>
      </div>
    </Card>
  );
}
