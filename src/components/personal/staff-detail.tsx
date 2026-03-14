'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useHorses } from '@/hooks/useHorses';
import { StaffMember, StaffRole } from '@/types';
import { X, Mail, Phone, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const roleLabels: Record<StaffRole, string> = {
  trainer: 'Entrenador',
  caretaker: 'Caballerizo',
  vet: 'Veterinario',
  farrier: 'Herrador',
  admin: 'Administrador',
};

const dayLabels: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

interface StaffDetailProps {
  member: StaffMember;
  onClose: () => void;
}

export function StaffDetail({ member, onClose }: StaffDetailProps) {
  const { horses } = useHorses();
  const assignedHorses = member.assignedHorses
    .map((id) => horses.find((h) => h.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-card border-l border-border z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-border p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{member.name}</h2>
            <p className="text-sm text-text-secondary">{roleLabels[member.role]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-3">
              Contacto
            </h3>
            <div className="space-y-2">
              {member.email && (
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Mail className="w-4 h-4 text-text-muted flex-shrink-0" />
                  {member.email}
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Phone className="w-4 h-4 text-text-muted flex-shrink-0" />
                  {member.phone}
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <ExternalLink className="w-4 h-4 text-text-muted flex-shrink-0" />
                {member.isExternal ? 'Personal externo' : 'Personal de planta'}
              </div>
            </div>
          </div>

          {/* Schedule */}
          {member.schedule && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-3">
                <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                Horario Semanal
              </h3>
              <div className="bg-bg-elevated rounded-lg border border-border overflow-hidden">
                {Object.entries(member.schedule).map(([day, time]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-text-primary">{dayLabels[day]}</span>
                    <span className={`text-sm ${time === 'Descanso' || time === 'No disponible' ? 'text-text-muted' : 'text-text-secondary'}`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assigned Horses */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-3">
              Caballos Asignados ({assignedHorses.length})
            </h3>
            <div className="space-y-2">
              {assignedHorses.map((horse) => (
                horse && (
                  <Link
                    key={horse.id}
                    href={`/caballos/${horse.id}`}
                    className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg border border-border hover:border-gold-border transition-colors group"
                  >
                    <div>
                      <span className="font-serif text-sm text-text-primary group-hover:text-gold transition-colors">
                        {horse.name}
                      </span>
                      {horse.predicates.length > 0 && (
                        <span className="ml-2 text-[10px] text-gold font-medium uppercase tracking-wider">
                          {horse.predicates.join(' · ')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-text-muted capitalize">
                      {horse.sex === 'stallion' ? 'Semental' : horse.sex === 'mare' ? 'Yegua' : 'Potro'}
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
