import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-violet-400',
  iconBg = 'bg-violet-500/20',
  className = '',
  children,
  actions
}) => {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Left side - Icon, Title, Subtitle */}
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-slate-400">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          {actions && (
            <div className="flex items-center gap-4">
              {actions}
            </div>
          )}
        </div>

        {/* Additional content */}
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;