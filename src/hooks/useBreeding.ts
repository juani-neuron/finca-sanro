import { breedingRecords, semenProduction } from '@/data/breeding';
import { BreedingRecord, BreedingStatus } from '@/types';

interface BreedingFilters {
  stallionId?: string;
  mareId?: string;
  status?: BreedingStatus;
}

export function useBreeding(filters?: BreedingFilters) {
  let filtered = [...breedingRecords];

  if (filters?.stallionId) {
    filtered = filtered.filter((r) => r.stallionId === filters.stallionId);
  }
  if (filters?.mareId) {
    filtered = filtered.filter((r) => r.mareId === filters.mareId);
  }
  if (filters?.status) {
    filtered = filtered.filter((r) => r.status === filters.status);
  }

  const active = filtered.filter(
    (r) => r.status === 'serviced' || r.status === 'confirmed_pregnant'
  );

  return {
    records: filtered,
    active,
    total: filtered.length,
  };
}

export function useSemenProduction(stallionId?: string) {
  const filtered = stallionId
    ? semenProduction.filter((s) => s.stallionId === stallionId)
    : semenProduction;

  const totalDoses = filtered.reduce((sum, s) => sum + s.dosesProduced, 0);
  const totalSold = filtered.reduce((sum, s) => sum + s.dosesSold, 0);

  return {
    production: filtered,
    totalDoses,
    totalSold,
    averageQuality: filtered.length > 0
      ? filtered.filter((s) => s.quality === 'excellent').length / filtered.length
      : 0,
  };
}

export function useBreedingRecord(id: string): BreedingRecord | undefined {
  return breedingRecords.find((r) => r.id === id);
}
