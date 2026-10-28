import React from 'react';
import { cn } from '../utils/formatters';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'rose';
  className?: string;
}

export function Badge({ children, variant = 'slate', className }: BadgeProps) {
  const variants = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-100/80',
    blue: 'bg-blue-50 text-blue-700 border-blue-100/80',
    slate: 'bg-slate-50 text-slate-600 border-slate-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-100/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
