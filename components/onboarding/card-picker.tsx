'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card as CardPrimitive,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { useJuiceState } from '@/hooks/use-juice-state';
import { formatCurrency } from '@/lib/format';
import { useSettings } from '@/hooks/use-settings';

export function CardPicker() {
  const [open, setOpen] = useState(false);
  const { cards, selectedCards, toggleCard } = useJuiceState();
  const { settings } = useSettings();
  const router = useRouter();

  const selectedIds = new Set(selectedCards.map(card => card.id));

  const handleSelect = (cardId: string) => {
    if (!selectedIds.has(cardId)) {
      toggleCard(cardId);
    }
    setOpen(false);
    router.push('/dashboard');
  };

  const sanitizePerkTitle = (title: string) => title.replace(/^\$\d[\d,]*(?:\.\d+)?\s+/u, '').trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Add a card</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl space-y-6">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle>Import rewards</DialogTitle>
          <DialogDescription>Import rewards to track completion & ROI.</DialogDescription>
        </DialogHeader>
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
                          <span className="block text-sm font-medium text-foreground">{sanitizePerkTitle(perk.title)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex">
                  <Button className="w-full" disabled={isSelected} onClick={() => handleSelect(card.id)}>
                    {isSelected ? 'Added' : 'Add card'}
                  </Button>
                </CardFooter>
              </CardPrimitive>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
