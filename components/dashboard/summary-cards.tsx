'use client';

import { Card as CardPrimitive, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { useSettings } from '@/hooks/use-settings';
import { useFilteredCards } from '@/hooks/use-filtered-cards';

export function SummaryCards() {
  const { settings } = useSettings();
  const { totals: filteredTotals } = useFilteredCards();

  const filteredCaptureRate = filteredTotals.potential === 0
    ? 0
    : Math.min(1, filteredTotals.realized / filteredTotals.potential);

  return (
    <CardPrimitive>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">Overall Progress</CardTitle>
        <span aria-hidden className="text-xs font-medium text-muted-foreground">
          {formatCurrency(filteredTotals.realized, settings.currency)} of {formatCurrency(filteredTotals.potential, settings.currency)} benefits claimed
        </span>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-foreground">
            {formatPercentage(filteredCaptureRate)}
          </span>
          <Progress value={filteredCaptureRate * 100} className="flex-1" />
        </div>
      </CardContent>
    </CardPrimitive>
  );
}
