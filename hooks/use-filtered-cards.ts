'use client';

import { useMemo } from 'react';
import { useJuiceState } from './use-juice-state';
import { useDashboardFilters } from './use-dashboard-filters';
import type { Completion, Perk } from '@/types';

interface FilteredPerk {
  perk: Perk;
  completions: Completion[];
  usedAmount: number;
  earned: number;
  remaining: number;
  category: 'travel' | 'lifestyle' | 'shopping';
}

interface FilteredCard {
  cardId: string;
  name: string;
  annualFee: number;
  perks: FilteredPerk[];
  potential: number;
  realized: number;
}

interface FilteredTotals {
  potential: number;
  realized: number;
  annualFees: number;
  netRoi: number;
}

export function useFilteredCards() {
  const { selectedCards, getPerkCompletions } = useJuiceState();
  const { cadenceFilter, cardFilter, categoryFilter } = useDashboardFilters();

  const cadenceValue = cadenceFilter === 'all' ? undefined : cadenceFilter;

  const { cards, totals } = useMemo<{ cards: FilteredCard[]; totals: FilteredTotals }>(() => {
    const cardsMatchingId = cardFilter === 'all'
      ? selectedCards
      : selectedCards.filter(card => card.id === cardFilter);

    const getCategory = (perk: Perk): 'travel' | 'lifestyle' | 'shopping' => {
      const tagSet = new Set(perk.tags);
      if (['travel', 'hotel', 'lounge', 'transportation', 'security', 'airline'].some(tag => tagSet.has(tag))) {
        return 'travel';
      }
      if (['shopping', 'retail'].some(tag => tagSet.has(tag))) {
        return 'shopping';
      }
      return 'lifestyle';
    };

    const filteredCards: FilteredCard[] = cardsMatchingId
      .map(card => {
        const visiblePerks = card.perks.filter(perk => {
          if (cadenceValue && perk.cadence !== cadenceValue) {
            return false;
          }

          if (categoryFilter !== 'all') {
            const perkCategory = getCategory(perk);
            if (perkCategory !== categoryFilter) {
              return false;
            }
          }

          return true;
        });

        const perks: FilteredPerk[] = visiblePerks.map(perk => {
          const completions = getPerkCompletions(perk.id);
          const usedAmount = completions.reduce((total, completion) => total + completion.amount, 0);
          const earned = Math.min(perk.cashValue, usedAmount);
          const remaining = Math.max(0, perk.cashValue - usedAmount);
          const category = getCategory(perk);

          return {
            perk,
            completions,
            usedAmount,
            earned,
            remaining,
            category
          };
        });

        const potential = perks.reduce((total, entry) => total + entry.perk.cashValue, 0);
        const realized = perks.reduce((total, entry) => total + entry.earned, 0);

        return {
          cardId: card.id,
          name: card.name,
          annualFee: card.annualFee,
          perks,
          potential,
          realized
        };
      })
      .filter(card => card.perks.length > 0);

    const baseTotals = filteredCards.reduce(
      (acc, card) => {
        acc.potential += card.potential;
        acc.realized += card.realized;
        acc.annualFees += card.annualFee;
        return acc;
      },
      { potential: 0, realized: 0, annualFees: 0 }
    );

    return {
      cards: filteredCards,
      totals: {
        ...baseTotals,
        netRoi: baseTotals.realized - baseTotals.annualFees
      }
    };
  }, [cadenceValue, categoryFilter, cardFilter, getPerkCompletions, selectedCards]);

  return {
    cards,
    totals,
    cadenceValue
  };
}

export type { FilteredPerk, FilteredCard };
