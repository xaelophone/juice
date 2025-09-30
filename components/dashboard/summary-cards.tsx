'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as CardPrimitive, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { useSettings } from '@/hooks/use-settings';
import { useFilteredCards } from '@/hooks/use-filtered-cards';
import { useGameplan } from '@/hooks/use-gameplan';
import { useJuiceState } from '@/hooks/use-juice-state';
import { useDashboardFilters } from '@/hooks/use-dashboard-filters';
import type { GameplanTask } from '@/types';

const GAMEPLAN_MODEL = 'gpt-5';
const PRIORITY_ORDER: Record<GameplanTask['priority'], number> = {
  high: 0,
  medium: 1,
  low: 2
};

export function SummaryCards() {
  const { settings } = useSettings();
  const { cards: filteredCards, totals: filteredTotals } = useFilteredCards();
  const { cards, selectedCards, summary } = useJuiceState();
  const { plan, replacePlan, clearChat, status, setStatus } = useGameplan();
  const { cadenceFilter, cardFilter, categoryFilter } = useDashboardFilters();
  const [error, setError] = useState<string | null>(null);

  const isGenerating = status === 'generating';
  const hasActiveFilters = cadenceFilter !== 'all' || cardFilter !== 'all' || categoryFilter !== 'all';

  const filteredCaptureRate = filteredTotals.potential === 0
    ? 0
    : Math.min(1, filteredTotals.realized / filteredTotals.potential);

  const cardLookup = useMemo(() => new Map(cards.map(card => [card.id, card.name] as const)), [cards]);

  const perkLookup = useMemo(() => {
    const entries = cards.flatMap(card =>
      card.perks.map(perk => [perk.id, { title: perk.title, cardId: card.id }] as const)
    );
    return new Map(entries);
  }, [cards]);

  const planTasks = useMemo(() => plan?.tasks ?? [], [plan]);

  const visibleCardIds = useMemo(() => new Set(filteredCards.map(card => card.cardId)), [filteredCards]);

  const visiblePerkIds = useMemo(
    () => new Set(filteredCards.flatMap(card => card.perks.map(entry => entry.perk.id))),
    [filteredCards]
  );

  const prioritizedTasks = useMemo(() => {
    if (planTasks.length === 0) {
      return [] as GameplanTask[];
    }

    const relevantTasks = planTasks.filter(task => {
      const matchesPerk = task.perkId ? visiblePerkIds.has(task.perkId) : false;
      const matchesCard = task.cardId ? visibleCardIds.has(task.cardId) : false;
      const hasAssociations = Boolean(task.cardId || task.perkId);

      const requiresPerkSpecificity = cadenceFilter !== 'all' || categoryFilter !== 'all';

      if (!hasActiveFilters) {
        return matchesPerk || matchesCard || !hasAssociations;
      }

      if (requiresPerkSpecificity) {
        return matchesPerk;
      }

      if (cardFilter !== 'all') {
        return matchesCard || matchesPerk;
      }

      if (!hasAssociations) {
        return false;
      }

      return matchesPerk || matchesCard;
    });

    const pool = relevantTasks.length > 0 ? relevantTasks : hasActiveFilters ? [] : planTasks;

    return [...pool].sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      const valueDiff = (b.expectedValue ?? 0) - (a.expectedValue ?? 0);
      if (valueDiff !== 0) return valueDiff;
      return (a.dueBy ?? '').localeCompare(b.dueBy ?? '');
    });
  }, [cadenceFilter, cardFilter, categoryFilter, hasActiveFilters, planTasks, visibleCardIds, visiblePerkIds]);

  const narrative = useMemo(() => {
    if (planTasks.length === 0) {
      return null;
    }

    if (prioritizedTasks.length === 0) {
      return hasActiveFilters
        ? 'No high-priority actions match your current filters. Loosen them up to see what else is worth chasing.'
        : 'Plan is locked and loaded.';
    }

    const topTasks = prioritizedTasks.slice(0, 3);

    return topTasks
      .map((task, index) => createPersonaSentence(task, index, cardLookup, perkLookup, settings.currency))
      .filter(Boolean)
      .join(' ');
  }, [cardLookup, hasActiveFilters, perkLookup, planTasks, prioritizedTasks, settings.currency]);

  const filterSignature = useMemo(
    () =>
      [cadenceFilter, cardFilter, categoryFilter, filteredCards
        .map(card => `${card.cardId}:${card.perks.map(entry => entry.perk.id).join(',')}`)
        .join('|')]
        .join('::'),
    [cadenceFilter, cardFilter, categoryFilter, filteredCards]
  );

  const prioritizedKey = prioritizedTasks.slice(0, 3).map(task => task.id).join('|') || 'no-matches';
  const animationKey = isGenerating ? 'generating' : `${filterSignature}::${prioritizedKey}`;
  const displayedNarrative = narrative ?? 'Plan is locked and loaded.';

  const handleGenerate = async () => {
    if (selectedCards.length === 0) {
      alert('Add at least one card on your dashboard before creating a gameplan.');
      return;
    }

    setStatus('generating');
    setError(null);

    const cardsForPayload = selectedCards.map(card => {
      const snapshot = summary.cardsSnapshot.find(entry => entry.cardId === card.id);

      return {
        id: card.id,
        name: card.name,
        annualFee: card.annualFee,
        summary: card.summary,
        realized: snapshot?.realized ?? 0,
        potential: snapshot?.potential ?? card.perks.reduce((total, perk) => total + perk.cashValue, 0),
        captureRate: snapshot?.captureRate ?? 0,
        netRoi: snapshot?.netRoi ?? 0,
        perks: card.perks.map(perk => ({
          id: perk.id,
          title: perk.title,
          description: perk.description,
          cashValue: perk.cashValue,
          cadence: perk.cadence,
          tags: perk.tags
        }))
      };
    });

    try {
      const response = await fetch('/api/gameplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quarter: plan?.quarter ?? getUpcomingQuarter(),
          cards: cardsForPayload
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? 'Failed to generate gameplan');
      }

      const data = await response.json();
      replacePlan(data.plan, { model: GAMEPLAN_MODEL });
      clearChat();
    } catch (err) {
      console.error('Gameplan generation failed', err);
      setError('Could not build a gameplan right now. Give it another shot in a minute.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <CardPrimitive>
      <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-sm text-muted-foreground">Overall Progress</CardTitle>
          <span aria-hidden className="text-xs font-medium text-muted-foreground">
            {formatCurrency(filteredTotals.realized, settings.currency)} of {formatCurrency(filteredTotals.potential, settings.currency)} benefits claimed
          </span>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="sm"
          variant="outline"
          className="w-full border-emerald-500 text-foreground shadow-md transition-shadow hover:bg-emerald-500 hover:text-white hover:shadow-lg sm:w-auto disabled:border-emerald-200 disabled:text-muted-foreground disabled:shadow-none"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Working…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              {plan ? 'Regenerate gameplan' : 'Create gameplan'}
            </span>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-foreground">
            {formatPercentage(filteredCaptureRate)}
          </span>
          <Progress value={filteredCaptureRate * 100} className="flex-1" />
        </div>
        {(isGenerating || plan) && (
          <div className="mt-6 space-y-2 rounded-lg border border-emerald-200/70 bg-emerald-50 p-4 dark:border-emerald-500/40 dark:bg-emerald-900/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gameplan</span>
              {plan?.generatedAt && (
                <span className="text-xs text-muted-foreground">Updated {formatTimestamp(plan.generatedAt)}</span>
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={animationKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-sm leading-6 text-foreground"
              >
                {isGenerating
                  ? 'Sit tight, kid—I am working the phones to stitch together your next score.'
                  : displayedNarrative}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
        {error && (
          <p className="mt-4 text-xs font-medium text-red-500">{error}</p>
        )}
      </CardContent>
    </CardPrimitive>
  );
}

function createPersonaSentence(
  task: GameplanTask,
  index: number,
  cardLookup: Map<string, string>,
  perkLookup: Map<string, { title: string; cardId: string }>,
  currency: string
) {
  if (!task) return '';

  const cardId = task.cardId ?? (task.perkId ? perkLookup.get(task.perkId)?.cardId : undefined);
  const cardName = cardId ? cardLookup.get(cardId) : undefined;
  const dueLabel = formatPersonaDue(task.dueBy);
  const valueLabel = typeof task.expectedValue === 'number' && task.expectedValue > 0
    ? formatCurrency(task.expectedValue, currency)
    : null;

  const base = cardName ? `${task.title} on the ${cardName}` : task.title;

  const openings = [
    `Listen, kid—${base} is first in line${valueLabel ? ` and it's worth ${valueLabel}` : ''}, so ${dueLabel}.`,
    `Then slide straight into ${base}${valueLabel ? ` for another ${valueLabel}` : ''}; I don't want to hear excuses about timing—${dueLabel}.`,
    `Finish with ${base}${valueLabel ? ` and scoop that ${valueLabel}` : ''}, and don't make me chase you for it.`
  ];

  return openings[Math.min(index, openings.length - 1)];
}

function formatPersonaDue(value?: string | null) {
  if (!value) {
    return 'wrap it before the suits notice';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'lock it down before the clock runs out';
  }

  return `have it done before ${date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  })}`;
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function getUpcomingQuarter(reference = new Date()) {
  const currentQuarter = Math.floor(reference.getMonth() / 3) + 1;
  const nextQuarter = currentQuarter === 4 ? 1 : currentQuarter + 1;
  const year = currentQuarter === 4 ? reference.getFullYear() + 1 : reference.getFullYear();
  return `Q${nextQuarter} ${year}`;
}
