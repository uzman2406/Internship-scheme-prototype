import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageToggle = ({ 
  currentLanguage = 'en',
  onLanguageChange = () => {},
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' }
  ],
  variant = 'dropdown', // 'dropdown' | 'inline' | 'compact'
  showNativeName = true,
  position = 'bottom-right' // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Get current language data
  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target) &&
          buttonRef?.current && !buttonRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle language selection
  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('preferred-language', languageCode);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, languageCode) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleLanguageSelect(languageCode);
    } else if (event?.key === 'Escape') {
      setIsOpen(false);
      buttonRef?.current?.focus();
    }
  };

  // Get dropdown position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'left-0 top-full mt-2';
      case 'top-right':
        return 'right-0 bottom-full mb-2';
      case 'top-left':
        return 'left-0 bottom-full mb-2';
      default: // bottom-right
        return 'right-0 top-full mt-2';
    }
  };

  // Inline variant - shows all languages as buttons
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {languages?.map((language) => (
          <Button
            key={language?.code}
            variant={language?.code === currentLanguage ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageSelect(language?.code)}
            className="touch-target"
          >
            <span className="text-base mr-2">{language?.flag}</span>
            <span className="text-sm">
              {showNativeName ? language?.nativeName : language?.name}
            </span>
          </Button>
        ))}
      </div>
    );
  }

  // Compact variant - minimal display
  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center space-x-1 px-2 py-1 rounded-md border border-border
            hover:bg-muted transition-colors duration-150 touch-target
            ${isOpen ? 'bg-muted' : 'bg-background'}
          `}
          aria-label={`Current language: ${currentLang?.name}. Click to change language.`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="text-lg">{currentLang?.flag}</span>
          <Icon name="ChevronDown" size={14} className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div 
            ref={dropdownRef}
            className={`absolute ${getPositionClasses()} w-40 bg-popover border border-border rounded-lg shadow-interactive z-50 animate-fade-in`}
            role="listbox"
            aria-label="Language selection"
          >
            <div className="py-1">
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageSelect(language?.code)}
                  onKeyDown={(e) => handleKeyDown(e, language?.code)}
                  role="option"
                  aria-selected={language?.code === currentLanguage}
                  className={`
                    w-full px-3 py-2 text-left hover:bg-muted transition-colors duration-150
                    flex items-center space-x-2 touch-target text-sm
                    ${language?.code === currentLanguage ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'}
                  `}
                >
                  <span className="text-base">{language?.flag}</span>
                  <span className="truncate">
                    {showNativeName ? language?.nativeName : language?.name}
                  </span>
                  {language?.code === currentLanguage && (
                    <Icon name="Check" size={14} className="ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target"
        aria-label={`Current language: ${currentLang?.name}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg mr-2">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">
          {showNativeName ? currentLang?.nativeName : currentLang?.name}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`ml-1 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>
      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`absolute ${getPositionClasses()} w-48 bg-popover border border-border rounded-lg shadow-interactive z-50 animate-fade-in`}
          role="listbox"
          aria-label="Language selection"
        >
          <div className="py-2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              Select Language
            </div>
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                onKeyDown={(e) => handleKeyDown(e, language?.code)}
                role="option"
                aria-selected={language?.code === currentLanguage}
                className={`
                  w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150
                  flex items-center space-x-3 touch-target
                  ${language?.code === currentLanguage ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'}
                `}
              >
                <span className="text-lg flex-shrink-0">{language?.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {showNativeName ? language?.nativeName : language?.name}
                  </div>
                  {showNativeName && language?.nativeName !== language?.name && (
                    <div className="text-xs opacity-75 truncate">
                      {language?.name}
                    </div>
                  )}
                </div>
                {language?.code === currentLanguage && (
                  <Icon name="Check" size={16} className="flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;