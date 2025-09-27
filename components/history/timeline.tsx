'use client';

import { CardContent, CardHeader, CardTitle, Card as CardPrimitive } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency } from '@/lib/format';

export function HistoryTimeline() {
  const { selectedCards, getPerkCompletions, removeCompletion } = useJuiceState();
  const { settings } = useSettings();

  const entries = selectedCards
    .flatMap(card =>
      card.perks.flatMap(perk =>
        getPerkCompletions(perk.id).map(completion => ({
          cardId: card.id,
          cardName: card.name,
          perkTitle: perk.title,
          completion
        }))
      )
    )
    .sort((a, b) => (a.completion.date < b.completion.date ? 1 : -1));

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Complete a perk to populate your history timeline. We will show amount, notes, and receipts here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <CardPrimitive key={entry.completion.id}>
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">{entry.perkTitle}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {entry.cardName} • {entry.completion.date}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCompletion(entry.completion.instanceId, entry.completion.id)}
            >
              Undo
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{formatCurrency(entry.completion.amount, settings.currency)}</p>
            {entry.completion.note && <p className="text-muted-foreground">{entry.completion.note}</p>}
            {entry.completion.receiptUrl && (
              <a
                className="text-primary underline"
                href={entry.completion.receiptUrl}
                target="_blank"
                rel="noreferrer"
              >
                View receipt
              </a>
            )}
          </CardContent>
        </CardPrimitive>
      ))}
    </div>
  );
}
