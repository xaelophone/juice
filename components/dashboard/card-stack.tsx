'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card as CardPrimitive, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { PerkDetailDialog } from '@/components/perks/perk-detail-dialog';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { ResetCadence } from '@/types';

type CadenceFilter = 'all' | ResetCadence;
type CardFilter = 'all' | 'csr' | 'amex-platinum';
type FilterOption<T extends string> = { label: string; value: T };

const cadenceOptions = [
  { label: 'All', value: 'all' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Semiannual', value: 'semiannual' },
  { label: 'Annual', value: 'annual' }
] as const satisfies readonly FilterOption<CadenceFilter>[];

const cadenceLabels = cadenceOptions.reduce(
  (acc, option) => {
    if (option.value !== 'all') {
      acc[option.value] = option.label;
    }
    return acc;
  },
  {} as Record<ResetCadence, string>
);

const cadenceBadgeClasses: Record<ResetCadence, string> = {
  monthly: 'border-transparent bg-sky-100 text-sky-700',
  quarterly: 'border-transparent bg-emerald-100 text-emerald-700',
  semiannual: 'border-transparent bg-amber-100 text-amber-700',
  annual: 'border-transparent bg-violet-100 text-violet-700'
};

const cardOptions = [
  { label: 'All', value: 'all' },
  { label: 'Chase Sapphire Reserve', value: 'csr' },
  { label: 'American Express Platinum', value: 'amex-platinum' }
] as const satisfies readonly FilterOption<CardFilter>[];

interface FilterSelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: readonly FilterOption<T>[];
  onChange: (value: T) => void;
}

function FilterSelect<T extends string>({ id, label, value, options, onChange }: FilterSelectProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="appearance-none h-9 rounded-md border border-input bg-background pl-3 pr-10 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={value}
          onChange={event => onChange(event.target.value as T)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-base leading-none">unfold_more</span>
        </span>
      </div>
    </div>
  );
}

export function CardStack() {
  const { selectedCards, getPerkCompletions, recordCompletion, removeCompletion } = useJuiceState();
  const { settings } = useSettings();
  const [cadenceFilter, setCadenceFilter] = useState<CadenceFilter>('all');
  const [cardFilter, setCardFilter] = useState<CardFilter>('all');

  const cadenceValue = cadenceFilter === 'all' ? undefined : cadenceFilter;

  if (selectedCards.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No cards selected yet. Head to the welcome screen to add your first card.
        </p>
      </div>
    );
  }

  const cardsMatchingId = cardFilter === 'all' ? selectedCards : selectedCards.filter(card => card.id === cardFilter);
  const cardsToDisplay = cadenceValue
    ? cardsMatchingId.filter(card => card.perks.some(perk => perk.cadence === cadenceValue))
    : cardsMatchingId;

  const filterControl = (
    <div className="flex flex-wrap items-center gap-4">
      <FilterSelect
        id="cadence-filter"
        label="Frequency"
        value={cadenceFilter}
        options={cadenceOptions}
        onChange={value => setCadenceFilter(value)}
      />
      <FilterSelect
        id="card-filter"
        label="Card"
        value={cardFilter}
        options={cardOptions}
        onChange={value => setCardFilter(value)}
      />
    </div>
  );

  if (cardsToDisplay.length === 0) {
    return (
      <div className="space-y-4">
        {filterControl}
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">No benefits found with the current filters. Try a different combination.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filterControl}
      {cardsToDisplay.map(card => {
        const visiblePerks = cadenceValue
          ? card.perks.filter(perk => perk.cadence === cadenceValue)
          : card.perks;

        const perksWithCompletions = visiblePerks.map(perk => {
          const completions = getPerkCompletions(perk.id);
          const usedAmount = completions.reduce((total, completion) => total + completion.amount, 0);
          const earned = Math.min(perk.cashValue, usedAmount);

          return {
            perk,
            completions,
            usedAmount,
            earned
          };
        });

        const potential = perksWithCompletions.reduce((total, entry) => total + entry.perk.cashValue, 0);
        const realized = perksWithCompletions.reduce((total, entry) => total + entry.earned, 0);
        const captureRate = potential === 0 ? 0 : Math.min(1, realized / potential);
        const showNetRoi = cadenceValue === undefined && card.id !== 'amex-platinum';

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
                {perksWithCompletions.map(({ perk, completions, usedAmount }) => {
                  const isComplete = usedAmount >= perk.cashValue;
                  const remaining = Math.max(0, perk.cashValue - usedAmount);
                  const cadenceLabel = cadenceLabels[perk.cadence] ?? perk.cadence;

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
                          <Badge
                            variant="outline"
                            className={cn('border', cadenceBadgeClasses[perk.cadence])}
                          >
                            {cadenceLabel}
                          </Badge>
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
                          <button
                            type="button"
                            className="flex cursor-pointer select-none items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                            aria-label={`View details for ${perk.title}`}
                          >
                            <Checkbox
                              checked={isComplete}
                              readOnly
                              aria-label={`Perk ${perk.title} completion status`}
                              className="pointer-events-none h-6 w-6"
                            />
                          </button>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            {showNetRoi && (
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Capture rate: {formatPercentage(captureRate)}</span>
                <span>Net ROI: {formatCurrency(realized - card.annualFee, settings.currency)}</span>
              </CardFooter>
            )}
          </CardPrimitive>
        );
      })}
    </div>
  );
}
