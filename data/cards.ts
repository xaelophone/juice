import { Card } from '@/types';

export const seedCards: Card[] = [
  {
    id: 'amex-platinum',
    name: 'American Express Platinum',
    issuer: 'American Express',
    annualFee: 695,
    summary:
      'Premium travel and lifestyle statement credits refreshed for 2025, optimized for quarterly and annual usage.',
    perks: [
      {
        id: 'amex-resy',
        cardId: 'amex-platinum',
        title: 'Resy Dining Credit',
        description: '$25 statement credit each month at select Resy partners.',
        cashValue: 300,
        cadence: 'monthly',
        resetAnchor: 'calendar-year',
        tags: ['dining', 'statement-credit'],
        terms: 'Enroll via benefits dashboard. Credit resets monthly and unused value does not roll over.',
        enabledByDefault: true
      },
      {
        id: 'amex-saks',
        cardId: 'amex-platinum',
        title: 'Saks Fifth Avenue Credit',
        description: '$50 credit January–June and July–December for eligible Saks purchases.',
        cashValue: 100,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['shopping', 'statement-credit'],
        terms: 'Enrollment required. Cannot combine across halves of the year.',
        enabledByDefault: true
      },
      {
        id: 'amex-uber',
        cardId: 'amex-platinum',
        title: 'Uber Cash',
        description: '$15 monthly Uber Cash plus $20 bonus in December.',
        cashValue: 200,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['transportation', 'dining'],
        terms: 'Requires linking card to Uber account; applies to rides and eats in the U.S.',
        enabledByDefault: true
      },
      {
        id: 'amex-digital-entertainment',
        cardId: 'amex-platinum',
        title: 'Digital Entertainment Credit',
        description: '$20 monthly credit for select streaming services.',
        cashValue: 240,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['entertainment'],
        terms: 'Enrollment required. Participating platforms subject to change.',
        enabledByDefault: true
      }
    ]
  },
  {
    id: 'csr',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    annualFee: 550,
    summary:
      'Travel powerhouse card centered around flexible points, annual travel credit, and partner perks.',
    perks: [
      {
        id: 'csr-travel-credit',
        cardId: 'csr',
        title: '$300 Travel Credit',
        description: 'Automatic statement credits on travel purchases each card anniversary year.',
        cashValue: 300,
        cadence: 'annual',
        resetAnchor: 'card-anniversary',
        tags: ['travel', 'statement-credit'],
        terms: 'No enrollment required. Applies to most travel categories automatically.',
        enabledByDefault: true
      },
      {
        id: 'csr-doorDash',
        cardId: 'csr',
        title: 'DoorDash DashPass + Credits',
        description: 'Complimentary DashPass and quarterly $5 statement credits on DoorDash orders.',
        cashValue: 120,
        cadence: 'quarterly',
        resetAnchor: 'calendar-quarter',
        tags: ['dining', 'subscription'],
        terms: 'Enrollment required. Credits expire at the end of each quarter.',
        enabledByDefault: true
      },
      {
        id: 'csr-lyft',
        cardId: 'csr',
        title: 'Lyft Pink All Access Rebate',
        description: 'Annual Lyft Pink membership with 10x points on Lyft rides through December 2025.',
        cashValue: 199,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['transportation', 'subscription'],
        terms: 'Enrollment required. 10x earning capped at $1,000 in rides per month.',
        enabledByDefault: true
      }
    ]
  }
];
