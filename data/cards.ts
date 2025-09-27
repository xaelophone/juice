import { Card } from '@/types';

export const seedCards: Card[] = [
  {
    id: 'amex-platinum',
    name: 'American Express Platinum',
    issuer: 'American Express',
    annualFee: 895,
    summary:
      'Post-refresh Platinum checklist with $2,684 in reliable lifestyle, travel, and subscription credits backed by Amex.',
    perks: [
      {
        id: 'amex-hotel-credit',
        cardId: 'amex-platinum',
        title: 'Hotel Credit',
        description: '$300 semiannual credit (up to $600 yearly) for prepaid Fine Hotels + Resorts or Hotel Collection stays via Amex Travel.',
        cashValue: 600,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['travel', 'statement-credit', 'hotel'],
        terms: 'Prepaid booking required. Hotel Collection stays need a two-night minimum. Credit issued twice per calendar year.',
        enabledByDefault: true
      },
      {
        id: 'amex-resy',
        cardId: 'amex-platinum',
        title: 'Resy Dining Credit',
        description: '$100 statement credit each quarter on eligible Resy restaurant purchases when enrolled.',
        cashValue: 400,
        cadence: 'quarterly',
        resetAnchor: 'calendar-quarter',
        tags: ['dining', 'statement-credit'],
        terms: 'Enrollment required. Credits cap at $100 per quarter and do not roll over.',
        enabledByDefault: true
      },
      {
        id: 'amex-lululemon',
        cardId: 'amex-platinum',
        title: 'Lululemon Credit',
        description: '$75 quarterly statement credit (up to $300 yearly) at U.S. lululemon stores or online.',
        cashValue: 300,
        cadence: 'quarterly',
        resetAnchor: 'calendar-quarter',
        tags: ['shopping', 'statement-credit', 'fitness'],
        terms: 'Enrollment required. Excludes outlet locations. Credits provided quarterly and expire if unused.',
        enabledByDefault: true
      },
      {
        id: 'amex-uber-one',
        cardId: 'amex-platinum',
        title: 'Uber One Credit',
        description: 'Up to $120 annually in statement credits for renewing an Uber One membership with the Platinum Card.',
        cashValue: 120,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['transportation', 'subscription'],
        terms: 'Enrollment required. Membership must auto-renew on the Platinum Card to trigger credits.',
        enabledByDefault: true
      },
      {
        id: 'amex-digital-entertainment',
        cardId: 'amex-platinum',
        title: 'Digital Entertainment Credit',
        description: 'Up to $25 monthly ($300 annually) in credits for eligible streaming and digital subscriptions.',
        cashValue: 300,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['entertainment', 'statement-credit'],
        terms: 'Enrollment required. Eligible services include Paramount+, YouTube Premium, and other Amex-listed partners.',
        enabledByDefault: true
      },
      {
        id: 'amex-airline-fee',
        cardId: 'amex-platinum',
        title: 'Airline Fee Credit',
        description: 'Up to $200 in statement credits for incidental fees on a selected qualifying airline each calendar year.',
        cashValue: 200,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'statement-credit'],
        terms: 'Enrollment required annually. Applies to incidental purchases such as baggage fees and seat upgrades from the chosen airline.',
        enabledByDefault: true
      },
      {
        id: 'amex-clear-plus',
        cardId: 'amex-platinum',
        title: 'CLEAR Plus Credit',
        description: 'Statement credits covering up to $209 annually for CLEAR Plus membership.',
        cashValue: 209,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'security'],
        terms: 'Enrollment required. Credit applies when the membership renews on the Platinum Card and may adjust for price changes.',
        enabledByDefault: true
      },
      {
        id: 'amex-walmart-plus',
        cardId: 'amex-platinum',
        title: 'Walmart+ Membership Credit',
        description: 'Monthly credits (≈$12.95 + tax) covering a Walmart+ membership billed to the Platinum Card.',
        cashValue: 155,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['shopping', 'subscription'],
        terms: 'Enrollment required. Credits apply monthly and require the membership to auto-renew on the Platinum Card.',
        enabledByDefault: true
      },
      {
        id: 'amex-saks',
        cardId: 'amex-platinum',
        title: 'Saks Fifth Avenue Credit',
        description: '$50 credit issued January–June and another $50 July–December for Saks purchases.',
        cashValue: 100,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['shopping', 'statement-credit'],
        terms: 'Enrollment required. Credits cannot be combined across halves of the year and exclude gift card purchases.',
        enabledByDefault: true
      },
      {
        id: 'amex-lounge-access',
        cardId: 'amex-platinum',
        title: 'Global Lounge Access',
        description: 'Access to the Amex Global Lounge Collection plus 10 Delta Sky Club visits per year on eligible itineraries.',
        cashValue: 850,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'lounge'],
        terms: 'Subject to individual lounge program rules, visit caps, and same-day ticket requirements. Value represents estimated annualized benefit.',
        enabledByDefault: true
      }
    ]
  },
  {
    id: 'csr',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    annualFee: 795,
    summary:
      'Post-refresh Sapphire Reserve with $2,340 in reliable annual credits spanning travel, dining, experiences, and wellness.',
    perks: [
      {
        id: 'csr-travel-credit',
        cardId: 'csr',
        title: 'Annual Travel Credit',
        description: 'Automatic travel statement credits that reset each cardmember anniversary year.',
        cashValue: 300,
        cadence: 'annual',
        resetAnchor: 'card-anniversary',
        tags: ['travel', 'statement-credit'],
        terms: 'No enrollment required. Applies automatically to most travel categories until the $300 cap is met.',
        enabledByDefault: true
      },
      {
        id: 'csr-edit-hotel-credit',
        cardId: 'csr',
        title: 'The Edit Hotel Credit',
        description: '$500 credit toward prepaid stays at The Edit; transitions to an annual lump sum starting in 2026.',
        cashValue: 500,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'statement-credit', 'hotel'],
        terms: 'Requires a minimum two-night prepaid booking through The Edit. Credit expected to become an annual $500 lump sum in 2026.',
        enabledByDefault: true
      },
      {
        id: 'csr-exclusive-dining',
        cardId: 'csr',
        title: 'Exclusive Dining Credit',
        description: '$150 dining credit January–June and another $150 July–December at eligible partners.',
        cashValue: 300,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['dining', 'statement-credit'],
        terms: 'Enrollment required. Credits issued twice per calendar year and do not roll over.',
        enabledByDefault: true
      },
      {
        id: 'csr-stubhub-viagogo',
        cardId: 'csr',
        title: 'StubHub & Viagogo Credit',
        description: '$150 credit January–June and another $150 July–December for eligible event ticket purchases.',
        cashValue: 300,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['entertainment', 'statement-credit'],
        terms: 'Use-it-or-lose-it credits that require purchases through StubHub or Viagogo within each half of the year.',
        enabledByDefault: true
      },
      {
        id: 'csr-doordash-dashpass',
        cardId: 'csr',
        title: 'DoorDash Credits & DashPass',
        description: '$25 in monthly DoorDash credits plus complimentary DashPass membership (estimated $120 value).',
        cashValue: 420,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['dining', 'subscription'],
        terms: 'Credits expire monthly. DashPass enrollment required and membership value estimated at $120 annually.',
        enabledByDefault: true
      },
      {
        id: 'csr-apple-subscriptions',
        cardId: 'csr',
        title: 'Apple Subscriptions Credit',
        description: '$250 in statement credits toward Apple subscription purchases through June 2027.',
        cashValue: 250,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['entertainment', 'statement-credit'],
        terms: 'Enrollment required. Benefit scheduled to run through June 2027 and may require purchases to be billed directly by Apple.',
        enabledByDefault: true
      },
      {
        id: 'csr-trusted-traveler',
        cardId: 'csr',
        title: 'Global Entry / TSA PreCheck / NEXUS',
        description: '$100 reimbursement every four years for a trusted traveler application, annualized at $30.',
        cashValue: 30,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel'],
        terms: 'Receive up to $100 in statement credits once every four years. Tracked here as $30 per year for planning purposes.',
        enabledByDefault: true
      },
      {
        id: 'csr-lyft-credit',
        cardId: 'csr',
        title: 'Lyft Monthly Credit',
        description: '$10 monthly Lyft credit plus continued access to Lyft Pink benefits.',
        cashValue: 120,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['transportation', 'statement-credit'],
        terms: 'Credits expire monthly. Lyft Pink enrollment required and benefit subject to Lyft program changes.',
        enabledByDefault: true
      },
      {
        id: 'csr-peloton-credit',
        cardId: 'csr',
        title: 'Peloton App Credit',
        description: '$10 monthly statement credit for Peloton App membership through 2027.',
        cashValue: 120,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['fitness', 'subscription'],
        terms: 'Enrollment required. Credit currently scheduled through 2027 and expires if unused each month.',
        enabledByDefault: true
      }
    ]
  }
];
