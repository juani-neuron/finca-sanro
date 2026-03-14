import { financialRecords } from '@/data/financial';
import { FinancialCategory, FinancialRecord, FinancialType } from '@/types';

interface FinancialFilters {
  type?: FinancialType;
  category?: FinancialCategory;
  horseId?: string;
  year?: number;
  month?: number; // 1-12
}

export function useFinancial(filters?: FinancialFilters) {
  let filtered = [...financialRecords];

  if (filters?.type) {
    filtered = filtered.filter((r) => r.type === filters.type);
  }
  if (filters?.category) {
    filtered = filtered.filter((r) => r.category === filters.category);
  }
  if (filters?.horseId) {
    filtered = filtered.filter((r) => r.horseId === filters.horseId);
  }
  if (filters?.year) {
    filtered = filtered.filter((r) => new Date(r.date).getFullYear() === filters.year);
  }
  if (filters?.month) {
    filtered = filtered.filter((r) => new Date(r.date).getMonth() + 1 === filters.month);
  }

  const sorted = filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const income = filtered
    .filter((r) => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const expenses = filtered
    .filter((r) => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  return {
    records: sorted,
    income,
    expenses,
    balance: income - expenses,
    total: filtered.length,
  };
}

export function useFinancialKPIs() {
  const allRecords = financialRecords;
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const thisMonth = allRecords.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
  });

  const lastMonth = allRecords.filter((r) => {
    const d = new Date(r.date);
    const lm = currentMonth === 1 ? 12 : currentMonth - 1;
    const ly = currentMonth === 1 ? currentYear - 1 : currentYear;
    return d.getMonth() + 1 === lm && d.getFullYear() === ly;
  });

  const sum = (records: FinancialRecord[], type: FinancialType) =>
    records.filter((r) => r.type === type).reduce((s, r) => s + r.amount, 0);

  const monthlyIncome = sum(thisMonth, 'income');
  const monthlyExpenses = sum(thisMonth, 'expense');
  const lastMonthIncome = sum(lastMonth, 'income');
  const lastMonthExpenses = sum(lastMonth, 'expense');

  const totalIncome = sum(allRecords, 'income');
  const totalExpenses = sum(allRecords, 'expense');

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyBalance: monthlyIncome - monthlyExpenses,
    lastMonthIncome,
    lastMonthExpenses,
    incomeChange: lastMonthIncome > 0
      ? ((monthlyIncome - lastMonthIncome) / lastMonthIncome) * 100
      : 0,
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
  };
}

export function useFinancialRecord(id: string): FinancialRecord | undefined {
  return financialRecords.find((r) => r.id === id);
}
