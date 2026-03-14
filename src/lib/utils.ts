import type { HorseStatus, CalendarEventType } from '@/types';

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
}

const statusMap: Record<HorseStatus, StatusConfig> = {
  active_breeding: { label: 'Reproducción', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  training: { label: 'Entrenamiento', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  resting: { label: 'Descanso', color: '#9CA3AF', bgColor: 'rgba(156, 163, 175, 0.12)' },
  show_prep: { label: 'Prep. Exhibición', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  vet_treatment: { label: 'Tratamiento Vet.', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  pregnant: { label: 'Gestante', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  for_sale: { label: 'En Venta', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  foal: { label: 'Potro', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  retired: { label: 'Retirado', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.12)' },
};

export function getStatusConfig(status: HorseStatus): StatusConfig {
  return statusMap[status];
}

export interface EventTypeConfig {
  label: string;
  color: string;
  bgColor: string;
}

const eventTypeMap: Record<CalendarEventType, EventTypeConfig> = {
  training: { label: 'Entrenamiento', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  vet: { label: 'Veterinario', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  farrier: { label: 'Herrador', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  breeding: { label: 'Reproducción', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  competition: { label: 'Competencia', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  keuring: { label: 'Keuring', color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  vaccination: { label: 'Vacunación', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  other: { label: 'Otro', color: '#9CA3AF', bgColor: 'rgba(156, 163, 175, 0.12)' },
};

export function getEventTypeConfig(type: CalendarEventType): EventTypeConfig {
  return eventTypeMap[type];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
