'use client';

import { motion } from 'framer-motion';
import { UserManagement } from '@/components/configuracion/user-management';
import { GeneralSettings } from '@/components/configuracion/general-settings';
import { GoldDivider } from '@/components/ui/gold-divider';

export default function ConfiguracionPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Configuración</h1>
        <p className="text-sm text-text-secondary mt-1">
          Ajustes del sistema y gestión de usuarios
        </p>
      </div>

      <UserManagement />

      <GoldDivider />

      <GeneralSettings />
    </motion.div>
  );
}
