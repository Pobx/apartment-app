import React from 'react';
import { cn } from '../utils/formatters';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
