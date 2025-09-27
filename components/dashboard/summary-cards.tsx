'use client';

import { Card as CardPrimitive, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';

const valueCards = [
  {
    key: 'realized',
    label: 'Realized Value',
    icon: 'savings'
  },
  {
    key: 'potential',
    label: 'Potential Value',
    icon: 'toll'
  }
] as const;

const roiStyles = {
  positive: {
    card: 'border border-emerald-200 bg-emerald-50 text-emerald-900',
    label: 'text-emerald-700',
    icon: 'text-emerald-600',
    value: 'text-emerald-900'
  },
  negative: {
    card: 'border border-red-200 bg-red-50 text-red-900',
    label: 'text-red-700',
    icon: 'text-red-600',
    value: 'text-red-900'
  },
  neutral: {
    card: 'border border-amber-200 bg-amber-50 text-amber-900',
    label: 'text-amber-700',
    icon: 'text-amber-600',
    value: 'text-amber-900'
  }
} as const;

export function SummaryCards() {
  const { summary } = useJuiceState();
  const { settings } = useSettings();
  const { totals } = summary;

  const roiTone = totals.netRoi > 0 ? 'positive' : totals.netRoi < 0 ? 'negative' : 'neutral';
  const toneStyles = roiStyles[roiTone];

  return (
    <div className="space-y-4">
      <CardPrimitive className={toneStyles.card}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className={cn('text-sm text-muted-foreground', toneStyles.label)}>ROI</CardTitle>
          <span
            aria-hidden
            className={cn('material-symbols-outlined text-lg text-primary', toneStyles.icon)}
          >
            contract_edit
          </span>
        </CardHeader>
        <CardContent>
          <p className={cn('text-2xl font-semibold', toneStyles.value)}>
            {formatCurrency(totals.netRoi, settings.currency)}
          </p>
        </CardContent>
      </CardPrimitive>

      <div className="grid gap-4 sm:grid-cols-2">
        {valueCards.map(item => (
          <CardPrimitive key={item.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
              <span aria-hidden className="material-symbols-outlined text-lg text-primary">{item.icon}</span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {formatCurrency(totals[item.key], settings.currency)}
              </p>
            </CardContent>
          </CardPrimitive>
        ))}
      </div>
    </div>
  );
}
