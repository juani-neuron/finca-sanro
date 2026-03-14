'use client';

import { useState } from 'react';
import { useStaff } from '@/hooks/useStaff';
import { useHorses } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { StaffDetail } from './staff-detail';
import { StaffMember, StaffRole } from '@/types';
import {
  Mail,
  Phone,
  ChevronRight,
} from 'lucide-react';

const roleConfig: Record<StaffRole, { label: string; color: string; bgColor: string; icon: string }> = {
  trainer: { label: 'Entrenador', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)', icon: '🏇' },
  caretaker: { label: 'Caballerizo', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)', icon: '🐴' },
  vet: { label: 'Veterinario', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)', icon: '⚕️' },
  farrier: { label: 'Herrador', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)', icon: '🔨' },
  admin: { label: 'Administrador', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)', icon: '📋' },
};

function StaffCard({ member, onSelect }: { member: StaffMember; onSelect: (m: StaffMember) => void }) {
  const { horses } = useHorses();
  const cfg = roleConfig[member.role];
  const assignedNames = member.assignedHorses
    .map((id) => horses.find((h) => h.id === id)?.name)
    .filter(Boolean);

  return (
    <Card onClick={() => onSelect(member)}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: cfg.bgColor }}
            >
              {cfg.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-primary">{member.name}</h3>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1"
                style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                {cfg.label}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted" />
        </div>

        {/* Contact */}
        <div className="space-y-1.5 mb-4">
          {member.email && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Mail className="w-3.5 h-3.5 text-text-muted" />
              <span className="truncate">{member.email}</span>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Phone className="w-3.5 h-3.5 text-text-muted" />
              {member.phone}
            </div>
          )}
        </div>

        {/* Status + External */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: member.isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              color: member.isActive ? '#10B981' : '#EF4444',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: member.isActive ? '#10B981' : '#EF4444' }}
            />
            {member.isActive ? 'Activo' : 'Inactivo'}
          </span>
          {member.isExternal && (
            <span className="text-[10px] font-medium text-text-muted border border-border rounded-full px-2 py-0.5">
              Externo
            </span>
          )}
        </div>

        {/* Assigned horses */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
            Caballos asignados ({assignedNames.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {assignedNames.slice(0, 4).map((name) => (
              <span
                key={name}
                className="text-[10px] font-serif text-gold bg-gold-glow rounded px-1.5 py-0.5"
              >
                {name}
              </span>
            ))}
            {assignedNames.length > 4 && (
              <span className="text-[10px] text-text-muted">
                +{assignedNames.length - 4} más
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function StaffGrid() {
  const { staff } = useStaff();
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  return (
    <div>
      <SectionLabel className="mb-4">Equipo de Trabajo</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {staff.map((member) => (
          <StaffCard
            key={member.id}
            member={member}
            onSelect={setSelectedMember}
          />
        ))}
      </div>

      {selectedMember && (
        <StaffDetail
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
