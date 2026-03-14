'use client';

import { Horse, FinancialCategory } from '@/types';
import { useFinancial } from '@/hooks/useFinancial';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

interface TabFinancieroProps {
  horse: Horse;
}

const categoryLabels: Record<FinancialCategory, string> = {
  stud_fee: 'Monta',
  semen_sale: 'Venta Semen',
  foal_sale: 'Venta Potro',
  horse_sale: 'Venta Caballo',
  prize: 'Premio',
  feed: 'Alimento',
  vet: 'Veterinario',
  farrier: 'Herrador',
  training: 'Entrenamiento',
  insurance: 'Seguro',
  facility: 'Instalaciones',
  import: 'Importación',
  other: 'Otro',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabFinanciero({ horse }: TabFinancieroProps) {
  const { records, income, expenses, balance } = useFinancial({ horseId: horse.id });

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card hover={false}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald/12">
                <TrendingUp className="w-4 h-4 text-emerald" />
              </div>
              <span className="text-[11px] text-text-muted">Ingresos</span>
            </div>
            <p className="font-serif text-xl text-emerald font-bold">{formatCurrency(income)}</p>
          </div>
        </Card>
        <Card hover={false}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-red/12">
                <TrendingDown className="w-4 h-4 text-red" />
              </div>
              <span className="text-[11px] text-text-muted">Gastos</span>
            </div>
            <p className="font-serif text-xl text-red font-bold">{formatCurrency(expenses)}</p>
          </div>
        </Card>
        <Card hover={false}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-gold-glow">
                <DollarSign className="w-4 h-4 text-gold" />
              </div>
              <span className="text-[11px] text-text-muted">Balance</span>
            </div>
            <p className={`font-serif text-xl font-bold ${balance >= 0 ? 'text-emerald' : 'text-red'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </Card>
      </div>

      {/* Value info */}
      {(horse.estimatedValue || horse.monthlyCosts) && (
        <Card hover={false}>
          <div className="p-5">
            <SectionLabel className="mb-3">Valor del Ejemplar</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {horse.estimatedValue && (
                <div className="p-3 rounded-lg bg-bg-elevated text-center">
                  <p className="font-serif text-lg text-gold font-bold">{formatCurrency(horse.estimatedValue)}</p>
                  <p className="text-[10px] text-text-muted">Valor Estimado</p>
                </div>
              )}
              {horse.purchaseCost && (
                <div className="p-3 rounded-lg bg-bg-elevated text-center">
                  <p className="font-serif text-lg text-text-primary font-bold">{formatCurrency(horse.purchaseCost)}</p>
                  <p className="text-[10px] text-text-muted">Costo de Compra</p>
                </div>
              )}
              {horse.monthlyCosts && (
                <div className="p-3 rounded-lg bg-bg-elevated text-center">
                  <p className="font-serif text-lg text-text-primary font-bold">{formatCurrency(horse.monthlyCosts)}</p>
                  <p className="text-[10px] text-text-muted">Costo Mensual</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Records table */}
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <DollarSign className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>Movimientos Financieros</SectionLabel>
            <span className="ml-auto text-[12px] text-text-muted">{records.length} registros</span>
          </div>

          {records.length > 0 ? (
            <div className="space-y-2">
              {records.map((record) => {
                const isIncome = record.type === 'income';
                return (
                  <div key={record.id} className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated border border-border">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isIncome ? 'bg-emerald/12' : 'bg-red/12'}`}>
                      {isIncome
                        ? <ArrowUpRight className="w-4 h-4 text-emerald" />
                        : <ArrowDownRight className="w-4 h-4 text-red" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-text-primary font-medium truncate">{record.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-text-muted">
                        <span>{formatDate(record.date)}</span>
                        <span>·</span>
                        <span>{categoryLabels[record.category]}</span>
                      </div>
                    </div>
                    <p className={`text-[13px] font-serif font-bold shrink-0 ${isIncome ? 'text-emerald' : 'text-red'}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(record.amount)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-muted py-8 text-center">Sin movimientos financieros asociados a este caballo.</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
