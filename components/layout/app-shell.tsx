'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { href: '/history', label: 'History', icon: ClockIcon },
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/dashboard" className="text-base font-semibold">
          Juice Tracker
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href && 'bg-primary/10 text-primary'
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden />
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
