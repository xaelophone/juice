import { ManageCardsButton } from '@/components/settings/manage-cards-button';
import { CurrencyForm } from '@/components/settings/currency-form';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <ManageCardsButton />
      <CurrencyForm />
    </div>
  );
}
