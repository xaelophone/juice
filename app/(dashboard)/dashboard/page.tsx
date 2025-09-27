import { SummaryCards } from '@/components/dashboard/summary-cards';
import { CardStack } from '@/components/dashboard/card-stack';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <SummaryCards />
      <section>
        <CardStack />
      </section>
    </div>
  );
}
