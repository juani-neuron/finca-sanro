'use client';

import { Horse } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';
import { PredicateBadge } from '@/components/ui/predicate-badge';
import { SectionLabel } from '@/components/ui/section-label';
import { useBreeding } from '@/hooks/useBreeding';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HorseProfileHeaderProps {
  horse: Horse;
}

function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function getApprovalLabel(status?: string): string | null {
  switch (status) {
    case 'approved': return 'Aprobado KFPS';
    case 'permanently_approved': return 'Aprobado Permanente';
    case 'limited': return 'Limitado';
    default: return null;
  }
}

export function HorseProfileHeader({ horse }: HorseProfileHeaderProps) {
  const { records: breedingRecords } = useBreeding();

  const age = calculateAge(horse.dateOfBirth);
  const latestKeuring = horse.keuringHistory.length > 0
    ? horse.keuringHistory[horse.keuringHistory.length - 1]
    : null;

  // Compute quick stats based on horse type
  const isStallion = horse.sex === 'stallion';
  const activeMares = isStallion
    ? breedingRecords.filter(b => b.stallionId === horse.id && (b.status === 'serviced' || b.status === 'confirmed_pregnant')).length
    : 0;
  const foalCount = isStallion
    ? breedingRecords.filter(b => b.stallionId === horse.id && b.status === 'foaled').length
    : breedingRecords.filter(b => b.mareId === horse.id && b.status === 'foaled').length;
  const totalBreedings = isStallion
    ? breedingRecords.filter(b => b.stallionId === horse.id).length
    : breedingRecords.filter(b => b.mareId === horse.id).length;
  const fertility = totalBreedings > 0
    ? Math.round((breedingRecords.filter(b =>
        (isStallion ? b.stallionId : b.mareId) === horse.id &&
        (b.status === 'foaled' || b.status === 'confirmed_pregnant')
      ).length / totalBreedings) * 100)
    : 0;

  const sexLabel = horse.sex === 'stallion' ? 'Semental' : horse.sex === 'mare' ? 'Yegua' : 'Castrado';
  const approvalLabel = getApprovalLabel(horse.approvalStatus);

  const quickStats = isStallion
    ? [
        { label: 'Puntuación Keuring', value: latestKeuring?.score ?? '—', unit: '/100' },
        { label: 'Yeguas Activas', value: activeMares },
        { label: 'Potros Nacidos', value: foalCount },
        { label: 'Tasa Fertilidad', value: `${fertility}%` },
        { label: 'Libro Genealógico', value: horse.studbook },
      ]
    : [
        { label: 'Puntuación Keuring', value: latestKeuring?.score ?? '—', unit: '/100' },
        { label: 'Potros', value: foalCount },
        { label: 'Libro Genealógico', value: horse.studbook },
        { label: 'Ubicación', value: horse.location.split('—')[1]?.trim() ?? horse.location },
        { label: 'Color', value: horse.color },
      ];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/caballos"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-gold transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar al inventario
      </Link>

      {/* Header card */}
      <motion.div
        className="relative bg-bg-card border border-border rounded-xl overflow-hidden mb-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-light to-transparent" />

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Photo placeholder */}
              <div className="w-16 h-16 rounded-2xl bg-gold-glow border-2 border-gold-border flex items-center justify-center text-3xl shrink-0">
                {horse.sex === 'stallion' ? '♂' : horse.sex === 'mare' ? '♀' : '⚲'}
              </div>

              <div>
                <h1 className="font-serif text-[28px] font-extrabold text-text-primary leading-tight">
                  {horse.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {horse.predicates.map(p => (
                    <PredicateBadge key={p} text={horse.sportLevel ? `${p} ${horse.sportLevel}` : p} />
                  ))}
                  {approvalLabel && (
                    <PredicateBadge text={approvalLabel} />
                  )}
                  <StatusBadge status={horse.status} />
                </div>
                <div className="text-sm text-text-secondary mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="font-serif font-bold text-text-primary">{horse.sire.name}</span>
                  <span className="text-text-muted">×</span>
                  <span className="font-serif font-bold text-text-primary">{horse.dam.name}</span>
                  <span className="text-text-muted">·</span>
                  <span>{sexLabel}, {age} años</span>
                  <span className="text-text-muted">·</span>
                  <span>KFPS #{horse.kfpsNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pt-5 border-t border-border">
            {quickStats.map(s => (
              <div key={s.label} className="text-center">
                <SectionLabel className="mb-1.5 text-[10px]">{s.label}</SectionLabel>
                <div className="font-serif text-[22px] font-extrabold text-gold leading-tight">
                  {s.value}
                </div>
                {'unit' in s && s.unit && (
                  <span className="text-[11px] text-text-muted">{s.unit}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
