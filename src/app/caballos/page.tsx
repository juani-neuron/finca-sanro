'use client';

import { useState } from 'react';
import { useHorses } from '@/hooks/useHorses';
import { HorseFilters } from '@/components/caballos/horse-filters';
import { HorseGrid } from '@/components/caballos/horse-grid';
import { HorseList } from '@/components/caballos/horse-list';
import type { Sex, HorseStatus } from '@/types';

export default function CaballosPage() {
  const [sexFilter, setSexFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Map "foal" sex filter to status filter
  const effectiveSex = sexFilter === 'foal' ? undefined : (sexFilter as Sex) || undefined;
  const effectiveStatus =
    sexFilter === 'foal'
      ? ('foal' as HorseStatus)
      : (statusFilter as HorseStatus) || undefined;

  const { horses, total } = useHorses({
    sex: effectiveSex,
    status: effectiveStatus,
    search: search || undefined,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Caballos</h1>
          <p className="text-sm text-text-muted mt-0.5">
            {horses.length} de {total} ejemplares
          </p>
        </div>
      </div>

      {/* Filters */}
      <HorseFilters
        sexFilter={sexFilter}
        onSexChange={(s) => {
          setSexFilter(s);
          if (s === 'foal') setStatusFilter('');
        }}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        search={search}
        onSearchChange={setSearch}
        view={view}
        onViewChange={setView}
      />

      {/* Content */}
      {view === 'grid' ? <HorseGrid horses={horses} /> : <HorseList horses={horses} />}
    </div>
  );
}
