'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

export function WelcomeCard() {
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card hover={false}>
      <div className="p-5 flex items-center gap-5">
        <div className="flex-shrink-0">
          <Image
            src="/logo.avif"
            alt="Finca Sanro"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-secondary">{greeting},</p>
          <h2 className="text-xl font-semibold text-text-primary mt-0.5">Jhonatan</h2>
          <p className="text-sm text-text-muted mt-1">
            Bienvenido a Finca Sanro — que tengas un excelente día.
          </p>
          <p className="text-xs text-text-muted mt-1 capitalize">{today}</p>
        </div>
      </div>
    </Card>
  );
}
