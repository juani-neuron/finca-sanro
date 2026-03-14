import { feedProducts, feedPurchases, feedInventory, feedPlans } from '@/data/feed';
import { FeedProduct, FeedInventory, FeedStockStatus } from '@/types';

export function getProduct(productId: string): FeedProduct | undefined {
  return feedProducts.find((p) => p.id === productId);
}

export function getStockStatus(inv: FeedInventory): FeedStockStatus {
  const daysLeft = inv.dailyConsumption > 0 ? inv.currentStock / inv.dailyConsumption : Infinity;
  if (inv.currentStock <= 0) return 'out';
  if (daysLeft <= 5) return 'critical';
  if (inv.currentStock <= inv.minimumStock) return 'low';
  return 'ok';
}

export function useFeedInventory() {
  const inventory = feedInventory.map((inv) => {
    const product = getProduct(inv.productId);
    const daysLeft = inv.dailyConsumption > 0 ? Math.floor(inv.currentStock / inv.dailyConsumption) : Infinity;
    const status = getStockStatus(inv);
    const dailyCost = inv.dailyConsumption * inv.lastPurchasePrice;

    return {
      ...inv,
      product,
      daysLeft,
      status,
      dailyCost,
    };
  });

  const totalDailyCost = inventory.reduce((sum, i) => sum + i.dailyCost, 0);
  const totalMonthyCost = totalDailyCost * 30;
  const lowStockCount = inventory.filter((i) => i.status === 'low' || i.status === 'critical').length;
  const avgDaysLeft = Math.round(
    inventory.reduce((sum, i) => sum + (i.daysLeft === Infinity ? 0 : i.daysLeft), 0) /
      inventory.filter((i) => i.daysLeft !== Infinity).length
  );

  return {
    inventory,
    totalDailyCost,
    totalMonthyCost,
    lowStockCount,
    avgDaysLeft,
    totalProducts: inventory.length,
  };
}

export function useFeedPurchases(productId?: string) {
  let purchases = [...feedPurchases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (productId) {
    purchases = purchases.filter((p) => p.productId === productId);
  }

  const totalSpent = purchases.reduce((sum, p) => sum + p.totalPrice, 0);

  return {
    purchases,
    totalSpent,
    total: purchases.length,
  };
}

export function useFeedPlans(horseId?: string) {
  if (horseId) {
    return feedPlans.filter((p) => p.horseId === horseId);
  }
  return feedPlans;
}
