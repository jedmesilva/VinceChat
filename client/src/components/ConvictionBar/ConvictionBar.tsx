import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

interface ConvictionBarProps {
  conviction: number;
  animated?: boolean;
  label?: string;
  showIcon?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ConvictionBar: React.FC<ConvictionBarProps> = ({ 
  conviction = 75, 
  animated = true, 
  label = "Convencimento",
  showIcon = true,
  showPercentage = true,
  size = "sm"
}) => {
  const [displayConviction, setDisplayConviction] = useState(animated ? 0 : conviction);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayConviction(conviction);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayConviction(conviction);
    }
  }, [conviction, animated]);

  const getPurpleIntensity = (conv: number) => {
    if (conv >= 90) return 'full';
    if (conv >= 75) return 'high';
    if (conv >= 60) return 'medium';
    if (conv >= 40) return 'low';
    return 'minimal';
  };

  const getGradientClass = (intensity: string) => {
    const gradients = {
      full: 'from-violet-500 to-violet-600',
      high: 'from-violet-400 to-violet-500',
      medium: 'from-violet-300 to-violet-400',
      low: 'from-violet-200 to-violet-300',
      minimal: 'from-violet-100 to-violet-200'
    };
    return gradients[intensity] || gradients.full;
  };

  const getTextColor = (intensity: string) => {
    const textColors = {
      full: 'text-violet-400',
      high: 'text-violet-400',
      medium: 'text-violet-300',
      low: 'text-violet-300',
      minimal: 'text-violet-200'
    };
    return textColors[intensity] || textColors.full;
  };

  const sizeClasses = {
    container: 'px-4 py-2',
    icon: 'w-6 h-6',
    iconSize: 14,
    barHeight: 'h-1.5',
    text: 'text-xs',
    percentage: 'text-sm'
  };

  const intensity = getPurpleIntensity(displayConviction);
  const gradientClass = getGradientClass(intensity);
  const textColorClass = getTextColor(intensity);

  return (
    <div className={sizeClasses.container}>
      <div className="flex items-center gap-4">
        {showIcon && (
          <div className="flex-shrink-0">
            <div className={`${sizeClasses.icon} bg-violet-500/20 rounded-lg flex items-center justify-center`}>
              <Brain size={sizeClasses.iconSize} className="text-violet-400" />
            </div>
          </div>
        )}

        <div className="flex-1 flex items-center gap-3">
          <span className={`${sizeClasses.text} font-medium text-slate-300 flex-shrink-0`}>
            {label}
          </span>
          <div className={`flex-1 ${sizeClasses.barHeight} bg-slate-800 rounded-full overflow-hidden min-w-0`}>
            <div 
              className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-1000 ease-out rounded-full relative`}
              style={{ width: `${displayConviction}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {showPercentage && (
          <div className="flex-shrink-0">
            <span className={`${sizeClasses.percentage} font-bold font-mono ${textColorClass}`}>
              {displayConviction}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvictionBar;