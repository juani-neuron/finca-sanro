import { trainingSessions } from '@/data/training';
import { Discipline, TrainingSession } from '@/types';

interface TrainingFilters {
  horseId?: string;
  trainerId?: string;
  discipline?: Discipline;
}

export function useTraining(filters?: TrainingFilters) {
  let filtered = [...trainingSessions];

  if (filters?.horseId) {
    filtered = filtered.filter((s) => s.horseId === filters.horseId);
  }
  if (filters?.trainerId) {
    filtered = filtered.filter((s) => s.trainerId === filters.trainerId);
  }
  if (filters?.discipline) {
    filtered = filtered.filter((s) => s.discipline === filters.discipline);
  }

  const sorted = filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalMinutes = filtered.reduce((sum, s) => sum + s.duration, 0);

  return {
    sessions: sorted,
    totalMinutes,
    totalSessions: filtered.length,
  };
}

export function useTrainingSession(id: string): TrainingSession | undefined {
  return trainingSessions.find((s) => s.id === id);
}
