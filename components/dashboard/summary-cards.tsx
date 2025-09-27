'use client';

import { Card as CardPrimitive, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';

const summaryItems = [
  {
    key: 'realized',
    label: 'Value realized'
  },
  {
    key: 'potential',
    label: 'Annual potential'
  },
  {
    key: 'netRoi',
    label: 'Net ROI'
  }
] as const;

export function SummaryCards() {
  const { summary } = useJuiceState();
  const { settings } = useSettings();
  const { totals, captureRate } = summary;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map(item => (
        <CardPrimitive key={item.key}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(totals[item.key], settings.currency)}</p>
          </CardContent>
        </CardPrimitive>
      ))}
      <CardPrimitive>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Capture rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatPercentage(captureRate)}</p>
        </CardContent>
      </CardPrimitive>
    </div>
  );
}
