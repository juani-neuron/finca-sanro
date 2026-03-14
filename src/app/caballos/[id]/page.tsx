'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useHorse } from '@/hooks/useHorses';
import { HorseProfileHeader } from '@/components/caballos/perfil/horse-profile-header';
import { HorseTabNav, type HorseTab } from '@/components/caballos/perfil/horse-tab-nav';
import { TabGeneral } from '@/components/caballos/perfil/tab-general';
import { TabKFPS } from '@/components/caballos/perfil/tab-kfps';
import { TabSalud } from '@/components/caballos/perfil/tab-salud';
import { TabReproduccion } from '@/components/caballos/perfil/tab-reproduccion';
import { TabEntrenamiento } from '@/components/caballos/perfil/tab-entrenamiento';
import { TabCuidado } from '@/components/caballos/perfil/tab-cuidado';
import { TabFinanciero } from '@/components/caballos/perfil/tab-financiero';
import { TabDocumentos } from '@/components/caballos/perfil/tab-documentos';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function HorseProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const horse = useHorse(id);
  const [activeTab, setActiveTab] = useState<HorseTab>('General');

  if (!horse) {
    return (
      <Card hover={false}>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="p-4 rounded-2xl bg-gold-glow mb-4">
            <AlertTriangle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Caballo no encontrado</h2>
          <p className="text-sm text-text-secondary mb-4">El registro con ID &quot;{id}&quot; no existe.</p>
          <Link
            href="/caballos"
            className="text-sm text-gold hover:text-gold-light transition-colors"
          >
            Regresar al inventario
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <HorseProfileHeader horse={horse} />
      <HorseTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'General' && <TabGeneral horse={horse} />}
      {activeTab === 'KFPS' && <TabKFPS horse={horse} />}
      {activeTab === 'Salud' && <TabSalud horse={horse} />}
      {activeTab === 'Reproducción' && <TabReproduccion horse={horse} />}
      {activeTab === 'Entrenamiento' && <TabEntrenamiento horse={horse} />}
      {activeTab === 'Cuidado' && <TabCuidado horse={horse} />}
      {activeTab === 'Financiero' && <TabFinanciero horse={horse} />}
      {activeTab === 'Documentos' && <TabDocumentos horse={horse} />}
    </div>
  );
}
