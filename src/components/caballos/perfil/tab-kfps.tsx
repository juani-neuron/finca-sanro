'use client';

import { Horse } from '@/types';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import { Award, Ruler, Activity } from 'lucide-react';

interface TabKFPSProps {
  horse: Horse;
}

function ScoreBar({ label, score, max = 9 }: { label: string; score: number; max?: number }) {
  const pct = ((score - 4) / (max - 4)) * 100; // scale 4-9
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-[12px] text-text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-bg-elevated rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[13px] text-text-primary font-serif font-bold w-8 text-right">{score}</span>
    </div>
  );
}

function GaitRow({ label, eval: ev }: { label: string; eval: { suspension: number; kneeElevation: number; power: number; elasticity: number; regularity: number } }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <p className="text-[12px] text-gold uppercase tracking-wider font-semibold mb-2">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {[
          { l: 'Suspensión', v: ev.suspension },
          { l: 'Elevación', v: ev.kneeElevation },
          { l: 'Potencia', v: ev.power },
          { l: 'Elasticidad', v: ev.elasticity },
          { l: 'Regularidad', v: ev.regularity },
        ].map((item) => (
          <div key={item.l} className="text-center">
            <p className="font-serif text-lg text-text-primary font-bold">{item.v}</p>
            <p className="text-[10px] text-text-muted">{item.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TabKFPS({ horse }: TabKFPSProps) {
  const hasKeuring = horse.keuringHistory.length > 0;
  const hasMorphology = !!horse.morphology;
  const hasMovement = !!horse.movementEval;

  const approvalLabel: Record<string, string> = {
    approved: 'Aprobado',
    permanently_approved: 'Aprobado Permanente',
    limited: 'Limitado',
    none: 'Sin aprobación',
  };

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Keuring History */}
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <Award className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>Historial de Keuring</SectionLabel>
          </div>

          {/* Approval Status */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-bg-elevated">
            <span className="text-[12px] text-text-muted">Estado de Aprobación</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              horse.approvalStatus === 'permanently_approved'
                ? 'bg-emerald/12 text-emerald'
                : horse.approvalStatus === 'approved'
                  ? 'bg-gold/12 text-gold'
                  : 'bg-white/8 text-text-muted'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                horse.approvalStatus === 'permanently_approved'
                  ? 'bg-emerald'
                  : horse.approvalStatus === 'approved'
                    ? 'bg-gold'
                    : 'bg-text-muted'
              }`} />
              {approvalLabel[horse.approvalStatus || 'none']}
            </span>
            <span className="text-[12px] text-text-muted ml-auto">Libro: <span className="text-text-primary">{horse.studbook}</span></span>
          </div>

          {hasKeuring ? (
            <div className="space-y-3">
              {horse.keuringHistory.map((k, i) => (
                <div key={i} className="p-4 rounded-lg bg-bg-elevated border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[13px] text-text-primary font-medium">{k.location}</p>
                      <p className="text-[11px] text-text-muted">{k.year} · Juez: {k.judge}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-2xl text-gold font-bold">{k.score}</p>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-gold/30 text-gold rounded-full">
                        {k.premium}
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-text-secondary">{k.comments}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted py-4 text-center">Sin historial de keuring registrado.</p>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Morphology */}
        <Card hover={false}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <Ruler className="w-4 h-4 text-gold" />
              </div>
              <SectionLabel>Evaluación Morfológica</SectionLabel>
            </div>

            {hasMorphology ? (
              <>
                <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-lg bg-bg-elevated">
                  <div className="text-center">
                    <p className="font-serif text-lg text-text-primary font-bold">{horse.morphology!.heightWithers}</p>
                    <p className="text-[10px] text-text-muted">Alzada (cm)</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-lg text-text-primary font-bold">{horse.morphology!.bodyLength}</p>
                    <p className="text-[10px] text-text-muted">Largo (cm)</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-lg text-text-primary font-bold">{horse.morphology!.cannonCircumference}</p>
                    <p className="text-[10px] text-text-muted">Caña (cm)</p>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <ScoreBar label="Cabeza" score={horse.morphology!.scores.head} />
                  <ScoreBar label="Cuello" score={horse.morphology!.scores.neck} />
                  <ScoreBar label="Espalda (hombro)" score={horse.morphology!.scores.shoulder} />
                  <ScoreBar label="Dorso" score={horse.morphology!.scores.back} />
                  <ScoreBar label="Lomo" score={horse.morphology!.scores.loin} />
                  <ScoreBar label="Grupa" score={horse.morphology!.scores.croup} />
                  <ScoreBar label="Aplomos Ant." score={horse.morphology!.scores.forelegs} />
                  <ScoreBar label="Aplomos Post." score={horse.morphology!.scores.hindlegs} />
                  <ScoreBar label="Cascos" score={horse.morphology!.scores.hooves} />
                  <ScoreBar label="Balance" score={horse.morphology!.scores.balance} />
                </div>
              </>
            ) : (
              <p className="text-sm text-text-muted py-4 text-center">Sin evaluación morfológica registrada.</p>
            )}
          </div>
        </Card>

        {/* Movement Evaluation */}
        <Card hover={false}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <Activity className="w-4 h-4 text-gold" />
              </div>
              <SectionLabel>Evaluación de Movimiento</SectionLabel>
            </div>

            {hasMovement ? (
              <div>
                <GaitRow label="Paso" eval={horse.movementEval!.walk} />
                <GaitRow label="Trote" eval={horse.movementEval!.trot} />
                <GaitRow label="Galope" eval={horse.movementEval!.canter} />
              </div>
            ) : (
              <p className="text-sm text-text-muted py-4 text-center">Sin evaluación de movimiento registrada.</p>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
