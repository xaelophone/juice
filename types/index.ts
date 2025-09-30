export type ResetCadence = 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'one-time';

export type BenefitType = 'credit' | 'subscription' | 'reimbursement' | 'one-time';

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
  benefitType?: BenefitType;
  expiryDate?: string;
  recurringAmount?: number;
}

export interface AdditionalBenefit {
  id: string;
  category: 'protection' | 'status' | 'service' | 'feature' | 'earning';
  title: string;
  description: string;
  details?: string;
}

export interface Card {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  summary: string;
  perks: Perk[];
  imageUrl?: string;
  additionalBenefits?: AdditionalBenefit[];
}

export interface CaptureSnapshot {
  cardId: string;
  realized: number;
  potential: number;
  netRoi: number;
  captureRate: number;
}

export type GameplanTaskPriority = 'high' | 'medium' | 'low';

export interface GameplanTask {
  id: string;
  title: string;
  description: string;
  priority: GameplanTaskPriority;
  cardId?: string;
  perkId?: string;
  dueBy?: string;
  expectedValue?: number;
}

export interface GameplanPayloadCard {
  id: string;
  name: string;
  annualFee: number;
  summary: string;
  realized: number;
  potential: number;
  captureRate: number;
  netRoi: number;
  perks: Array<{
    id: string;
    title: string;
    description: string;
    cashValue: number;
    cadence: ResetCadence;
    tags: string[];
  }>;
}

export interface GameplanContent {
  summary: string;
  quarter: string;
  tasks: GameplanTask[];
}

export interface GameplanRecord extends GameplanContent {
  id: string;
  generatedAt: string;
  model: string;
}

export type GameplanChatRole = 'system' | 'user' | 'assistant';

export interface GameplanChatMessage {
  id: string;
  role: GameplanChatRole;
  content: string;
  timestamp: string;
}
