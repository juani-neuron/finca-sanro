import { Card } from './card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  trend?: { value: string; positive: boolean };
}

export function MetricCard({ icon: Icon, label, value, sub, trend }: MetricCardProps) {
  return (
    <Card hover={false}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-gold-glow">
            <Icon className="w-5 h-5 text-gold" />
          </div>
          {trend && (
            <span className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-emerald' : 'text-red'}`}>
              {trend.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value}
            </span>
          )}
        </div>
        <p className="font-serif text-2xl text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary mt-1">{label}</p>
        {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}
