import { SummaryCards } from '@/components/dashboard/summary-cards';
import { CardStack } from '@/components/dashboard/card-stack';
import { DashboardFilterProvider } from '@/hooks/use-dashboard-filters';

export default function DashboardPage() {
  return (
    <DashboardFilterProvider>
      <div className="space-y-8">
        <SummaryCards />
        <section>
          <CardStack />
        </section>
      </div>
    </DashboardFilterProvider>
  );
}
