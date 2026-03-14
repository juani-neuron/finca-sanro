'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { CreateUserForm } from './create-user-form';
import { UserPlus, MoreHorizontal } from 'lucide-react';

interface DummyUser {
  id: string;
  name: string;
  email: string;
  role: string;
  subRole?: string;
  isActive: boolean;
  lastLogin: string;
}

const dummyUsers: DummyUser[] = [
  {
    id: 'user-1',
    name: 'Roberto Sánchez',
    email: 'roberto@fincasanro.mx',
    role: 'Super Admin',
    isActive: true,
    lastLogin: '2026-03-13',
  },
  {
    id: 'user-2',
    name: 'Carlos Herrera',
    email: 'carlos.herrera@fincasanro.mx',
    role: 'Empleado',
    subRole: 'Entrenador',
    isActive: true,
    lastLogin: '2026-03-12',
  },
  {
    id: 'user-3',
    name: 'Miguel Ángel Rodríguez',
    email: 'miguel.rodriguez@fincasanro.mx',
    role: 'Empleado',
    subRole: 'Caballerizo',
    isActive: true,
    lastLogin: '2026-03-13',
  },
  {
    id: 'user-4',
    name: 'Dra. Laura García Mendoza',
    email: 'dra.garcia@vetequina.mx',
    role: 'Empleado',
    subRole: 'Veterinario',
    isActive: true,
    lastLogin: '2026-03-11',
  },
  {
    id: 'user-5',
    name: 'Ana María López',
    email: 'ana.lopez@fincasanro.mx',
    role: 'Admin',
    isActive: false,
    lastLogin: '2026-02-15',
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

const roleColors: Record<string, { color: string; bgColor: string }> = {
  'Super Admin': { color: '#C8A04A', bgColor: 'rgba(200, 160, 74, 0.12)' },
  Admin: { color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  Empleado: { color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
};

export function UserManagement() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Gestión de Usuarios</SectionLabel>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold-border rounded-lg text-xs font-medium text-gold hover:bg-gold/20 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <CreateUserForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Rol
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Último Acceso
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Estado
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => {
                const rc = roleColors[user.role] || roleColors.Empleado;
                return (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-text-primary">{user.name}</p>
                        <p className="text-[11px] text-text-muted">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: rc.bgColor, color: rc.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rc.color }} />
                          {user.role}
                        </span>
                        {user.subRole && (
                          <span className="text-[10px] text-text-muted">{user.subRole}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{
                          backgroundColor: user.isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          color: user.isActive ? '#10B981' : '#EF4444',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: user.isActive ? '#10B981' : '#EF4444' }}
                        />
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted hover:text-text-primary">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
