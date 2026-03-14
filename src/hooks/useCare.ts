import { farrierRecords, nutritionPlans } from '@/data/care';
import { FarrierRecord, NutritionPlan } from '@/types';

export function useFarrier(horseId?: string) {
  const filtered = horseId
    ? farrierRecords.filter((r) => r.horseId === horseId)
    : farrierRecords;

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const upcoming = filtered.filter(
    (r) => new Date(r.nextDate) >= new Date()
  );

  return {
    records: sorted,
    upcoming,
    total: filtered.length,
  };
}

export function useNutrition(horseId: string): NutritionPlan | undefined {
  return nutritionPlans.find((p) => p.horseId === horseId);
}

export function useFarrierRecord(id: string): FarrierRecord | undefined {
  return farrierRecords.find((r) => r.id === id);
}
