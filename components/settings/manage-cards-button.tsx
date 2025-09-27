'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Card as CardPrimitive,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency } from '@/lib/format';

export function ManageCardsButton() {
  const [open, setOpen] = useState(false);
  const { cards, selectedCards, toggleCard } = useJuiceState();
  const { settings } = useSettings();

  const selectedIds = useMemo(() => new Set(selectedCards.map(card => card.id)), [selectedCards]);

  const sanitizePerkTitle = (title: string) => title.replace(/^\$\d[\d,]*(?:\.\d+)?\s+/u, '').trim();

  const handleAdd = (cardId: string) => {
    if (selectedIds.has(cardId)) {
      return;
    }

    toggleCard(cardId);
  };

  const handleRemove = (cardId: string) => {
    if (!selectedIds.has(cardId)) {
      return;
    }

    toggleCard(cardId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Manage cards</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl pt-12">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map(card => {
              const potential = card.perks.reduce((total, perk) => total + perk.cashValue, 0);
              const isSelected = selectedIds.has(card.id);

              return (
                <CardPrimitive key={card.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{card.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Annual fee</span>
                      <span>{formatCurrency(card.annualFee, settings.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Potential value</span>
                      <span>{formatCurrency(potential, settings.currency)}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Key rewards</p>
                      <ul className="space-y-2 text-sm">
                        {card.perks.slice(0, 3).map(perk => (
                          <li key={perk.id} className="rounded-md border border-dashed border-border px-3 py-3">
                            <span className="block text-base font-semibold tracking-tight text-primary">
                              {perk.cashValue ? formatCurrency(perk.cashValue, settings.currency) : ''}
                            </span>
                            <span className="block text-sm font-medium text-foreground">
                              {sanitizePerkTitle(perk.title)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      className="w-full"
                      onClick={() => handleAdd(card.id)}
                      disabled={isSelected}
                    >
                      Add card
                    </Button>
                    <Button
                      className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      variant="destructive"
                      onClick={() => handleRemove(card.id)}
                      disabled={!isSelected}
                    >
                      Remove card
                    </Button>
                  </CardFooter>
                </CardPrimitive>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
