'use client';

import { useRouter } from 'next/navigation';
import type { Horse } from '@/types';
import { HorseCard } from '@/components/ui/horse-card';

interface HorseGridProps {
  horses: Horse[];
}

export function HorseGrid({ horses }: HorseGridProps) {
  const router = useRouter();

  if (horses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-text-secondary">No se encontraron caballos</p>
        <p className="text-xs text-text-muted mt-1">Intenta ajustar los filtros</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {horses.map((horse) => (
        <HorseCard
          key={horse.id}
          horse={horse}
          onClick={() => router.push(`/caballos/${horse.id}`)}
        />
      ))}
    </div>
  );
}
