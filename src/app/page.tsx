'use client';

import { WelcomeCard } from '@/components/dashboard/welcome-card';
import { KPIRow } from '@/components/dashboard/kpi-row';
import { CalendarPreview } from '@/components/dashboard/calendar-preview';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { StallionGrid } from '@/components/dashboard/stallion-grid';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <WelcomeCard />

      {/* KPI Cards */}
      <KPIRow />

      {/* Calendar + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarPreview />
        <AlertsPanel />
      </div>

      {/* Stallion Grid */}
      <StallionGrid />
    </div>
  );
}
