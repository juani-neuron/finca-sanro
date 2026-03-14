'use client';

import { useFinancial } from '@/hooks/useFinancial';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function RevenueChart() {
  const { records } = useFinancial();

  // Aggregate by month
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  records.forEach((r) => {
    const d = new Date(r.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyData[key]) monthlyData[key] = { income: 0, expenses: 0 };
    if (r.type === 'income') monthlyData[key].income += r.amount;
    else monthlyData[key].expenses += r.amount;
  });

  const chartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, data]) => {
      const [, month] = key.split('-');
      return {
        name: monthNames[parseInt(month) - 1],
        Ingresos: data.income,
        Gastos: data.expenses,
      };
    });

  return (
    <div>
      <SectionLabel className="mb-4">Ingresos vs Gastos Mensuales</SectionLabel>
      <Card hover={false}>
        <div className="p-5">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    color: '#FAFAFA',
                    fontSize: 12,
                  }}
                  formatter={(value) =>
                    new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                      minimumFractionDigits: 0,
                    }).format(Number(value))
                  }
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: '#9CA3AF' }}
                />
                <Bar dataKey="Ingresos" fill="#C8A04A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Gastos" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
