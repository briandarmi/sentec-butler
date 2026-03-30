import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#1D1D1F] text-white hover:bg-[#323234]',
      secondary: 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED]',
      ghost: 'bg-transparent text-[#1D1D1F] hover:bg-[#F5F5F7]',
      danger: 'bg-[#FF3B30] text-white hover:bg-[#FF453A]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-white border border-[#E5E5E7] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]', className)} {...props}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'secondary'; className?: string }) => {
  const variants = {
    default: 'bg-[#F5F5F7] text-[#86868B]',
    success: 'bg-[#E4F2E6] text-[#248A3D]',
    warning: 'bg-[#FFF4E5] text-[#B25E09]',
    error: 'bg-[#FFE5E5] text-[#FF3B30]',
    secondary: 'bg-[#E5E5E7] text-[#1D1D1F]',
  };
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
};
