'use client';

import { Search, LayoutGrid, List } from 'lucide-react';

interface HorseFiltersProps {
  sexFilter: string;
  onSexChange: (sex: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const sexOptions = [
  { value: '', label: 'Todos' },
  { value: 'stallion', label: 'Sementales' },
  { value: 'mare', label: 'Yeguas' },
  { value: 'foal', label: 'Potros' },
];

const statusOptions: { value: string; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'active_breeding', label: 'Reproducción' },
  { value: 'training', label: 'Entrenamiento' },
  { value: 'resting', label: 'Descanso' },
  { value: 'pregnant', label: 'Gestante' },
  { value: 'foal', label: 'Potro' },
  { value: 'show_prep', label: 'Prep. Exhibición' },
  { value: 'vet_treatment', label: 'Tratamiento Vet.' },
  { value: 'for_sale', label: 'En Venta' },
];

export function HorseFilters({
  sexFilter,
  onSexChange,
  statusFilter,
  onStatusChange,
  search,
  onSearchChange,
  view,
  onViewChange,
}: HorseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Sex filter tabs */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        {sexOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSexChange(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              sexFilter === opt.value
                ? 'bg-gold text-bg'
                : 'bg-bg-card text-text-secondary hover:text-text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Status dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="bg-bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none focus:border-gold-border appearance-none cursor-pointer"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Search */}
      <div className="relative flex-1 min-w-0 w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
        <input
          type="text"
          placeholder="Buscar por nombre o KFPS..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-border"
        />
      </div>

      {/* View toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden ml-auto">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-1.5 transition-colors ${
            view === 'grid'
              ? 'bg-gold text-bg'
              : 'bg-bg-card text-text-secondary hover:text-text-primary'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`p-1.5 transition-colors ${
            view === 'list'
              ? 'bg-gold text-bg'
              : 'bg-bg-card text-text-secondary hover:text-text-primary'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
