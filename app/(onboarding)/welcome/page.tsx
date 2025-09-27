"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CardPicker } from '@/components/onboarding/card-picker';
import { useJuiceState } from '@/hooks/use-juice-state';

export default function WelcomePage() {
  const router = useRouter();
  const { selectedCards } = useJuiceState();

  useEffect(() => {
    if (selectedCards.length > 0) {
      router.replace('/dashboard');
    }
  }, [router, selectedCards]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16">
      <motion.section
        className="space-y-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-xs uppercase tracking-widest text-primary">Juice</p>
        <h1 className="text-4xl font-semibold tracking-tight">Maximize credit card rewards</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">Add a card to start tracking rewards.</p>
        <div className="flex items-center justify-center">
          <CardPicker />
        </div>
      </motion.section>
    </div>
  );
}
