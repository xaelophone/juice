'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ResetCadence } from '@/types';

export type CadenceFilter = 'all' | ResetCadence;
export type CardFilter = 'all' | 'csr' | 'amex-platinum';
export type CategoryFilter = 'all' | 'travel' | 'lifestyle' | 'shopping';

export interface FilterOption<T extends string> {
  label: string;
  value: T;
}

export const cadenceOptions = [
  { label: 'All', value: 'all' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Semiannual', value: 'semiannual' },
  { label: 'Annual', value: 'annual' }
] as const satisfies readonly FilterOption<CadenceFilter>[];

export const cardOptions = [
  { label: 'All', value: 'all' },
  { label: 'Chase Sapphire Reserve', value: 'csr' },
  { label: 'American Express Platinum', value: 'amex-platinum' }
] as const satisfies readonly FilterOption<CardFilter>[];

export const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Travel', value: 'travel' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Shopping', value: 'shopping' }
] as const satisfies readonly FilterOption<CategoryFilter>[];

interface DashboardFilterContextValue {
  cadenceFilter: CadenceFilter;
  setCadenceFilter: (value: CadenceFilter) => void;
  cardFilter: CardFilter;
  setCardFilter: (value: CardFilter) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (value: CategoryFilter) => void;
}

const DashboardFilterContext = createContext<DashboardFilterContextValue | null>(null);

export function DashboardFilterProvider({ children }: { children: ReactNode }) {
  const [cadenceFilter, setCadenceFilter] = useState<CadenceFilter>('all');
  const [cardFilter, setCardFilter] = useState<CardFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const value = useMemo(
    () => ({ cadenceFilter, setCadenceFilter, cardFilter, setCardFilter, categoryFilter, setCategoryFilter }),
    [cadenceFilter, cardFilter, categoryFilter]
  );

  return <DashboardFilterContext.Provider value={value}>{children}</DashboardFilterContext.Provider>;
}

export function useDashboardFilters() {
  const context = useContext(DashboardFilterContext);

  if (!context) {
    throw new Error('useDashboardFilters must be used within a DashboardFilterProvider');
  }

  return context;
}
