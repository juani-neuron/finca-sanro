'use client';

import { Horse } from '@/types';
import { PedigreeTree } from './pedigree-tree';
import { HorseTimeline } from './horse-timeline';
import { HorseInfoGrid } from './horse-info-grid';

interface TabGeneralProps {
  horse: Horse;
}

export function TabGeneral({ horse }: TabGeneralProps) {
  return (
    <div className="space-y-5">
      {/* Identification info */}
      <HorseInfoGrid horse={horse} />

      {/* Pedigree + Timeline — 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PedigreeTree horse={horse} />
        <HorseTimeline horse={horse} />
      </div>
    </div>
  );
}
