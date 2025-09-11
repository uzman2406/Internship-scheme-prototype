import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageCard = ({ 
  language, 
  isSelected, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      onClick={() => onClick(language?.code)}
      className={`
        w-full p-6 rounded-xl border-2 transition-all duration-200 touch-target
        hover:scale-105 hover:shadow-interactive active:scale-95
        ${isSelected 
          ? 'border-primary bg-primary/10 shadow-interactive' 
          : 'border-border bg-card hover:border-primary/50'
        }
        ${className}
      `}
      aria-pressed={isSelected}
      aria-label={`Select ${language?.name} language`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Flag Icon */}
        <div className="text-4xl sm:text-5xl">
          {language?.flag}
        </div>
        
        {/* Language Name in Native Script */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-1">
            {language?.nativeName}
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            {language?.name}
          </p>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="CheckCircle" size={20} />
            <span className="text-sm font-medium">Selected</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default LanguageCard;