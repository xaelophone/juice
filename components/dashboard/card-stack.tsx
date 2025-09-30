'use client';

import { Badge } from '@/components/ui/badge';
import { Card as CardPrimitive, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PerkDetailDialog } from '@/components/perks/perk-detail-dialog';
import { CardInfoDialog } from './card-info-dialog';
import { useDashboardFilters, cadenceOptions, cardOptions, categoryOptions, type FilterOption } from '@/hooks/use-dashboard-filters';
import { useFilteredCards } from '@/hooks/use-filtered-cards';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useSettings } from '@/hooks/use-settings';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { ResetCadence } from '@/types';

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
  annual: 'border-transparent bg-violet-100 text-violet-700',
  'one-time': 'border-transparent bg-fuchsia-100 text-fuchsia-700'
};

const categoryLabels = categoryOptions.reduce(
  (acc, option) => {
    if (option.value !== 'all') {
      acc[option.value] = option.label;
    }
    return acc;
  },
  {} as Record<'travel' | 'lifestyle' | 'shopping', string>
);

const categoryBadgeClasses: Record<'travel' | 'lifestyle' | 'shopping', string> = {
  travel: 'border-transparent bg-sky-100 text-sky-700',
  lifestyle: 'border-transparent bg-purple-100 text-purple-700',
  shopping: 'border-transparent bg-rose-100 text-rose-700'
};

const roiTagClasses = {
  positive: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
  negative: 'border border-red-200 bg-red-50 text-red-700',
  neutral: 'border border-amber-200 bg-amber-50 text-amber-700'
} as const;

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
  const { cards, cadenceValue } = useFilteredCards();
  const { selectedCards, recordCompletion, removeCompletion } = useJuiceState();
  const { cadenceFilter, setCadenceFilter, cardFilter, setCardFilter, categoryFilter, setCategoryFilter } = useDashboardFilters();
  const { settings } = useSettings();

  return (
    <TooltipProvider delayDuration={300}>
      <CardStackContent
        cards={cards}
        cadenceValue={cadenceValue}
        cadenceFilter={cadenceFilter}
        setCadenceFilter={setCadenceFilter}
        cardFilter={cardFilter}
        setCardFilter={setCardFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        recordCompletion={recordCompletion}
        removeCompletion={removeCompletion}
        settings={settings}
        selectedCards={selectedCards}
      />
    </TooltipProvider>
  );
}

interface CardStackContentProps {
  cards: ReturnType<typeof useFilteredCards>['cards'];
  cadenceValue: ReturnType<typeof useFilteredCards>['cadenceValue'];
  cadenceFilter: ReturnType<typeof useDashboardFilters>['cadenceFilter'];
  setCadenceFilter: ReturnType<typeof useDashboardFilters>['setCadenceFilter'];
  cardFilter: ReturnType<typeof useDashboardFilters>['cardFilter'];
  setCardFilter: ReturnType<typeof useDashboardFilters>['setCardFilter'];
  categoryFilter: ReturnType<typeof useDashboardFilters>['categoryFilter'];
  setCategoryFilter: ReturnType<typeof useDashboardFilters>['setCategoryFilter'];
  recordCompletion: ReturnType<typeof useJuiceState>['recordCompletion'];
  removeCompletion: ReturnType<typeof useJuiceState>['removeCompletion'];
  settings: ReturnType<typeof useSettings>['settings'];
  selectedCards: ReturnType<typeof useJuiceState>['selectedCards'];
}

function CardStackContent({
  cards,
  cadenceValue,
  cadenceFilter,
  setCadenceFilter,
  cardFilter,
  setCardFilter,
  categoryFilter,
  setCategoryFilter,
  recordCompletion,
  removeCompletion,
  settings,
  selectedCards
}: CardStackContentProps) {

  if (selectedCards.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No cards selected yet. Head to the welcome screen to add your first card.
        </p>
      </div>
    );
  }

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
      <FilterSelect
        id="category-filter"
        label="Category"
        value={categoryFilter}
        options={categoryOptions}
        onChange={value => setCategoryFilter(value)}
      />
    </div>
  );

  if (cards.length === 0) {
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
      {cards.map(card => {
        const captureRate = card.potential === 0 ? 0 : Math.min(1, card.realized / card.potential);
        const netRoi = card.realized - card.annualFee;
        const roiTone = netRoi > 0 ? 'positive' : netRoi < 0 ? 'negative' : 'neutral';

        const fullCard = selectedCards.find(c => c.id === card.cardId);

        return (
          <CardPrimitive key={card.cardId} className="bg-white dark:bg-card">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                {fullCard ? (
                  <CardInfoDialog card={fullCard}>
                    <button
                      type="button"
                      className="text-left transition-colors hover:text-primary"
                    >
                      <CardTitle className="cursor-pointer">{card.name}</CardTitle>
                    </button>
                  </CardInfoDialog>
                ) : (
                  <CardTitle>{card.name}</CardTitle>
                )}
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                    roiTagClasses[roiTone]
                  )}
                >
                  ROI {formatCurrency(netRoi, settings.currency)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-end text-xs font-medium text-muted-foreground">
                  <span>
                    {formatCurrency(card.realized, settings.currency)} of {formatCurrency(card.potential, settings.currency)} benefits claimed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">{formatPercentage(captureRate)}</span>
                  <Progress value={captureRate * 100} className="flex-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {card.perks
                  .sort((a, b) => {
                    const aComplete = a.usedAmount >= a.perk.cashValue;
                    const bComplete = b.usedAmount >= b.perk.cashValue;
                    const aPartial = a.usedAmount > 0 && a.usedAmount < a.perk.cashValue;
                    const bPartial = b.usedAmount > 0 && b.usedAmount < b.perk.cashValue;
                    
                    // Fully completed items go to bottom
                    if (aComplete && !bComplete) return 1;
                    if (!aComplete && bComplete) return -1;
                    
                    // Among non-complete items, partial goes after uncompleted
                    if (!aComplete && !bComplete) {
                      if (aPartial && !bPartial) return 1;
                      if (!aPartial && bPartial) return -1;
                    }
                    
                    return 0;
                  })
                  .map(({ perk, completions, usedAmount, remaining, category }) => {
                  const isComplete = usedAmount >= perk.cashValue;
                  const isPartiallyComplete = usedAmount > 0 && usedAmount < perk.cashValue;
                  const cadenceLabel = cadenceLabels[perk.cadence] ?? perk.cadence;
                  const categoryLabel = categoryLabels[category];

                  return (
                    <div
                      key={perk.id}
                      className={cn(
                        'grid gap-4 rounded-md border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center transition-colors',
                        isComplete && 'bg-gray-100 dark:bg-gray-800/50 opacity-75',
                        isPartiallyComplete && !isComplete && 'bg-yellow-50 dark:bg-yellow-900/20',
                        !isComplete && !isPartiallyComplete && 'bg-white dark:bg-card'
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium leading-tight">{perk.title}</p>
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
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Badge
                            variant="outline"
                            className={cn('border', cadenceBadgeClasses[perk.cadence])}
                          >
                            {cadenceLabel}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn('border', categoryBadgeClasses[category])}
                          >
                            {categoryLabel}
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
          </CardPrimitive>
        );
      })}
    </div>
  );
}
