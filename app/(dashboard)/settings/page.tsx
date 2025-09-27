import { CurrencyForm } from '@/components/settings/currency-form';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-primary">Settings</p>
        <h1 className="text-3xl font-semibold tracking-tight">Personalize the tracker</h1>
        <p className="text-sm text-muted-foreground">
          Configure currency display and fine-tune fast input defaults for your hackathon demo.
        </p>
      </header>
      <CurrencyForm />
    </div>
  );
}
