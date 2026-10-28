import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/formatters';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          'bg-white rounded-3xl w-full border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
          maxWidths[maxWidth]
        )}
      >
        {title && (
          <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-bold text-slate-900 text-base">{title}</h3>
              {description && (
                <p className="text-xs text-slate-400 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </div>
  );
}
