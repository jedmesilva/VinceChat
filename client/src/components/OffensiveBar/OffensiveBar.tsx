import React from 'react';

interface OffensiveBarProps {
  count: number;
  label?: string;
  backgroundColor?: string;
  textColor?: string;
  badgeColor?: string;
}

const OffensiveBar: React.FC<OffensiveBarProps> = ({ 
  count = 0,
  label = "Ofensivas em andamento",
  backgroundColor = "bg-violet-500",
  textColor = "text-white",
  badgeColor = "bg-violet-600"
}) => {
  return (
    <div className={`${backgroundColor} px-4 py-1.5`}>
      <div className={`flex items-center gap-2 text-sm ${textColor}`}>
        <span className={`${badgeColor} px-2 py-0.5 rounded-lg font-bold`}>
          {count}
        </span>
        <span className="font-medium">
          {label}
        </span>
      </div>
    </div>
  );
};

export default OffensiveBar;