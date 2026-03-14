import { competitionRecords } from '@/data/competitions';
import { CompetitionDiscipline, CompetitionRecord } from '@/types';

interface CompetitionFilters {
  horseId?: string;
  discipline?: CompetitionDiscipline;
  year?: number;
}

export function useCompetitions(filters?: CompetitionFilters) {
  let filtered = [...competitionRecords];

  if (filters?.horseId) {
    filtered = filtered.filter((r) => r.horseId === filters.horseId);
  }
  if (filters?.discipline) {
    filtered = filtered.filter((r) => r.discipline === filters.discipline);
  }
  if (filters?.year) {
    filtered = filtered.filter((r) => new Date(r.date).getFullYear() === filters.year);
  }

  const sorted = filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const wins = filtered.filter((r) => r.placement?.includes('1er'));

  return {
    records: sorted,
    wins,
    total: filtered.length,
  };
}

export function useCompetition(id: string): CompetitionRecord | undefined {
  return competitionRecords.find((r) => r.id === id);
}
