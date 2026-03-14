'use client';

import { useFeedPlans } from '@/hooks/useFeed';
import { getProduct } from '@/hooks/useFeed';
import { useHorse } from '@/hooks/useHorses';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { FeedPlan } from '@/types';
import { Clock } from 'lucide-react';
import Link from 'next/link';

function PlanCard({ plan }: { plan: FeedPlan }) {
  const horse = useHorse(plan.horseId);

  return (
    <Card hover={false}>
      <div className="p-5">
        <Link href={`/caballos/${plan.horseId}`} className="group">
          <h3 className="font-serif text-base text-text-primary group-hover:text-gold transition-colors mb-1">
            {horse?.name || plan.horseId}
          </h3>
          {horse?.predicates && horse.predicates.length > 0 && (
            <span className="text-[10px] text-gold font-medium uppercase tracking-wider">
              {horse.predicates.join(' · ')}
            </span>
          )}
        </Link>

        <div className="mt-4 space-y-0">
          {plan.items.map((item, idx) => {
            const product = getProduct(item.productId);
            return (
              <div
                key={idx}
                className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">
                    {product?.name || item.productId}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-text-muted flex-shrink-0" />
                    <span className="text-[10px] text-text-muted">{item.schedule}</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gold ml-3 flex-shrink-0">
                  {item.dailyAmount} {item.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export function FeedPlans() {
  const plans = useFeedPlans();

  return (
    <div>
      <SectionLabel className="mb-4">Plan de Alimentación por Caballo</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <PlanCard key={plan.horseId} plan={plan} />
        ))}
      </div>
    </div>
  );
}
