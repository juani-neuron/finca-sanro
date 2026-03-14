'use client';

import { useRouter } from 'next/navigation';
import { useHorses } from '@/hooks/useHorses';
import { HorseCard } from '@/components/ui/horse-card';
import { SectionLabel } from '@/components/ui/section-label';
import { GoldDivider } from '@/components/ui/gold-divider';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function StallionGrid() {
  const router = useRouter();
  const { stallions } = useHorses();

  return (
    <div>
      <GoldDivider className="mb-6" />
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Sementales KFPS</SectionLabel>
        <Link
          href="/caballos"
          className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"
        >
          Ver todos <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stallions.map((horse) => (
          <HorseCard
            key={horse.id}
            horse={horse}
            onClick={() => router.push(`/caballos/${horse.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
