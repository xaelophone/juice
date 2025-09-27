import { SummaryCards } from '@/components/dashboard/summary-cards';
import { CardStack } from '@/components/dashboard/card-stack';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-primary">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight">Track your rewards</h1>
        <p className="text-sm text-muted-foreground">
          Monitor value captured versus potential, and mark perks as used to keep your return on investment accurate.
        </p>
      </header>
      <SummaryCards />
      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold">Card stacks</h2>
          <p className="text-sm text-muted-foreground">Perk checklists grouped by quarter and benefit cadence.</p>
        </header>
        <CardStack />
      </section>
    </div>
  );
}
