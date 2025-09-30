import { Card } from '@/types';

export const seedCards: Card[] = [
  {
    id: 'amex-platinum',
    name: 'American Express Platinum',
    issuer: 'American Express',
    annualFee: 895,
    summary: 'Premium travel card with $3,600+ in annual statement credits spanning hotels, dining, lifestyle, and subscriptions.',
    imageUrl: 'https://icm.aexp-static.com/content/dam/amex/us/credit-cards/features-benefits/policies/CBT/Cardart/platinum-card.png',
    perks: [
      {
        id: 'amex-welcome-bonus',
        cardId: 'amex-platinum',
        title: 'Welcome Bonus',
        description: 'Up to 175,000 Membership Rewards Points after spending $8,000 in first 6 months.',
        cashValue: 1750,
        cadence: 'one-time',
        resetAnchor: 'account-opening',
        tags: ['rewards', 'one-time', 'points'],
        terms: 'Welcome offers vary by applicant. Apply to see your specific offer. Value estimated at 1 cent per point.',
        enabledByDefault: true,
        benefitType: 'one-time'
      },
      {
        id: 'amex-hotel-credit',
        cardId: 'amex-platinum',
        title: 'Hotel Credit',
        description: '$300 semiannual credit (up to $600 yearly) for prepaid Fine Hotels + Resorts or Hotel Collection stays via Amex Travel.',
        cashValue: 600,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['travel', 'statement-credit', 'hotel'],
        terms: 'Prepaid booking required. Hotel Collection stays need a two-night minimum. Credit issued twice per calendar year (Jan-Jun, Jul-Dec).',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 300
      },
      {
        id: 'amex-resy',
        cardId: 'amex-platinum',
        title: 'Resy Dining Credit',
        description: '$100 statement credit each quarter on eligible Resy restaurant purchases when enrolled. Access to 10,000+ restaurants plus Platinum Nights beginning late 2025.',
        cashValue: 400,
        cadence: 'quarterly',
        resetAnchor: 'calendar-quarter',
        tags: ['dining', 'statement-credit'],
        terms: 'Enrollment required. Credits cap at $100 per quarter and do not roll over. Includes Global Dining Access by Resy benefits.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 100
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
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 75
      },
      {
        id: 'amex-digital-entertainment',
        cardId: 'amex-platinum',
        title: 'Digital Entertainment Credit',
        description: 'Up to $25 monthly ($300 annually) in credits for eligible streaming and digital subscriptions including Peacock, Disney+, Hulu, ESPN+, The New York Times, and The Wall Street Journal.',
        cashValue: 300,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['entertainment', 'statement-credit', 'subscription'],
        terms: 'Enrollment required. Eligible services include Peacock, Disney+, The Disney Bundle, ESPN+, Hulu, The New York Times and The Wall Street Journal.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 25
      },
      {
        id: 'amex-equinox',
        cardId: 'amex-platinum',
        title: 'Equinox Credit',
        description: 'Up to $300 annual statement credit for Equinox fitness club membership or Equinox+ app subscription.',
        cashValue: 300,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['fitness', 'statement-credit', 'subscription'],
        terms: 'Statement credit applied when paying for Equinox membership or Equinox+ app with card.',
        enabledByDefault: true,
        benefitType: 'credit'
      },
      {
        id: 'amex-soulcycle',
        cardId: 'amex-platinum',
        title: 'SoulCycle At-Home Bike Credit',
        description: '$300 statement credit when purchasing a SoulCycle at-home bike.',
        cashValue: 300,
        cadence: 'one-time',
        resetAnchor: 'account-lifetime',
        tags: ['fitness', 'statement-credit', 'one-time'],
        terms: 'Enrollment required. Must have an Equinox+ subscription to qualify. One-time benefit per account.',
        enabledByDefault: false,
        benefitType: 'one-time'
      },
      {
        id: 'amex-clear-plus',
        cardId: 'amex-platinum',
        title: 'CLEAR Plus Credit',
        description: 'Statement credits covering up to $209 annually for CLEAR Plus membership. Use biometrics to bypass security lines at airports and stadiums.',
        cashValue: 209,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'security', 'subscription'],
        terms: 'Enrollment required. Credit applies when membership renews on Platinum Card and may adjust for price changes.',
        enabledByDefault: true,
        benefitType: 'subscription'
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
        terms: 'Enrollment required annually. Applies to incidental purchases such as baggage fees and seat upgrades from the chosen airline. Must select qualifying airline.',
        enabledByDefault: true,
        benefitType: 'credit'
      },
      {
        id: 'amex-uber-cash',
        cardId: 'amex-platinum',
        title: 'Uber Cash',
        description: 'Up to $200 annually in Uber Cash ($15/month, $35 in December) for rides in the U.S. or Uber Eats. Includes automatic Uber VIP status.',
        cashValue: 200,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['transportation', 'dining', 'statement-credit'],
        terms: 'Must add card as payment method in Uber app and use it on purchases. Automatic enrollment; Uber VIP status connects with top-rated drivers.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 15
      },
      {
        id: 'amex-oura-ring',
        cardId: 'amex-platinum',
        title: 'Oura Ring Credit',
        description: 'Up to $200 back in statement credits annually when purchasing an Oura Ring through Ouraring.com.',
        cashValue: 200,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['health', 'wellness', 'statement-credit'],
        terms: 'Enrollment required. Statement credit applies to Oura Ring purchases made on card through Ouraring.com.',
        enabledByDefault: true,
        benefitType: 'credit'
      },
      {
        id: 'amex-walmart-plus',
        cardId: 'amex-platinum',
        title: 'Walmart+ Membership Credit',
        description: 'Monthly credits (≈$12.95 + tax) covering Walmart+ membership. Includes free delivery, free shipping, gas savings, and Paramount+.',
        cashValue: 155,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['shopping', 'subscription'],
        terms: 'Enrollment required. Credits apply monthly when membership auto-renews on Platinum Card. Membership includes free grocery delivery, gas discounts, and Paramount+ subscription.',
        enabledByDefault: true,
        benefitType: 'subscription',
        recurringAmount: 12.95
      },
      {
        id: 'amex-uber-one',
        cardId: 'amex-platinum',
        title: 'Uber One Credit',
        description: 'Up to $120 annually in statement credits for renewing Uber One membership. Skip delivery fees, earn discounts on delivery/takeout, and save on rides.',
        cashValue: 120,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['transportation', 'subscription'],
        terms: 'Enrollment required. Membership must auto-renew on the Platinum Card to trigger credits. Includes ride savings and car rental discounts.',
        enabledByDefault: true,
        benefitType: 'subscription'
      },
      {
        id: 'amex-saks',
        cardId: 'amex-platinum',
        title: 'Saks Fifth Avenue Credit',
        description: '$50 credit issued January–June and another $50 July–December for in-store or online Saks purchases.',
        cashValue: 100,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['shopping', 'statement-credit'],
        terms: 'Enrollment required. Credits cannot be combined across halves of the year and exclude gift card purchases.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 50
      }
    ],
    additionalBenefits: [
      {
        id: 'amex-lounge-access',
        category: 'feature',
        title: 'Global Lounge Collection Access',
        description: '30+ Centurion Lounges, Priority Pass Select (1,550+ lounges), 10 Delta Sky Club visits/year, International Amex lounges.',
        details: 'Access to Centurion Lounges, Priority Pass Select membership (normally $469/year), 10 Delta Sky Club visits when flying Delta, Airspace and Escape lounges. Complimentary guest access after $75,000 annual spend (2 guests per visit at select Centurion Lounges). Unlimited Delta Sky Club access with $75,000 annual spend.'
      },
      {
        id: 'amex-tsa-global-entry',
        category: 'feature',
        title: 'TSA PreCheck / Global Entry Credit',
        description: '$85 TSA PreCheck or $120 Global Entry fee credit every 4-4.5 years.',
        details: 'Statement credit for application fee. TSA PreCheck costs $85 (every 4 years), Global Entry costs $120 (every 4.5 years). Covers one trusted traveler program application per eligibility period.'
      },
      {
        id: 'amex-marriott-gold',
        category: 'status',
        title: 'Marriott Bonvoy Gold Elite Status',
        description: '25% points bonus, room upgrades, 2 PM late checkout, free Wi-Fi.',
        details: 'Complimentary Marriott Bonvoy Gold Elite Status. Benefits include 25% Marriott Bonvoy points bonus on stays, enhanced room upgrades at check-in (when available), 2 p.m. late checkout, and free in-room Wi-Fi. Enrollment required.'
      },
      {
        id: 'amex-hilton-gold',
        category: 'status',
        title: 'Hilton Honors Gold Status',
        description: 'Room upgrades, 80% bonus points, complimentary fifth reward night.',
        details: 'Complimentary Hilton Honors Gold Status. Receive room upgrades at select properties (when available), complimentary fifth reward night on standard room reward stays of 5+ nights, and 80% bonus points on all Hilton Honors base points. Enrollment required.'
      },
      {
        id: 'amex-fhr-benefits',
        category: 'feature',
        title: 'Fine Hotels + Resorts Benefits',
        description: 'Room upgrade, daily breakfast for two, 4 PM late checkout, $100 amenity credit.',
        details: 'When booking through Fine Hotels + Resorts: room upgrade (when available), daily breakfast for two, guaranteed 4 p.m. late checkout, noon check-in (when available), complimentary Wi-Fi, and $100 amenity credit per stay.'
      },
      {
        id: 'amex-hotel-collection',
        category: 'feature',
        title: 'The Hotel Collection Benefits',
        description: '$100 hotel credit, room upgrade for stays of 2+ nights.',
        details: 'For bookings of at least two consecutive nights: $100 hotel credit for dining, spa, and resort activities, plus room upgrade upon arrival (when available). Must book through American Express Travel.'
      },
      {
        id: 'amex-leaders-club',
        category: 'status',
        title: 'Leaders Club Sterling Status',
        description: 'Complimentary status at 400+ luxury hotels worldwide with breakfast and upgrades.',
        details: 'Complimentary Leaders Club Sterling Status from The Leading Hotels of the World. Benefits include breakfast for two, upgrade opportunities (when available), and on-property perks at 400+ independent luxury hotels worldwide. Enrollment required.'
      },
      {
        id: 'amex-concierge',
        category: 'service',
        title: '24/7 Concierge Service',
        description: 'Round-the-clock assistance for personal, travel, or card-related needs.',
        details: 'Free 24/7 access to concierge assistants for personal requests, travel planning, or card-related needs. Service is complimentary; fees may apply for costs incurred to fulfill requests.'
      },
      {
        id: 'amex-intl-airline',
        category: 'feature',
        title: 'International Airline Program',
        description: 'Savings on premium cabin tickets with 20+ airlines.',
        details: 'Earn savings on International First, Business, and Premium Economy Class tickets on 20+ participating airlines when booking through American Express. Applies to cardholder and travel companions.'
      },
      {
        id: 'amex-cruise-privileges',
        category: 'feature',
        title: 'Cruise Privileges Program',
        description: 'Up to $300 shipboard credit for cruises of 5+ nights.',
        details: 'Book cruises of 5+ nights through American Express and receive up to $300 in shipboard credit per stateroom, exclusive amenities per cruise line, and earn 1 extra Membership Rewards point per dollar spent.'
      },
      {
        id: 'amex-car-rental',
        category: 'feature',
        title: 'Car Rental Privileges',
        description: 'Complimentary premium status with Avis, National, and Hertz.',
        details: 'Complimentary premium status with Avis Preferred, National Car Rental Emerald Club, and Hertz Gold Plus Rewards. Benefits include upgrades, discounts, and priority service (when available). Enrollment required.'
      },
      {
        id: 'amex-by-invitation',
        category: 'feature',
        title: 'Exclusive Events & Experiences',
        description: 'Access to By Invitation Only events, Membership Experiences, and Preferred Tickets.',
        details: 'By Invitation Only platform offers tickets to exclusive sporting, fashion, dining, art and performance events. Membership Experiences provides presale tickets and special events. American Express Preferred Tickets offers advance ticket sales for concerts, sports, and entertainment.'
      },
      {
        id: 'amex-points-earning',
        category: 'earning',
        title: 'Membership Rewards Points',
        description: '5X on flights/prepaid hotels, 2X on travel through Amex, 1X everywhere else.',
        details: 'Earn 5X Membership Rewards points per dollar on up to $500,000/year on flights booked directly with airlines or through Amex, 5X on prepaid hotels through Amex, 2X on other eligible travel through Amex, and 1X on all other purchases.'
      },
      {
        id: 'amex-cell-protection',
        category: 'protection',
        title: 'Cell Phone Protection',
        description: 'Up to $800 per claim, 2 claims/year, $50 deductible.',
        details: 'Coverage for lost, damaged, or stolen cell phones up to $800 per claim with a $50 deductible. Maximum two approved claims per 12-month period. Must pay cell phone bill with card to qualify.'
      },
      {
        id: 'amex-purchase-protection',
        category: 'protection',
        title: 'Purchase Protection',
        description: 'Up to $10,000 per incident, $50,000/year for damaged/stolen items.',
        details: 'Protection for qualifying purchases against accidental damage, theft, or loss for 90 days from purchase date. Coverage up to $10,000 per incident, maximum $50,000 per year.'
      },
      {
        id: 'amex-return-protection',
        category: 'protection',
        title: 'Return Protection',
        description: 'Up to $300 per item, $1,000/year if merchant won\'t accept return.',
        details: 'If merchant won\'t accept return within 90 days, Amex may refund up to $300 per item (maximum $1,000 per year). Does not cover shipping and handling costs.'
      },
      {
        id: 'amex-extended-warranty',
        category: 'protection',
        title: 'Extended Warranty',
        description: 'Add up to 1 extra year to manufacturer warranties of 5 years or less.',
        details: 'Extends manufacturer warranties of 5 years or less by up to one additional year on qualifying purchases made with card.'
      },
      {
        id: 'amex-baggage-insurance',
        category: 'protection',
        title: 'Baggage Insurance',
        description: 'Up to $2,000 checked, $3,000 total for lost/damaged/stolen luggage.',
        details: 'Coverage for lost, damaged, or stolen baggage up to $2,000 for checked bags and up to $3,000 combined maximum for checked and carry-on. Must pay entire fare with card.'
      },
      {
        id: 'amex-car-rental-insurance',
        category: 'protection',
        title: 'Car Rental Loss & Damage Insurance',
        description: 'Secondary coverage for rental car damage or theft.',
        details: 'Secondary coverage for rental car that is damaged or stolen. Must pay for rental with card and decline collision damage waiver. Premium Car Rental Protection available for enrollment with flat rate for primary coverage on luxury cars, SUVs, and pickup trucks.'
      },
      {
        id: 'amex-trip-delay',
        category: 'protection',
        title: 'Trip Delay Insurance',
        description: 'Up to $500 per trip for delays 6+ hours, max 2 claims/year.',
        details: 'Reimburses certain expenses (meals, lodging, toiletries, medication, personal items) up to $500 per trip when delay exceeds 6 hours. Maximum 2 claims per eligible card per 12-month period. Must pay for round trip with card.'
      },
      {
        id: 'amex-trip-cancel',
        category: 'protection',
        title: 'Trip Cancellation & Interruption Insurance',
        description: 'Up to $10,000 per trip, $20,000 per card/year for non-refundable expenses.',
        details: 'Reimburses non-refundable expenses when trip is canceled or interrupted for qualifying reasons. Coverage up to $10,000 per trip and $20,000 per card per 12-month period. Must purchase round trip with card.'
      },
      {
        id: 'amex-travel-accident',
        category: 'protection',
        title: 'Travel Accident Insurance',
        description: 'Up to $1,000,000 coverage for accidental death or dismemberment.',
        details: 'Accidental death or dismemberment coverage up to $1,000,000 for air, bus, train, or cruise transportation purchased with card.'
      },
      {
        id: 'amex-global-assist',
        category: 'service',
        title: 'Premium Global Assist Hotline',
        description: '24/7 emergency services when traveling 100+ miles from home.',
        details: '24/7 medical, legal, financial, or other emergency assistance services when traveling 100+ miles from home. May include emergency medical transportation assistance. Responsible for any costs charged by third-party service providers.'
      },
      {
        id: 'amex-no-ftf',
        category: 'feature',
        title: 'No Foreign Transaction Fees',
        description: 'Use card internationally without foreign transaction fees.',
        details: 'No foreign transaction fees on purchases made outside the U.S. Note: American Express acceptance may be limited in some countries.'
      }
    ]
  },
  {
    id: 'csr',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    annualFee: 795,
    summary: 'Premium travel rewards card with $2,700+ in annual credits for travel, dining, entertainment, wellness, and elite IHG status.',
    imageUrl: 'https://creditcards.chase.com/K-Marketplace/images/cardart/sapphire_reserve_card.png',
    perks: [
      {
        id: 'csr-welcome-bonus',
        cardId: 'csr',
        title: 'Welcome Bonus',
        description: '125,000 bonus points + $500 Chase Travel credit after spending $6,000 in first 3 months.',
        cashValue: 2125,
        cadence: 'one-time',
        resetAnchor: 'account-opening',
        tags: ['rewards', 'one-time', 'points'],
        terms: 'Earn 125,000 bonus points after $6,000 spend in first 3 months. Plus receive $500 Chase Travel credit. Value estimated at $2,125+ when redeemed optimally.',
        enabledByDefault: true,
        benefitType: 'one-time'
      },
      {
        id: 'csr-travel-credit',
        cardId: 'csr',
        title: 'Annual Travel Credit',
        description: 'Automatic $300 travel statement credits that reset each cardmember anniversary year.',
        cashValue: 300,
        cadence: 'annual',
        resetAnchor: 'card-anniversary',
        tags: ['travel', 'statement-credit'],
        terms: 'No enrollment required. Applies automatically to most travel categories (airlines, hotels, car rentals, cruises, trains, buses, taxis, ferries, tolls, parking) until the $300 cap is met.',
        enabledByDefault: true,
        benefitType: 'credit'
      },
      {
        id: 'csr-edit-hotel-credit',
        cardId: 'csr',
        title: 'The Edit Hotel Credit',
        description: '$500 annual credit for prepaid stays at hand-selected hotels through The Edit by Chase Travel. Includes $100 property credit, daily breakfast for two, and room upgrades.',
        cashValue: 500,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['travel', 'statement-credit', 'hotel'],
        terms: 'Up to $250 credit twice a year (Jan-Jun, Jul-Dec). Requires minimum two-night prepaid booking. Includes $100 property credit, daily breakfast for two, room upgrades (if available), early check-in/late checkout (if available), and complimentary Wi-Fi. Purchases do not earn points.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 250
      },
      {
        id: 'csr-exclusive-dining',
        cardId: 'csr',
        title: 'Exclusive Tables Dining Credit',
        description: '$150 dining credit January–June and another $150 July–December at award-winning restaurants booked through OpenTable.',
        cashValue: 300,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['dining', 'statement-credit'],
        terms: 'Enrollment required. Up to $150 credit per half-year for eligible dining at Sapphire Reserve Exclusive Tables. Credits issued twice per calendar year and do not roll over.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 150
      },
      {
        id: 'csr-stubhub-viagogo',
        cardId: 'csr',
        title: 'StubHub & Viagogo Credit',
        description: '$150 credit January–June and another $150 July–December for concert and event ticket purchases.',
        cashValue: 300,
        cadence: 'semiannual',
        resetAnchor: 'calendar-year-split',
        tags: ['entertainment', 'statement-credit'],
        terms: 'Up to $150 credit per half-year for eligible purchases on StubHub and viagogo. Activation required. Valid through December 31, 2027. Use-it-or-lose-it credits do not roll over.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 150,
        expiryDate: '2027-12-31'
      },
      {
        id: 'csr-doordash-dashpass',
        cardId: 'csr',
        title: 'DoorDash Credits & DashPass',
        description: 'Complimentary DashPass membership ($120 value) plus $5/month food delivery credit and up to $10 off two retail orders per month.',
        cashValue: 420,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['dining', 'subscription'],
        terms: 'Complimentary DashPass ($0 delivery fees, lower service fees). $5/month credit on food delivery orders. Up to $10 off two retail/convenience orders per month (unused amounts forfeit). DashPass activation required. Total annual value: $420.',
        enabledByDefault: true,
        benefitType: 'subscription',
        recurringAmount: 25
      },
      {
        id: 'csr-apple-subscriptions',
        cardId: 'csr',
        title: 'Apple TV+ and Apple Music',
        description: 'Complimentary Apple TV+ and Apple Music subscriptions (combined $250/year value).',
        cashValue: 250,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['entertainment', 'subscription'],
        terms: 'Complimentary subscriptions to Apple TV+ ($9.99/month) and Apple Music ($10.99/month). If currently subscribed, existing subscription will be paused. Activation required for both. Valid through June 22, 2027.',
        enabledByDefault: true,
        benefitType: 'subscription',
        recurringAmount: 20.98,
        expiryDate: '2027-06-22'
      },
      {
        id: 'csr-lyft-credit',
        cardId: 'csr',
        title: 'Lyft Monthly Credit',
        description: '$10 monthly Lyft credit with 5X points on additional rides. Earn up to $120/year.',
        cashValue: 120,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['transportation', 'statement-credit'],
        terms: 'Up to $10 credit per calendar month for qualifying Lyft purchases. Additional rides (not covered by credit) earn 5X points. Valid through September 30, 2027. Credits expire monthly.',
        enabledByDefault: true,
        benefitType: 'credit',
        recurringAmount: 10,
        expiryDate: '2027-09-30'
      },
      {
        id: 'csr-peloton-credit',
        cardId: 'csr',
        title: 'Peloton Membership Credit',
        description: '$10 monthly credit for eligible Peloton memberships (All-Access, App+, Guide, Strength+). Plus 10X points on equipment purchases over $150.',
        cashValue: 120,
        cadence: 'monthly',
        resetAnchor: 'calendar-month',
        tags: ['fitness', 'subscription'],
        terms: 'Up to $10/month credit on eligible Peloton Memberships (All-Access, Rental, App+, Guide, App One, Strength+). Earn 10X points on Peloton purchases over $150 (up to $5,000 total). Activation required. Valid through December 31, 2027.',
        enabledByDefault: true,
        benefitType: 'subscription',
        recurringAmount: 10,
        expiryDate: '2027-12-31'
      },
      {
        id: 'csr-trusted-traveler',
        cardId: 'csr',
        title: 'Global Entry / TSA PreCheck / NEXUS',
        description: 'Up to $120 reimbursement every four years for trusted traveler application (annualized at $30/year).',
        cashValue: 30,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'reimbursement'],
        terms: 'Statement credit of up to $120 once every four years for Global Entry ($120), TSA PreCheck ($85), or NEXUS ($120) application fee. Tracked as $30 per year for planning purposes.',
        enabledByDefault: true,
        benefitType: 'reimbursement'
      },
      {
        id: 'csr-ihg-diamond-75k',
        cardId: 'csr',
        title: 'IHG Diamond Elite Status ($75K Spend)',
        description: 'Unlock IHG One Rewards Diamond Elite Status after spending $75,000 in a calendar year.',
        cashValue: 0,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['status', 'spending-threshold'],
        terms: 'Spend $75,000 in a calendar year to unlock IHG One Rewards Diamond Elite Status for remainder of year + following calendar year. Includes enhanced benefits over Platinum status.',
        enabledByDefault: false,
        benefitType: 'one-time'
      },
      {
        id: 'csr-shops-credit-75k',
        cardId: 'csr',
        title: 'The Shops at Chase Credit ($75K Spend)',
        description: 'Up to $250 credit for The Shops at Chase (Dyson, Sony, etc.) after $75,000 annual spend.',
        cashValue: 250,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['shopping', 'statement-credit', 'spending-threshold'],
        terms: 'Unlock $250 credit for purchases at The Shops at Chase after spending $75,000 in a calendar year. Features premium brands like Dyson and Sony.',
        enabledByDefault: false,
        benefitType: 'credit'
      },
      {
        id: 'csr-southwest-credit-75k',
        cardId: 'csr',
        title: 'Southwest Airlines Credit ($75K Spend)',
        description: 'Up to $500 Southwest credit for Chase Travel bookings after $75,000 annual spend.',
        cashValue: 500,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['travel', 'statement-credit', 'spending-threshold'],
        terms: 'Automatically applied statement credit up to $500 for Southwest Airlines purchases made on Chase Travel. Unlocked after spending $75,000 in a calendar year.',
        enabledByDefault: false,
        benefitType: 'credit'
      },
      {
        id: 'csr-southwest-alist-75k',
        cardId: 'csr',
        title: 'Southwest A-List Status ($75K Spend)',
        description: 'Unlock Southwest Rapid Rewards A-List Status after $75,000 annual spend.',
        cashValue: 0,
        cadence: 'annual',
        resetAnchor: 'calendar-year',
        tags: ['status', 'spending-threshold'],
        terms: 'Spend $75,000 in a calendar year to unlock Southwest Rapid Rewards A-List Status for remainder of year + following calendar year. Includes priority boarding, bonus points, and dedicated service.',
        enabledByDefault: false,
        benefitType: 'one-time'
      }
    ],
    additionalBenefits: [
      {
        id: 'csr-priority-pass',
        category: 'feature',
        title: 'Priority Pass Select Membership',
        description: 'Access to 1,300+ airport lounges worldwide with complimentary entry for you + 2 guests.',
        details: 'Priority Pass Select membership (normally $469/year) with free access for cardholder + 2 guests per visit. Additional guests pay $27 each. One-time activation required. Access to over 1,300 airport lounges globally.'
      },
      {
        id: 'csr-sapphire-lounges',
        category: 'feature',
        title: 'Chase Sapphire Lounge by The Club',
        description: 'Exclusive access to Chase Sapphire Lounges in Boston, NYC, Philadelphia, Phoenix, San Diego, Hong Kong.',
        details: 'Complimentary access to Chase Sapphire Lounges for cardholders and authorized users. Current locations: Boston (BOS), New York (LGA, JFK), Philadelphia (PHL), Phoenix (PHX), San Diego (SAN), Hong Kong (HKG). Coming soon: Las Vegas (LAS), Los Angeles (LAX), Dallas (DFW). Premium amenities include food, beverages, Wi-Fi, and comfortable seating.'
      },
      {
        id: 'csr-maple-leaf',
        category: 'feature',
        title: 'Air Canada Maple Leaf Lounge Access',
        description: 'Access to select Maple Leaf Lounges and Air Canada Cafes when flying Star Alliance.',
        details: 'Access to select Air Canada Maple Leaf Lounges and Air Canada Cafes in U.S., Canada, and Europe when departing on Star Alliance member airline flight. Guest fees additional. Normally available to Star Alliance Gold members; additional guests typically $59 each.'
      },
      {
        id: 'csr-ihg-platinum',
        category: 'status',
        title: 'IHG One Rewards Platinum Elite Status',
        description: '60% bonus points, exclusive rates, free internet, upgrades, Hertz Five Star status.',
        details: 'Complimentary IHG One Rewards Platinum Elite Status. Benefits: 60% bonus points on stays, exclusive member rates/promotions, free internet, complimentary upgrades (subject to availability), welcome points or drinks/snacks, early check-in/late checkout (subject to availability). Includes Hertz Gold Plus Rewards Five Star status (normally requires $2,000 Hertz spending). Coverage at 6,000+ global IHG locations. Points never expire.'
      },
      {
        id: 'csr-travel-designer',
        category: 'service',
        title: 'Reserve Travel Designer',
        description: 'Personalized travel planning with destination experts (up to $300 value per trip).',
        details: 'Access to travel designers who are destination experts. Work with them to create personalized itineraries tailored to your travel style. They handle all details before, during, and after the trip. Service valued at up to $300 per trip.'
      },
      {
        id: 'csr-points-boost',
        category: 'earning',
        title: 'Points Boost',
        description: 'Increase point value up to 2X on select hotels and flights through Chase Travel.',
        details: 'Points Boost increases the value of Ultimate Rewards points up to 2X on select trips booked through Chase Travel, including top hotels and some airline flights. Compare with transfer partner rates for best value.'
      },
      {
        id: 'csr-points-earning',
        category: 'earning',
        title: 'Ultimate Rewards Points',
        description: '8X on Chase Travel, 4X on direct bookings, 3X on dining, 1X everywhere else.',
        details: 'Earn 8X points on all purchases through Chase Travel (including The Edit), 4X points on flights and hotels booked directly with providers, 3X points on dining worldwide, and 1X points on all other purchases. Transfer points 1:1 to airline and hotel partners including Hyatt, United, Southwest, and more.'
      },
      {
        id: 'csr-no-ftf',
        category: 'feature',
        title: 'No Foreign Transaction Fees',
        description: 'Use card internationally without foreign transaction fees.',
        details: 'No foreign transaction fees on purchases made outside the U.S. Saves typical 3% fee on international purchases (e.g., $90 on $3,000 in charges).'
      },
      {
        id: 'csr-car-rental-primary',
        category: 'protection',
        title: 'Primary Auto Rental Insurance',
        description: 'Primary coverage up to $75,000 for rental car damage or theft.',
        details: 'Primary auto rental collision damage waiver coverage up to $75,000 for rental periods up to 31 consecutive days. Decline rental company\'s collision insurance and charge entire rental to card. Excludes: antique cars, cargo vans, open cargo bed vehicles, trucks (except pickups), motorcycles, mopeds, limousines, and passenger vans seating 9+.'
      },
      {
        id: 'csr-trip-cancel',
        category: 'protection',
        title: 'Trip Cancellation & Interruption',
        description: 'Up to $10,000 per person, $20,000 per trip for canceled/interrupted trips.',
        details: 'Reimbursement for prepaid, non-refundable travel expenses canceled or cut short due to unforeseen circumstances (illness, severe weather, qualifying situations). Coverage up to $10,000 per covered person and $20,000 per trip. Excludes: changes in plans, financial circumstances, business obligations, pre-existing conditions, travel after 26th week of pregnancy.'
      },
      {
        id: 'csr-trip-delay',
        category: 'protection',
        title: 'Trip Delay Reimbursement',
        description: 'Up to $500 per ticket for delays 6+ hours or requiring overnight stay.',
        details: 'Reimburses reasonable expenses during common carrier delays of 6+ hours or requiring overnight stay. Coverage up to $500 per ticket. Does not cover prepaid trip expenses or delays from hazards known prior to departure.'
      },
      {
        id: 'csr-travel-accident',
        category: 'protection',
        title: 'Travel Accident Insurance',
        description: 'Up to $1,000,000 coverage for accidental death or dismemberment.',
        details: 'Accidental death or dismemberment coverage up to $1,000,000 when purchasing air, bus, train, or cruise transportation with card. Excludes: emotional trauma, mental/physical illness, disease, pregnancy, childbirth, bodily malfunctions.'
      },
      {
        id: 'csr-baggage-delay',
        category: 'protection',
        title: 'Baggage Delay Insurance',
        description: 'Up to $100/day for 5 days ($500 total) if bag delayed 6+ hours.',
        details: 'Reimburses essential items (toiletries, clothing) up to $100 per day for up to 5 days ($500 total) when bag delayed 6+ hours. Excludes: hearing aids, artificial teeth, money, checks, tickets, business samples, jewelry, watches, cameras, recreational equipment.'
      },
      {
        id: 'csr-roadside',
        category: 'protection',
        title: 'Roadside Assistance',
        description: 'Up to $50 per incident, 4 times/year in U.S. and Canada.',
        details: '24/7 roadside assistance (towing, tire changing, jump starts, lockout service, fuel delivery, standard winching) up to $50 per incident, 4 times per year ($200 total). Excludes commercial vehicles and areas not regularly traveled by towing vehicles.'
      },
      {
        id: 'csr-emergency-medical',
        category: 'protection',
        title: 'Emergency Medical & Dental',
        description: 'Up to $2,500 coverage (minus $50 deductible) plus hotel recovery costs.',
        details: 'Reimburses emergency medical treatment up to $2,500 (subject to $50 deductible) for cardholder or immediate family while traveling. Additional $75/day for up to 5 days towards hotel room recovery if doctor orders post-hospital recovery. Excludes: travel for medical treatment, non-emergency services, experimental care, self-inflicted harm.'
      },
      {
        id: 'csr-emergency-evac',
        category: 'protection',
        title: 'Emergency Evacuation & Transportation',
        description: 'Up to $100,000 for emergency medical transport or repatriation.',
        details: 'Coverage up to $100,000 for emergency medical transportation, evacuation, or repatriation of remains. Applies to trips of 5-60 days and at least 100 miles from home. Excludes: non-emergency transportation, transportation covered by another party, experimental procedures.'
      },
      {
        id: 'csr-purchase-protection',
        category: 'protection',
        title: 'Purchase Protection',
        description: 'Up to $10,000 per item, $50,000/year for theft, damage, or loss.',
        details: 'Protects new retail purchases against theft, damage, or loss within 120 days of purchase. Coverage up to $10,000 per item, maximum $50,000 per year. Excludes: animals, living plants, antiques, collectibles, motorized vehicles, computer software, items for resale, medical equipment, perishables, travelers\' checks, pre-owned items.'
      },
      {
        id: 'csr-return-protection',
        category: 'protection',
        title: 'Return Protection',
        description: 'Up to $500 per item, $1,000/year if retailer won\'t accept return.',
        details: 'If retailer won\'t accept return within 90 days, Chase may reimburse purchase price up to $500 per item (maximum $1,000 per year). Excludes: animals, living plants, motorized vehicles, tickets, software, damaged/non-working items, formal attire, items for resale, items purchased outside U.S., altered items, jewelry, antiques, collectibles, medical equipment, perishables, seasonal items.'
      },
      {
        id: 'csr-extended-warranty',
        category: 'protection',
        title: 'Extended Warranty',
        description: 'Extends manufacturer warranties (3 years or less) by 1 additional year.',
        details: 'Extends U.S. manufacturer\'s warranty of 3 years or less by 1 additional year. Coverage up to $10,000 per claim, maximum $50,000 per account. Excludes: motorized vehicles, items for resale, rented/leased items, computer software, medical equipment, pre-owned items.'
      }
    ]
  }
];
