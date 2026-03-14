'use client';

import { useStaff } from '@/hooks/useStaff';
import { MetricCard } from '@/components/ui/metric-card';
import { Users, UserCheck, UserCog, ExternalLink } from 'lucide-react';

export function PersonalKPIs() {
  const { staff, total } = useStaff();
  const active = staff.filter((s) => s.isActive).length;
  const internal = staff.filter((s) => !s.isExternal).length;
  const external = staff.filter((s) => s.isExternal).length;
  const totalAssigned = staff.reduce((sum, s) => sum + s.assignedHorses.length, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Users}
        label="Total Personal"
        value={total}
        sub={`${active} activos`}
      />
      <MetricCard
        icon={UserCheck}
        label="Personal Interno"
        value={internal}
        sub="De planta"
      />
      <MetricCard
        icon={ExternalLink}
        label="Personal Externo"
        value={external}
        sub="Bajo cita o contrato"
      />
      <MetricCard
        icon={UserCog}
        label="Asignaciones"
        value={totalAssigned}
        sub={`${Math.round(totalAssigned / total)} prom. por persona`}
      />
    </div>
  );
}
