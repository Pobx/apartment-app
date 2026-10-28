import React from 'react';
import { cn } from '../utils/formatters';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
    outline:
      'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
    ghost:
      'bg-transparent hover:bg-slate-100/70 text-slate-600',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
