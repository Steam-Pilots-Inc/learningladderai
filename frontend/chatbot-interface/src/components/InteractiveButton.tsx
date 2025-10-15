import { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'card';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  state?: 'default' | 'loading' | 'success' | 'disabled';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  pulse?: boolean;
  glow?: boolean;
  children?: React.ReactNode;
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    variant = 'glass', 
    size = 'md', 
    state = 'default',
    icon: Icon,
    iconPosition = 'left',
    pulse = false,
    glow = false,
    className = '',
    children,
    disabled,
    ...props 
  }, ref) => {
    const variantClasses = {
      primary: 'interactive-primary',
      secondary: 'interactive-secondary', 
      glass: 'interactive-glass',
      card: 'interactive-card'
    };

    const sizeClasses = {
      xs: 'btn-xs text-xs',
      sm: 'btn-sm text-sm', 
      md: 'btn-md text-sm',
      lg: 'btn-lg text-base'
    };

    const effectClasses = [
      pulse && variant === 'primary' ? 'pulse-primary' : '',
      pulse && variant === 'secondary' ? 'pulse-secondary' : '',
      glow && variant === 'primary' ? 'glow-primary' : '',
      glow && variant === 'secondary' ? 'glow-secondary' : ''
    ].filter(Boolean).join(' ');

    const combinedClasses = [
      'font-medium rounded-lg inline-flex items-center justify-center gap-2',
      variantClasses[variant],
      sizeClasses[size],
      state === 'loading' ? 'interactive-loading' : '',
      state === 'success' ? 'interactive-success' : '',
      state === 'disabled' ? 'interactive-disabled' : '',
      effectClasses,
      className
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || state === 'disabled' || state === 'loading';

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={isDisabled}
        {...props}
      >
        {state === 'loading' && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        
        {Icon && iconPosition === 'left' && state !== 'loading' && (
          <Icon className="w-4 h-4" />
        )}
        
        {children}
        
        {Icon && iconPosition === 'right' && state !== 'loading' && (
          <Icon className="w-4 h-4" />
        )}
        
        {state === 'success' && (
          <div className="w-4 h-4 text-green-500">✓</div>
        )}
      </button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';