'use client';

import { useState } from 'react';
import { useFinancial } from '@/hooks/useFinancial';
import { useHorse } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { FinancialRecord, FinancialType } from '@/types';
import { Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

const categoryLabels: Record<string, string> = {
  stud_fee: 'Monta',
  semen_sale: 'Semen',
  foal_sale: 'Venta Potro',
  horse_sale: 'Venta Caballo',
  prize: 'Premio',
  feed: 'Alimentación',
  vet: 'Veterinario',
  farrier: 'Herrador',
  training: 'Entrenamiento',
  insurance: 'Seguro',
  facility: 'Instalaciones',
  import: 'Importación',
  other: 'Otros',
};

function TransactionRow({ record }: { record: FinancialRecord }) {
  const horse = useHorse(record.horseId || '');
  const isIncome = record.type === 'income';

  return (
    <tr className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="p-1 rounded"
            style={{
              backgroundColor: isIncome ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            }}
          >
            {isIncome ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-red" />
            )}
          </div>
          <div>
            <p className="text-sm text-text-primary truncate max-w-[200px] lg:max-w-none">
              {record.description}
            </p>
            <p className="text-[10px] text-text-muted">{categoryLabels[record.category]}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary hidden sm:table-cell">
        {formatDate(record.date)}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        {horse ? (
          <span className="font-serif text-sm text-text-secondary">{horse.name}</span>
        ) : (
          <span className="text-sm text-text-muted">General</span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <span
          className={`text-sm font-medium ${isIncome ? 'text-emerald' : 'text-red'}`}
        >
          {isIncome ? '+' : '−'}{formatCurrency(record.amount)}
        </span>
      </td>
    </tr>
  );
}

export function TransactionsTable() {
  const { records } = useFinancial();
  const [typeFilter, setTypeFilter] = useState<FinancialType | ''>('');

  const filtered = typeFilter
    ? records.filter((r) => r.type === typeFilter)
    : records;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Movimientos</SectionLabel>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-text-muted" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as FinancialType | '')}
            className="bg-bg-elevated border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none focus:border-gold-border"
          >
            <option value="">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>
        </div>
      </div>

      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Descripción
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Caballo
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <TransactionRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
