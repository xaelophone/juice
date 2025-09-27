'use client';

import { Button } from '@/components/ui/button';
import {
  Card as CardPrimitive,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJuiceState } from '@/hooks/use-juice-state';
import { formatCurrency } from '@/lib/format';
import { useSettings } from '@/hooks/use-settings';

export function CardPicker() {
  const { cards, selectedCards, toggleCard } = useJuiceState();
  const { settings } = useSettings();
  const selectedIds = new Set(selectedCards.map(card => card.id));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map(card => {
        const potential = card.perks.reduce((total, perk) => total + perk.cashValue, 0);
        const isSelected = selectedIds.has(card.id);
        return (
          <CardPrimitive key={card.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>{card.summary}</CardDescription>
                </div>
                <Badge variant={isSelected ? 'default' : 'secondary'}>
                  {isSelected ? 'Selected' : 'Tap to add'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium">Annual fee</p>
                <span>{formatCurrency(card.annualFee, settings.currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium">Annual potential</p>
                <span>{formatCurrency(potential, settings.currency)}</span>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Key perks</p>
                <ul className="space-y-2 text-sm">
                  {card.perks.map(perk => (
                    <li key={perk.id} className="flex flex-col rounded-md border border-dashed border-border px-3 py-2">
                      <span className="font-medium">{perk.title}</span>
                      <span className="text-xs text-muted-foreground">{perk.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant={isSelected ? 'secondary' : 'default'} onClick={() => toggleCard(card.id)}>
                {isSelected ? 'Remove card' : 'Add card'}
              </Button>
            </CardFooter>
          </CardPrimitive>
        );
      })}
    </div>
  );
}
