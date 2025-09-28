'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGameplan } from '@/hooks/use-gameplan';
import { useJuiceState } from '@/hooks/use-juice-state';

const GAMEPLAN_MODEL = 'gpt-5';

function getUpcomingQuarter(reference = new Date()) {
  const currentQuarter = Math.floor(reference.getMonth() / 3) + 1;
  const nextQuarter = currentQuarter === 4 ? 1 : currentQuarter + 1;
  const year = currentQuarter === 4 ? reference.getFullYear() + 1 : reference.getFullYear();
  return `Q${nextQuarter} ${year}`;
}

export default function GameplanPage() {
  const { selectedCards, summary } = useJuiceState();
  const { replacePlan, clearChat, plan } = useGameplan();
  const [isGenerating, setIsGenerating] = useState(false);
  const upcomingQuarter = useMemo(() => getUpcomingQuarter(), []);

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
    <div className="flex items-center justify-center py-24">
      <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
        {isGenerating ? 'Creating…' : 'Create Gameplan'}
      </Button>
    </div>
  );
}
