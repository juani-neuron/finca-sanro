'use client';

import { Card } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import type { HorseTab } from './horse-tab-nav';

interface TabPlaceholderProps {
  tab: HorseTab;
}

const tabDescriptions: Record<string, string> = {
  'KFPS': 'Registro en libro genealógico, historial de keuring, evaluaciones morfológicas y de movimiento.',
  'Salud': 'Historial veterinario, vacunas, desparasitaciones, pruebas genéticas, radiografías.',
  'Reproducción': 'Servicios activos, yeguas servidas, producción de semen, fertilidad, descendencia.',
  'Entrenamiento': 'Sesiones, progreso, entrenador, programa y disciplinas.',
  'Cuidado': 'Registros de herrador, plan nutricional, condición general.',
  'Financiero': 'Costos asociados, ingresos generados, valor estimado.',
  'Documentos': 'Pasaporte, certificados KFPS, certificados veterinarios, contratos.',
};

export function TabPlaceholder({ tab }: TabPlaceholderProps) {
  return (
    <Card hover={false}>
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="p-3 rounded-xl bg-gold-glow mb-4">
          <Construction className="w-8 h-8 text-gold" />
        </div>
        <p className="text-[15px] text-text-secondary">
          Módulo <span className="text-gold font-bold">{tab}</span> — Se implementará en Fase 5
        </p>
        <p className="text-xs text-text-muted mt-2 max-w-md">
          {tabDescriptions[tab] || 'La estructura y datos están definidos en el plan.'}
        </p>
      </div>
    </Card>
  );
}
