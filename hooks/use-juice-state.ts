'use client';

import { useMemo } from 'react';
import { seedCards } from '@/data/cards';
import { useLocalStorage } from './use-local-storage';
import { Card, Completion } from '@/types';

export interface JuiceState {
  selectedCardIds: string[];
  completions: Record<string, Completion[]>;
}

const STORAGE_KEY = 'juice-state-v1';

const INITIAL_STATE: JuiceState = {
  selectedCardIds: [],
  completions: {}
};

function createCompletionId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `completion-${Math.random().toString(36).slice(2, 9)}`;
}

export function useJuiceState() {
  const [state, setState] = useLocalStorage<JuiceState>(STORAGE_KEY, INITIAL_STATE);

  const cards = seedCards;

  const selectedCards = useMemo<Card[]>(
    () => cards.filter(card => state.selectedCardIds.includes(card.id)),
    [cards, state.selectedCardIds]
  );

  const toggleCard = (cardId: string) => {
    setState(prev => {
      const isSelected = prev.selectedCardIds.includes(cardId);
      return {
        ...prev,
        selectedCardIds: isSelected
          ? prev.selectedCardIds.filter(id => id !== cardId)
          : [...prev.selectedCardIds, cardId]
      };
    });
  };

  const clearState = () => setState(INITIAL_STATE);

  const recordCompletion = (perkId: string, payload: Omit<Completion, 'id' | 'instanceId'>) => {
    setState(prev => {
      const completions = prev.completions[perkId] ?? [];
      const completion: Completion = {
        ...payload,
        id: createCompletionId(),
        instanceId: perkId
      };

      return {
        ...prev,
        completions: {
          ...prev.completions,
          [perkId]: [...completions, completion]
        }
      };
    });
  };

  const removeCompletion = (perkId: string, completionId: string) => {
    setState(prev => {
      const completions = prev.completions[perkId] ?? [];
      return {
        ...prev,
        completions: {
          ...prev.completions,
          [perkId]: completions.filter(entry => entry.id !== completionId)
        }
      };
    });
  };

  const getPerkCompletions = (perkId: string) => state.completions[perkId] ?? [];

  const summary = useMemo(() => {
    const cardsSnapshot = selectedCards.map(card => {
      const potential = card.perks.reduce((total, perk) => total + perk.cashValue, 0);
      const realized = card.perks.reduce((total, perk) => {
        const completions = getPerkCompletions(perk.id);
        const earned = Math.min(
          perk.cashValue,
          completions.reduce((sum, entry) => sum + entry.amount, 0)
        );
        return total + earned;
      }, 0);

      const netRoi = realized - card.annualFee;
      const captureRate = potential === 0 ? 0 : Math.min(1, realized / potential);

      return {
        cardId: card.id,
        realized,
        potential,
        netRoi,
        captureRate
      };
    });

    const totals = cardsSnapshot.reduce(
      (acc, snapshot) => {
        acc.realized += snapshot.realized;
        acc.potential += snapshot.potential;
        acc.netRoi += snapshot.netRoi;
        return acc;
      },
      { realized: 0, potential: 0, netRoi: 0 }
    );

    return {
      cardsSnapshot,
      totals,
      captureRate: totals.potential === 0 ? 0 : Math.min(1, totals.realized / totals.potential)
    };
  }, [selectedCards, state.completions]);

  return {
    cards,
    selectedCards,
    summary,
    toggleCard,
    clearState,
    recordCompletion,
    removeCompletion,
    getPerkCompletions
  };
}
