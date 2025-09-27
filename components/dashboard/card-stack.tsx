'use client';

import { Badge } from '@/components/ui/badge';
import { Card as CardPrimitive, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { PerkDetailDialog } from '@/components/perks/perk-detail-dialog';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency, formatPercentage } from '@/lib/format';

export function CardStack() {
  const { selectedCards, summary, getPerkCompletions, recordCompletion, removeCompletion } = useJuiceState();
  const { settings } = useSettings();

  if (selectedCards.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No cards selected yet. Head to the welcome screen to add your first card.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedCards.map(card => {
        const potential = card.perks.reduce((total, perk) => total + perk.cashValue, 0);
        const realized = summary.cardsSnapshot.find(snapshot => snapshot.cardId === card.id)?.realized ?? 0;
        const captureRate = potential === 0 ? 0 : Math.min(1, realized / potential);

        return (
          <CardPrimitive key={card.id}>
            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>{card.name}</CardTitle>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{formatCurrency(realized, settings.currency)} captured</span>
                  <span>
                    {formatPercentage(captureRate)} of {formatCurrency(potential, settings.currency)}
                  </span>
                </div>
                <Progress value={captureRate * 100} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {card.perks.map(perk => {
                  const completions = getPerkCompletions(perk.id);
                  const usedAmount = completions.reduce((total, completion) => total + completion.amount, 0);
                  const isComplete = usedAmount >= perk.cashValue;
                  const remaining = Math.max(0, perk.cashValue - usedAmount);

                  return (
                    <div
                      key={perk.id}
                      className="grid gap-4 rounded-md border border-border bg-card/40 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <p className="font-medium leading-tight">{perk.title}</p>
                          <p className="text-xs text-muted-foreground">{perk.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary">{perk.cadence}</Badge>
                          <span>Cap {formatCurrency(perk.cashValue, settings.currency)}</span>
                          <span>Remaining {formatCurrency(remaining, settings.currency)}</span>
                        </div>
                      </div>
                      <PerkDetailDialog
                        perk={perk}
                        completions={completions}
                        currency={settings.currency}
                        onSubmit={payload => recordCompletion(perk.id, payload)}
                        onRemoveCompletion={completionId => removeCompletion(perk.id, completionId)}
                        trigger={
                          <div className="flex cursor-pointer select-none items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
                            <Checkbox
                              checked={isComplete}
                              readOnly
                              aria-label={`Perk ${perk.title} completion status`}
                              className="pointer-events-none"
                            />
                            <span>{isComplete ? 'Completed' : 'Mark as used'}</span>
                          </div>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Capture rate: {formatPercentage(captureRate)}</span>
              <span>Net ROI: {formatCurrency(realized - card.annualFee, settings.currency)}</span>
            </CardFooter>
          </CardPrimitive>
        );
      })}
    </div>
  );
}
