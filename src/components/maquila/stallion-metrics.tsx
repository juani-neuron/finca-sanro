'use client';

import { motion } from 'framer-motion';
import { useBreeding, useSemenProduction } from '@/hooks/useBreeding';
import { useHorses } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { Beaker, TrendingUp } from 'lucide-react';

interface StallionStat {
  id: string;
  name: string;
  totalServices: number;
  pregnant: number;
  foaled: number;
  fertilityRate: number;
  dosesProduced: number;
  dosesSold: number;
  qualityRate: number;
}

export function StallionMetrics() {
  const { stallions } = useHorses();
  const { records } = useBreeding();
  const { production } = useSemenProduction();

  const stats: StallionStat[] = stallions.map((s) => {
    const sRecords = records.filter((r) => r.stallionId === s.id);
    const sProduction = production.filter((p) => p.stallionId === s.id);
    const diagnosable = sRecords.filter((r) => r.pregnancyDiagnosis?.result !== 'pending');
    const positive = diagnosable.filter(
      (r) => r.status === 'confirmed_pregnant' || r.status === 'foaled'
    );

    return {
      id: s.id,
      name: s.name,
      totalServices: sRecords.length,
      pregnant: sRecords.filter((r) => r.status === 'confirmed_pregnant').length,
      foaled: sRecords.filter((r) => r.status === 'foaled').length,
      fertilityRate: diagnosable.length > 0 ? Math.round((positive.length / diagnosable.length) * 100) : 0,
      dosesProduced: sProduction.reduce((sum, p) => sum + p.dosesProduced, 0),
      dosesSold: sProduction.reduce((sum, p) => sum + p.dosesSold, 0),
      qualityRate: sProduction.length > 0
        ? Math.round((sProduction.filter((p) => p.quality === 'excellent').length / sProduction.length) * 100)
        : 0,
    };
  });

  return (
    <div>
      <SectionLabel className="mb-4">Métricas por Semental</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hover={false}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-text-primary">{stat.name}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.fertilityRate >= 80
                        ? 'bg-emerald-bg text-emerald'
                        : stat.fertilityRate >= 50
                        ? 'bg-amber-bg text-amber'
                        : 'bg-red-bg text-red'
                    }`}
                  >
                    {stat.fertilityRate}% fertilidad
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-lg bg-bg-elevated">
                    <p className="font-serif text-xl text-text-primary">{stat.totalServices}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">Servicios</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-bg-elevated">
                    <p className="font-serif text-xl text-emerald">{stat.pregnant}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">Gestantes</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-bg-elevated">
                    <p className="font-serif text-xl text-gold">{stat.foaled}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">Potros</p>
                  </div>
                </div>

                {/* Semen production bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-text-secondary">
                      <Beaker className="w-3.5 h-3.5" />
                      Dosis producidas
                    </span>
                    <span className="text-text-primary font-medium">{stat.dosesProduced}</span>
                  </div>
                  <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${stat.dosesProduced > 0 ? (stat.dosesSold / stat.dosesProduced) * 100 : 0}%`,
                      }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-muted">
                    <span>{stat.dosesSold} vendidas</span>
                    <span>{stat.dosesProduced - stat.dosesSold} en inventario</span>
                  </div>
                </div>

                {/* Quality indicator */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Calidad excelente
                  </span>
                  <span className="text-xs font-semibold text-gold">{stat.qualityRate}%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
