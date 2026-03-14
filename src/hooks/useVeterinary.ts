import { vetRecords } from '@/data/veterinary';
import { VetRecord, VetRecordType } from '@/types';

interface VetFilters {
  horseId?: string;
  type?: VetRecordType;
}

export function useVeterinary(filters?: VetFilters) {
  let filtered = [...vetRecords];

  if (filters?.horseId) {
    filtered = filtered.filter((r) => r.horseId === filters.horseId);
  }
  if (filters?.type) {
    filtered = filtered.filter((r) => r.type === filters.type);
  }

  const sorted = filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const pendingFollowUps = filtered.filter(
    (r) => r.nextFollowUp && new Date(r.nextFollowUp) >= new Date()
  );

  return {
    records: sorted,
    pendingFollowUps,
    total: filtered.length,
  };
}

export function useVetRecord(id: string): VetRecord | undefined {
  return vetRecords.find((r) => r.id === id);
}
