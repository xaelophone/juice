import Link from 'next/link';
import { CardPicker } from '@/components/onboarding/card-picker';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16">
      <section className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-widest text-primary">Juice your cards</p>
        <h1 className="text-4xl font-semibold tracking-tight">Unlock every perk without spreadsheets</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Turn annual fees into profit. Add your premium cards, toggle the perks that matter, and track your real-world
          ROI across monthly, quarterly, and annual reset windows.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/history">View history</Link>
          </Button>
        </div>
      </section>
      <section className="space-y-6">
        <header className="space-y-2 text-left">
          <h2 className="text-2xl font-semibold">Add a card</h2>
          <p className="text-sm text-muted-foreground">
            Select a card to preload its 2025 perks. You can enable or disable individual perks after setup.
          </p>
        </header>
        <CardPicker />
      </section>
    </div>
  );
}
