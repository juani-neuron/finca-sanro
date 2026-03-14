'use client';

import { useFeedPurchases } from '@/hooks/useFeed';
import { getProduct } from '@/hooks/useFeed';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function PurchaseHistory() {
  const { purchases } = useFeedPurchases();

  // Group by month
  const grouped: Record<string, typeof purchases> = {};
  purchases.forEach((p) => {
    const d = new Date(p.date);
    const key = d.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  return (
    <div>
      <SectionLabel className="mb-4">Historial de Compras</SectionLabel>
      <div className="space-y-6">
        {Object.entries(grouped).map(([month, items]) => {
          const monthTotal = items.reduce((s, p) => s + p.totalPrice, 0);
          return (
            <div key={month}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-text-primary capitalize">{month}</h3>
                <span className="text-sm font-medium text-gold">{formatCurrency(monthTotal)}</span>
              </div>
              <Card hover={false}>
                <div className="divide-y divide-border">
                  {items.map((purchase) => {
                    const product = getProduct(purchase.productId);
                    return (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 hover:bg-bg-elevated/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gold-glow">
                            <ShoppingCart className="w-4 h-4 text-gold" />
                          </div>
                          <div>
                            <p className="text-sm text-text-primary">
                              {product?.name || purchase.productId}
                            </p>
                            <p className="text-xs text-text-muted">
                              {purchase.quantity} {product?.unit} × {formatCurrency(purchase.unitPrice)} — {purchase.supplier}
                            </p>
                            {purchase.notes && (
                              <p className="text-[10px] text-text-muted mt-0.5 italic">{purchase.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-sm font-medium text-text-primary">{formatCurrency(purchase.totalPrice)}</p>
                          <p className="text-[10px] text-text-muted">{formatDate(purchase.date)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
