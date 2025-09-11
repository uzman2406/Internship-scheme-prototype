import React from 'react';
import LanguageCard from './LanguageCard';

const LanguageGrid = ({ 
  languages, 
  selectedLanguage, 
  onLanguageSelect,
  className = '' 
}) => {
  return (
    <div className={`
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-4 sm:gap-6 max-w-4xl mx-auto
      ${className}
    `}>
      {languages?.map((language) => (
        <LanguageCard
          key={language?.code}
          language={language}
          isSelected={selectedLanguage === language?.code}
          onClick={onLanguageSelect}
          className="min-h-[160px] sm:min-h-[180px]"
        />
      ))}
    </div>
  );
};

export default LanguageGrid;