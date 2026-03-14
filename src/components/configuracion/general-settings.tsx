'use client';

import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { Building2, Bell, Globe, Shield } from 'lucide-react';

function SettingSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Building2;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card hover={false}>
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-lg bg-gold-glow">
            <Icon className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        </div>
        {children}
      </div>
    </Card>
  );
}

function ToggleRow({ label, description, defaultOn = true }: { label: string; description: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm text-text-primary">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
      <div
        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
          defaultOn ? 'bg-gold' : 'bg-bg-elevated border border-border'
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${
            defaultOn ? 'translate-x-5 bg-bg' : 'translate-x-0.5 bg-text-muted'
          }`}
        />
      </div>
    </div>
  );
}

export function GeneralSettings() {
  return (
    <div>
      <SectionLabel className="mb-4">Configuración General</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Farm Info */}
        <SettingSection icon={Building2} title="Información de la Finca">
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                defaultValue="Finca Sanro"
                className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Ubicación
              </label>
              <input
                type="text"
                defaultValue="Espíritu Santo, Estado de México"
                className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                WhatsApp
              </label>
              <input
                type="text"
                defaultValue="+52 56 1992 5397"
                className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors"
              />
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection icon={Bell} title="Notificaciones">
          <ToggleRow
            label="Alertas veterinarias"
            description="Notificar vacunas y revisiones próximas"
          />
          <ToggleRow
            label="Alertas de herraje"
            description="Recordatorio de próximo herraje programado"
          />
          <ToggleRow
            label="Fechas de parto"
            description="Aviso de fechas esperadas de parto"
          />
          <ToggleRow
            label="Competencias"
            description="Recordatorio de inscripciones y eventos"
            defaultOn={false}
          />
        </SettingSection>

        {/* Regional */}
        <SettingSection icon={Globe} title="Regional">
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Idioma
              </label>
              <select className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors">
                <option>Español (México)</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Moneda
              </label>
              <select className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors">
                <option>MXN — Peso Mexicano</option>
                <option>USD — Dólar</option>
                <option>EUR — Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted mb-1.5">
                Zona Horaria
              </label>
              <select className="w-full bg-bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold-border transition-colors">
                <option>América/Ciudad de México (UTC−6)</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection icon={Shield} title="Seguridad">
          <ToggleRow
            label="Autenticación de dos factores"
            description="Requerir 2FA para todos los administradores"
            defaultOn={false}
          />
          <ToggleRow
            label="Registro de actividad"
            description="Mantener log de todas las acciones del sistema"
          />
          <ToggleRow
            label="Cierre automático de sesión"
            description="Cerrar sesión después de 30 min de inactividad"
          />
        </SettingSection>
      </div>
    </div>
  );
}
