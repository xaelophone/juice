'use client';

import { useSettings } from '@/hooks/use-settings';
import { Card as CardPrimitive, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const currencies: Array<{ code: 'USD' | 'CAD' | 'GBP'; label: string; description: string }> = [
  { code: 'USD', label: 'USD', description: 'US Dollar' },
  { code: 'CAD', label: 'CAD', description: 'Canadian Dollar' },
  { code: 'GBP', label: 'GBP', description: 'British Pound' }
];

export function CurrencyForm() {
  const { settings, updateSetting } = useSettings();

  return (
    <CardPrimitive>
      <CardHeader>
        <CardTitle>Currency</CardTitle>
        <CardDescription>Choose the currency to display in your dashboard calculations.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {currencies.map(currency => {
          const active = currency.code === settings.currency;
          return (
            <Button
              key={currency.code}
              variant={active ? 'default' : 'outline'}
              className={cn('justify-start gap-2 text-left', active && 'cursor-default')}
              onClick={() => updateSetting('currency', currency.code)}
            >
              <span className="font-medium">{currency.label}</span>
              <span className="text-xs text-muted-foreground">{currency.description}</span>
            </Button>
          );
        })}
      </CardContent>
    </CardPrimitive>
  );
}
