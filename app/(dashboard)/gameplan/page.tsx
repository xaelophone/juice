'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Loader2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameplan } from '@/hooks/use-gameplan';
import { useJuiceState } from '@/hooks/use-juice-state';
import type { GameplanTask } from '@/types';

const GAMEPLAN_MODEL = 'gpt-5';
const PRIORITY_BADGE_VARIANTS: Record<'high' | 'medium' | 'low', 'default' | 'secondary' | 'outline'> = {
  high: 'default',
  medium: 'secondary',
  low: 'outline'
};

function getUpcomingQuarter(reference = new Date()) {
  const currentQuarter = Math.floor(reference.getMonth() / 3) + 1;
  const nextQuarter = currentQuarter === 4 ? 1 : currentQuarter + 1;
  const year = currentQuarter === 4 ? reference.getFullYear() + 1 : reference.getFullYear();
  return `Q${nextQuarter} ${year}`;
}

export default function GameplanPage() {
  const { cards, selectedCards, summary } = useJuiceState();
  const { replacePlan, clearChat, plan } = useGameplan();
  const [isGenerating, setIsGenerating] = useState(false);
  const upcomingQuarter = useMemo(() => getUpcomingQuarter(), []);

  const cardLookup = useMemo(() => new Map(cards.map(card => [card.id, card.name])), [cards]);

  const perkLookup = useMemo(() => {
    const entries = cards.flatMap(card =>
      card.perks.map(perk => [perk.id, { title: perk.title, cardId: card.id }] as const)
    );
    return new Map(entries);
  }, [cards]);

  const sortedTasks = useMemo(() => {
    if (!plan?.tasks) return [] as GameplanTask[];

    const priorityRank = { high: 0, medium: 1, low: 2 } as const;

    return [...plan.tasks].sort((a, b) => {
      const dateA = normalizeDate(a.dueBy);
      const dateB = normalizeDate(b.dueBy);

      if (dateA !== dateB) {
        return dateA - dateB;
      }

      return priorityRank[a.priority] - priorityRank[b.priority];
    });
  }, [plan?.tasks]);

  const totalExpectedValue = useMemo(
    () => plan?.tasks.reduce((total, task) => total + (task.expectedValue ?? 0), 0) ?? 0,
    [plan?.tasks]
  );

  const highPriorityCount = useMemo(
    () => plan?.tasks.filter(task => task.priority === 'high').length ?? 0,
    [plan?.tasks]
  );

  const generatedAtLabel = useMemo(() => formatTimestamp(plan?.generatedAt), [plan?.generatedAt]);

  const handleGenerate = async () => {
    if (selectedCards.length === 0) {
      alert('Add at least one card on your dashboard before creating a gameplan.');
      return;
    }

    setIsGenerating(true);

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

    const targetQuarter = plan?.quarter ?? upcomingQuarter;

    try {
      const response = await fetch('/api/gameplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quarter: targetQuarter,
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
    } catch (error) {
      console.error('Gameplan generation failed', error);
      alert('Unable to create a gameplan right now. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Gameplan</h1>
            <p className="text-muted-foreground">
              Turn your card perks into an actionable quarterly checklist tailored to what you have selected.
            </p>
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="w-full md:w-auto">
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                {plan ? 'Regenerate gameplan' : 'Create gameplan'}
              </span>
            )}
          </Button>
        </header>

        {plan ? (
          <div className="space-y-6">
            <Card>
              <CardHeader className="gap-2">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{plan.quarter}</Badge>
                  {generatedAtLabel && <span>Generated {generatedAtLabel}</span>}
                  <span>Model {plan.model}</span>
                </div>
                <CardTitle>Quarterly strategy</CardTitle>
                <CardDescription>{plan.summary}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <Metric label="Tasks" value={plan.tasks.length.toString()} />
                <Metric label="High priority" value={highPriorityCount.toString()} />
                <Metric label="Estimated capture" value={formatCurrency(totalExpectedValue)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action items</CardTitle>
                <CardDescription>
                  Work from top priority items down. Due dates account for posting windows so credits land before they reset.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedTasks.map(task => {
                  const perkInfo = task.perkId ? perkLookup.get(task.perkId) : undefined;
                  const cardName = task.cardId ? cardLookup.get(task.cardId) : perkInfo ? cardLookup.get(perkInfo.cardId) : undefined;
                  const dueDateLabel = formatDueDate(task.dueBy);
                  const expectedValueLabel =
                    typeof task.expectedValue === 'number' ? formatCurrency(task.expectedValue) : undefined;

                  return (
                    <div
                      key={task.id}
                      className="rounded-lg border border-border/80 bg-background p-5 shadow-sm transition hover:border-primary/40"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={PRIORITY_BADGE_VARIANTS[task.priority]} className="capitalize">
                              {task.priority} priority
                            </Badge>
                            {cardName && <span className="text-sm text-muted-foreground">{cardName}</span>}
                            {perkInfo?.title && (
                              <span className="text-sm text-muted-foreground">{perkInfo.title}</span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold leading-tight">{task.title}</h3>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground md:items-end">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>{dueDateLabel}</span>
                          </div>
                          {expectedValueLabel && <span>{expectedValueLabel} value</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Generate your first gameplan</CardTitle>
              <CardDescription>
                Pick at least one card on your dashboard, then create a plan to see what to do before perks expire this
                quarter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We’ll assemble an ordered checklist with due dates and estimated value so you know what to book, buy, or
                enroll in first.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function normalizeDate(value?: string | null) {
  if (!value) return Number.POSITIVE_INFINITY;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

function formatDueDate(value?: string | null) {
  if (!value) return 'Flexible timing';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
}

function formatTimestamp(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

interface MetricProps {
  label: string;
  value: string;
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
