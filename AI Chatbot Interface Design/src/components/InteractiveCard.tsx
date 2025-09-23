import { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'primary' | 'secondary';
  hoverable?: boolean;
  clickable?: boolean;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}

export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ 
    variant = 'glass',
    hoverable = false,
    clickable = false,
    icon: Icon,
    badge,
    loading = false,
    className = '',
    children,
    onClick,
    ...props 
  }, ref) => {
    const variantClasses = {
      glass: clickable || hoverable ? 'interactive-card' : 'glass-container bg-white/5 border border-white/10 rounded-xl',
      primary: clickable || hoverable ? 'interactive-primary rounded-xl' : 'glass-container bg-primary/10 border border-primary/20 rounded-xl',
      secondary: clickable || hoverable ? 'interactive-secondary rounded-xl' : 'glass-container bg-secondary/10 border border-secondary/20 rounded-xl'
    };

    const combinedClasses = [
      'relative',
      variantClasses[variant],
      (clickable || onClick) ? 'cursor-pointer' : '',
      loading ? 'interactive-loading' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={combinedClasses}
        onClick={loading ? undefined : onClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        } : undefined}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <div className="relative z-10 p-4">
          {badge && (
            <div className="absolute top-2 right-2 z-10">
              {badge}
            </div>
          )}
          
          <div className={badge ? 'pr-24' : ''}>
          {Icon && (
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center border glass-container"
                style={{ 
                  background: variant === 'primary' ? 'rgba(68, 151, 205, 0.2)' :
                             variant === 'secondary' ? 'rgba(220, 119, 102, 0.2)' :
                             'rgba(255, 255, 255, 0.15)',
                  borderColor: variant === 'primary' ? 'rgba(68, 151, 205, 0.3)' :
                              variant === 'secondary' ? 'rgba(220, 119, 102, 0.3)' :
                              'rgba(255, 255, 255, 0.25)'
                }}
              >
                <Icon 
                  className="w-4 h-4" 
                  style={{ 
                    color: variant === 'primary' ? '#4497CD' :
                           variant === 'secondary' ? '#DC7766' :
                           '#4497CD',
                    strokeWidth: '2.5px'
                  }} 
                />
              </div>
            </div>
          )}
            
            {children}
          </div>
        </div>
      </div>
    );
  }
);

InteractiveCard.displayName = 'InteractiveCard';