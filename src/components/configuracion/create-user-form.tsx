'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface CreateUserFormProps {
  onClose: () => void;
}

export function CreateUserForm({ onClose }: CreateUserFormProps) {
  const [role, setRole] = useState('');

  return (
    <Card hover={false}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-text-primary">Crear Nuevo Usuario</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-elevated transition-colors text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-border transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="juan@fincasanro.mx"
              className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-border transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="+52 442 123 4567"
              className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-border transition-colors"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              Rol
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors"
            >
              <option value="">Seleccionar rol...</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="employee">Empleado</option>
            </select>
          </div>

          {/* Sub-role (only if employee) */}
          {role === 'employee' && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Tipo de Empleado
              </label>
              <select className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors">
                <option value="">Seleccionar tipo...</option>
                <option value="trainer">Entrenador</option>
                <option value="caretaker">Caballerizo</option>
                <option value="vet">Veterinario</option>
              </select>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
              Contraseña Temporal
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold-border transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 bg-gold text-bg text-sm font-medium rounded-lg hover:bg-gold-light transition-colors">
            Crear Usuario
          </button>
        </div>
      </div>
    </Card>
  );
}
