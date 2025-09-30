'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';
import type { Card } from '@/types';

interface CardInfoDialogProps {
  card: Card;
  children: React.ReactNode;
}

const CARD_INFO: Record<string, { description: string; officialUrl: string; keyBenefits: string[] }> = {
  'amex-platinum': {
    description: 'Premium travel card offering over $3,500 in annual statement credits for luxury travel, dining, fitness, and entertainment, plus elite status and exclusive airport lounge access.',
    officialUrl: 'https://www.americanexpress.com/us/credit-cards/card/platinum/',
    keyBenefits: [
      'Hotel Credit — $600/year',
      'Resy Dining Credit — $400/year',
      'Lululemon Credit — $300/year',
      'Digital Entertainment Credit — $300/year',
      'Equinox Credit — $300/year',
      'CLEAR Plus Credit — $209/year',
      'Airline Fee Credit — $200/year',
      'Uber Cash — $200/year',
      'Global Lounge Collection Access',
      'Marriott Bonvoy Gold Elite Status',
      'Hilton Honors Gold Status'
    ]
  },
  'csr': {
    description: 'Premium travel rewards card with $2,700+ in annual credits for travel, dining, entertainment, and wellness. Features 8X points on Chase Travel and complimentary IHG Platinum Elite status.',
    officialUrl: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve',
    keyBenefits: [
      'The Edit Hotel Credit — $500/year',
      'DoorDash Credits & DashPass — $420/year',
      'Annual Travel Credit — $300/year',
      'Exclusive Dining Credit — $300/year',
      'StubHub & Viagogo Credit — $300/year',
      'Apple TV+ and Apple Music — $250/year',
      'Lyft Credit — $120/year',
      'Peloton Credit — $120/year',
      'Priority Pass Select Membership',
      'IHG One Rewards Platinum Elite Status',
      'Primary Auto Rental Insurance'
    ]
  }
};

export function CardInfoDialog({ card, children }: CardInfoDialogProps) {
  const [open, setOpen] = useState(false);
  const info = CARD_INFO[card.id];

  if (!info) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{card.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Key Benefits
            </h3>
            <ul className="space-y-2">
              {info.keyBenefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={info.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View official card details
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
