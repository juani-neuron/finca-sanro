'use client';

import { Horse } from '@/types';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HorseInfoGridProps {
  horse: Horse;
}

function InfoRow({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-border last:border-0">
      <span className="text-[12px] text-text-muted">{label}</span>
      <span className="text-[13px] text-text-primary font-medium text-right">{value}</span>
    </div>
  );
}

function calculateAge(dateOfBirth: string): string {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const adjustedYears = months < 0 || (months === 0 && now.getDate() < birth.getDate()) ? years - 1 : years;
  return `${adjustedYears} años`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function HorseInfoGrid({ horse }: HorseInfoGridProps) {
  const sexLabel = horse.sex === 'stallion' ? 'Semental' : horse.sex === 'mare' ? 'Yegua' : 'Castrado';

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Identification */}
      <Card hover={false}>
        <div className="p-5">
          <SectionLabel className="mb-3">Identificación</SectionLabel>
          <InfoRow label="KFPS #" value={horse.kfpsNumber} />
          <InfoRow label="Microchip" value={horse.microchip} />
          <InfoRow label="UELN" value={horse.ueln} />
          <InfoRow label="Fecha de Nacimiento" value={formatDate(horse.dateOfBirth)} />
          <InfoRow label="Edad" value={calculateAge(horse.dateOfBirth)} />
          <InfoRow label="Sexo" value={sexLabel} />
          <InfoRow label="Color" value={horse.color} />
          <InfoRow label="Marcas Blancas" value={horse.whiteMarkings} />
        </div>
      </Card>

      {/* Origin */}
      <Card hover={false}>
        <div className="p-5">
          <SectionLabel className="mb-3">Origen</SectionLabel>
          <InfoRow label="País de Nacimiento" value={horse.countryOfBirth} />
          <InfoRow label="Criador" value={horse.breeder} />
          <InfoRow label="Propietario" value={horse.currentOwner} />
          <InfoRow label="Ubicación" value={horse.location} />
          <InfoRow label="Libro" value={horse.studbook} />
          <InfoRow label="Predicados" value={horse.predicates.length > 0 ? horse.predicates.join(', ') : '—'} />
          {horse.sportLevel && <InfoRow label="Nivel Deportivo" value={horse.sportLevel} />}
        </div>
      </Card>

      {/* Financial */}
      <Card hover={false}>
        <div className="p-5">
          <SectionLabel className="mb-3">Valor y Costos</SectionLabel>
          <InfoRow label="Valor Estimado" value={horse.estimatedValue ? formatCurrency(horse.estimatedValue) : undefined} />
          <InfoRow label="Costo de Compra" value={horse.purchaseCost ? formatCurrency(horse.purchaseCost) : undefined} />
          <InfoRow label="Costos Mensuales" value={horse.monthlyCosts ? formatCurrency(horse.monthlyCosts) : undefined} />
          <InfoRow label="Entrenador" value={horse.assignedTrainer?.replace('staff-', '') || '—'} />
          <InfoRow label="Caballerizo" value={horse.assignedCaretaker?.replace('staff-', '') || '—'} />
          <InfoRow label="Veterinario" value={horse.assignedVet?.replace('staff-', '') || '—'} />
        </div>
      </Card>
    </motion.div>
  );
}
