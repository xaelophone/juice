import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full border border-border/20 bg-muted/80 shadow-inner',
        className
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      {...props}
    >
      <div
        className="absolute inset-y-0 left-0 h-full rounded-full bg-blue-500 transition-[width] duration-300 ease-out"
        style={{ width: clamped <= 0 ? '0%' : `max(${clamped}%, 4px)` }}
      />
    </div>
  );
});
Progress.displayName = 'Progress';

export { Progress };
