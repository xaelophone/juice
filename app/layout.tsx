import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Juice Rewards Tracker',
  description: 'Track and maximize credit card perks across annual, quarterly, and monthly reset windows.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans text-sm text-foreground', inter.className)}>
        {children}
      </body>
    </html>
  );
}
