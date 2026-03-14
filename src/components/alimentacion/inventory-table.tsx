'use client';

import { useFeedInventory } from '@/hooks/useFeed';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { FeedStockStatus } from '@/types';

const statusConfig: Record<FeedStockStatus, { label: string; color: string; bgColor: string }> = {
  ok: { label: 'Abastecido', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  low: { label: 'Por acabarse', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  critical: { label: 'Crítico', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  out: { label: 'Agotado', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.25)' },
};

const typeLabels: Record<string, string> = {
  alfalfa: 'Forraje',
  hay: 'Forraje',
  concentrate: 'Concentrado',
  supplement: 'Suplemento',
};

export function InventoryTable() {
  const { inventory } = useFeedInventory();

  // Sort: critical/low first, then by days left
  const sorted = [...inventory].sort((a, b) => {
    const priority: Record<FeedStockStatus, number> = { out: 0, critical: 1, low: 2, ok: 3 };
    const pDiff = priority[a.status] - priority[b.status];
    if (pDiff !== 0) return pDiff;
    return a.daysLeft - b.daysLeft;
  });

  return (
    <div>
      <SectionLabel className="mb-4">Inventario Actual</SectionLabel>
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Producto
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden sm:table-cell">
                  Tipo
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Stock
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden md:table-cell">
                  Consumo/Día
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Días Rest.
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden lg:table-cell">
                  Precio Unit.
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted hidden lg:table-cell">
                  Costo/Día
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => {
                const cfg = statusConfig[item.status];
                const product = item.product;
                return (
                  <tr
                    key={item.productId}
                    className="border-b border-border last:border-0 hover:bg-bg-elevated/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-text-primary">
                        {product?.name || item.productId}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary hidden sm:table-cell">
                      {product ? typeLabels[product.type] : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-serif text-sm text-text-primary">
                        {item.currentStock}
                      </span>
                      <span className="text-xs text-text-muted ml-1">{product?.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-text-secondary hidden md:table-cell">
                      {item.dailyConsumption} {product?.unit}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-serif text-sm font-medium ${
                          item.daysLeft <= 5 ? 'text-red' : item.daysLeft <= 10 ? 'text-amber' : 'text-text-primary'
                        }`}
                      >
                        {item.daysLeft === Infinity ? '∞' : item.daysLeft}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-text-secondary hidden lg:table-cell">
                      {formatCurrency(item.lastPurchasePrice)}/{product?.unit}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-text-secondary hidden lg:table-cell">
                      {formatCurrency(item.dailyCost)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
