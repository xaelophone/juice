export type ResetCadence = 'monthly' | 'quarterly' | 'semiannual' | 'annual';

export interface Completion {
  id: string;
  instanceId: string;
  date: string;
  amount: number;
  note?: string;
  receiptUrl?: string;
}

export interface PerkInstance {
  id: string;
  perkId: string;
  periodStart: string;
  periodEnd: string;
  status: 'available' | 'used' | 'expiring';
  amountUsed: number;
  amountCap: number;
  completions: Completion[];
}

export interface Perk {
  id: string;
  cardId: string;
  title: string;
  description: string;
  cashValue: number;
  cadence: ResetCadence;
  resetAnchor: string;
  tags: string[];
  terms?: string;
  enabledByDefault?: boolean;
}

export interface Card {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  summary: string;
  perks: Perk[];
}

export interface CaptureSnapshot {
  cardId: string;
  realized: number;
  potential: number;
  netRoi: number;
  captureRate: number;
}
