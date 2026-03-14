'use client';

import { useFinancial } from '@/hooks/useFinancial';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { FinancialCategory } from '@/types';

const categoryLabels: Record<FinancialCategory, string> = {
  stud_fee: 'Montas',
  semen_sale: 'Venta de Semen',
  foal_sale: 'Venta de Potros',
  horse_sale: 'Venta de Caballos',
  prize: 'Premios',
  feed: 'Alimentación',
  vet: 'Veterinario',
  farrier: 'Herrador',
  training: 'Entrenamiento',
  insurance: 'Seguro',
  facility: 'Instalaciones',
  import: 'Importación',
  other: 'Otros',
};

const categoryColors: Record<FinancialCategory, string> = {
  stud_fee: '#C8A04A',
  semen_sale: '#D4B86A',
  foal_sale: '#10B981',
  horse_sale: '#3B82F6',
  prize: '#8B5CF6',
  feed: '#EF4444',
  vet: '#F59E0B',
  farrier: '#F97316',
  training: '#3B82F6',
  insurance: '#6366F1',
  facility: '#EC4899',
  import: '#14B8A6',
  other: '#9CA3AF',
};

interface CategoryData {
  category: FinancialCategory;
  amount: number;
  percentage: number;
}

export function CategoryBreakdown() {
  const { records } = useFinancial();

  // Group income categories
  const incomeRecords = records.filter((r) => r.type === 'income');
  const expenseRecords = records.filter((r) => r.type === 'expense');

  function aggregate(recs: typeof records): CategoryData[] {
    const totals: Partial<Record<FinancialCategory, number>> = {};
    recs.forEach((r) => {
      totals[r.category] = (totals[r.category] || 0) + r.amount;
    });
    const grand = Object.values(totals).reduce((s, v) => s + v, 0);
    return Object.entries(totals)
      .map(([cat, amt]) => ({
        category: cat as FinancialCategory,
        amount: amt,
        percentage: grand > 0 ? (amt / grand) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  const incomeBreakdown = aggregate(incomeRecords);
  const expenseBreakdown = aggregate(expenseRecords);

  function BreakdownList({ data, title }: { data: CategoryData[]; title: string }) {
    return (
      <Card hover={false}>
        <div className="p-5">
          <h3 className="text-sm font-medium text-text-primary mb-4">{title}</h3>
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: categoryColors[item.category] }}
                    />
                    <span className="text-sm text-text-secondary">
                      {categoryLabels[item.category]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                <div className="ml-[18px]">
                  <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: categoryColors[item.category],
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-text-muted mt-0.5">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <SectionLabel className="mb-4">Desglose por Categoría</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BreakdownList data={incomeBreakdown} title="Ingresos" />
        <BreakdownList data={expenseBreakdown} title="Gastos" />
      </div>
    </div>
  );
}
