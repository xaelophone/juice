'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/format';
import { Completion, Perk } from '@/types';

interface PerkDetailDialogProps {
  perk: Perk;
  trigger: React.ReactNode;
  completions: Completion[];
  currency: string;
  onSubmit: (data: Pick<Completion, 'date' | 'amount' | 'note'>) => void;
  onRemoveCompletion: (completionId: string) => void;
}

export function PerkDetailDialog({
  perk,
  trigger,
  completions,
  currency,
  onSubmit,
  onRemoveCompletion
}: PerkDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const remaining = Math.max(
    0,
    perk.cashValue - completions.reduce((total, completion) => total + completion.amount, 0)
  );

  const handleSave = () => {
    const parsedAmount = Number(amount);
    if (!date || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }
    onSubmit({ date, amount: parsedAmount, note: note || undefined });
    setAmount('');
    setNote('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{perk.title}</DialogTitle>
          <DialogDescription>{perk.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
            <span className="font-medium">Remaining this period</span>
            <span>{formatCurrency(remaining, currency)}</span>
          </p>
          <div className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-xs font-medium uppercase text-muted-foreground">Date</span>
              <Input type="date" value={date} onChange={event => setDate(event.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium uppercase text-muted-foreground">Amount</span>
              <Input
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                placeholder="Amount used"
                value={amount}
                onChange={event => setAmount(event.target.value)}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium uppercase text-muted-foreground">Note</span>
              <Textarea
                placeholder="Add an optional note"
                value={note}
                onChange={event => setNote(event.target.value)}
              />
            </label>
            <Button
              onClick={handleSave}
              variant="outline"
              className="w-full border-emerald-500 text-emerald-700 shadow-md transition-shadow hover:bg-emerald-500 hover:text-white hover:shadow-lg sm:w-auto disabled:border-emerald-200 disabled:text-emerald-300 disabled:shadow-none"
            >
              Claim credit
            </Button>
          </div>
        </div>
        {completions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Completions</p>
            <ul className="space-y-2 text-sm">
              {completions.map(completion => (
                <li key={completion.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{formatCurrency(completion.amount, currency)}</span>
                    <span className="text-xs text-muted-foreground">{completion.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onRemoveCompletion(completion.id)}>
                    Undo
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
