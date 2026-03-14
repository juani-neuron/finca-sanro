'use client';

import { motion } from 'framer-motion';

export type HorseTab = 'General' | 'KFPS' | 'Salud' | 'Reproducción' | 'Entrenamiento' | 'Cuidado' | 'Financiero' | 'Documentos';

const TABS: HorseTab[] = [
  'General', 'KFPS', 'Salud', 'Reproducción',
  'Entrenamiento', 'Cuidado', 'Financiero', 'Documentos',
];

interface HorseTabNavProps {
  activeTab: HorseTab;
  onTabChange: (tab: HorseTab) => void;
}

export function HorseTabNav({ activeTab, onTabChange }: HorseTabNavProps) {
  return (
    <div className="flex border-b border-border mb-5 overflow-x-auto scrollbar-hide">
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative px-4 py-2.5 text-[13px] whitespace-nowrap transition-colors duration-200 ${
            activeTab === tab
              ? 'text-gold font-bold'
              : 'text-text-muted hover:text-text-secondary font-normal'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
              layoutId="activeTab"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
