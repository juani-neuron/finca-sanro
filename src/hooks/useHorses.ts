import { horses } from '@/data/horses';
import { Horse, HorseStatus, Sex } from '@/types';

interface HorseFilters {
  sex?: Sex;
  status?: HorseStatus;
  search?: string;
  predicate?: string;
}

export function useHorses(filters?: HorseFilters) {
  let filtered = [...horses];

  if (filters?.sex) {
    filtered = filtered.filter((h) => h.sex === filters.sex);
  }
  if (filters?.status) {
    filtered = filtered.filter((h) => h.status === filters.status);
  }
  if (filters?.predicate) {
    filtered = filtered.filter((h) => h.predicates.includes(filters.predicate!));
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.kfpsNumber.toLowerCase().includes(q)
    );
  }

  return {
    horses: filtered,
    total: filtered.length,
    stallions: horses.filter((h) => h.sex === 'stallion'),
    mares: horses.filter((h) => h.sex === 'mare' && h.status !== 'foal'),
    foals: horses.filter((h) => h.status === 'foal'),
  };
}

export function useHorse(id: string): Horse | undefined {
  return horses.find((h) => h.id === id);
}
