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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency } from '@/lib/format';

export function ManageCardsButton() {
  const [open, setOpen] = useState(false);
  const { cards, selectedCards, toggleCard } = useJuiceState();
  const { settings } = useSettings();

  const selectedIds = useMemo(() => new Set(selectedCards.map(card => card.id)), [selectedCards]);

  const sanitizePerkTitle = (title: string) => title.replace(/^\$\d[\d,]*(?:\.\d+)?\s+/u, '').trim();

  // Get key benefits excluding welcome bonus
  const getKeyBenefits = (card: typeof cards[0]) => {
    return card.perks
      .filter(perk => perk.benefitType !== 'one-time')
      .slice(0, 3);
  };

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
        <Button
          variant="outline"
          className="border-emerald-500 text-foreground shadow-md transition-shadow hover:bg-emerald-500 hover:text-white hover:shadow-lg"
        >
          Manage cards
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl pt-12">
        <TooltipProvider delayDuration={300}>
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
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Key benefits</p>
                      <ul className="space-y-2 text-sm">
                        {getKeyBenefits(card).map(perk => (
                          <li key={perk.id} className="rounded-md border border-dashed border-border px-3 py-3">
                            <span className="block text-base font-semibold tracking-tight text-primary">
                              {perk.cashValue ? formatCurrency(perk.cashValue, settings.currency) : ''}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="block text-sm font-medium text-foreground">
                                {sanitizePerkTitle(perk.title)}
                              </span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="View benefit description"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <p className="text-xs">{perk.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      className="w-full border-2 border-green-500 hover:bg-green-500 hover:text-white"
                      variant="outline"
                      onClick={() => handleAdd(card.id)}
                      disabled={isSelected}
                    >
                      Add card
                    </Button>
                    <Button
                      className="w-full border-2 border-red-500 bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
