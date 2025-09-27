import { HistoryTimeline } from '@/components/history/timeline';

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-primary">History</p>
        <h1 className="text-3xl font-semibold tracking-tight">Timeline</h1>
        <p className="text-sm text-muted-foreground">
          View completed perks, add notes, and attach receipts for future reference.
        </p>
      </header>
      <HistoryTimeline />
    </div>
  );
}
