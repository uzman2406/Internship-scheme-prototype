import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Language Context for multilingual support
const LanguageContext = React.createContext({
  currentLanguage: 'en',
  setLanguage: () => {},
  languages: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ]
});

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Language context - in real app this would come from provider
  const { currentLanguage, setLanguage, languages } = useContext(LanguageContext);

  // Navigation items based on the workflow
  const navigationItems = [
    {
      path: '/language-selection',
      label: 'Language',
      icon: 'Globe',
      step: 1
    },
    {
      path: '/profile-setup-wizard',
      label: 'Profile Setup',
      icon: 'User',
      step: 2
    },
    {
      path: '/internship-recommendations',
      label: 'Recommendations',
      icon: 'Briefcase',
      step: 3
    },
    {
      path: '/application-confirmation',
      label: 'Apply',
      icon: 'CheckCircle',
      step: 4
    }
  ];

  // Get current step based on location
  const getCurrentStep = () => {
    const currentItem = navigationItems?.find(item => item?.path === location?.pathname);
    return currentItem ? currentItem?.step : 0;
  };

  const currentStep = getCurrentStep();
  const totalSteps = navigationItems?.length;

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    // In real app, this would update all UI text
  };

  // Handle navigation
  const handleNavigation = (path, step) => {
    // Only allow navigation to completed steps or current step
    if (step <= currentStep) {
      navigate(path);
    }
  };

  const currentLanguageData = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-heading font-semibold text-foreground">
                  InternshipMatcher
                </h1>
                <p className="text-xs text-muted-foreground font-caption">
                  PM Internship Scheme Portal
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator - Desktop */}
          <div className="hidden md:flex items-center space-x-1 flex-1 max-w-md mx-8">
            {navigationItems?.map((item, index) => (
              <div key={item?.path} className="flex items-center flex-1">
                <button
                  onClick={() => handleNavigation(item?.path, item?.step)}
                  disabled={item?.step > currentStep}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${item?.step === currentStep 
                      ? 'bg-primary text-primary-foreground shadow-interactive' 
                      : item?.step < currentStep
                        ? 'bg-success text-success-foreground hover:bg-success/90 cursor-pointer'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }
                    ${item?.step <= currentStep ? 'hover:scale-105' : ''}
                  `}
                >
                  <Icon 
                    name={item?.step < currentStep ? 'CheckCircle' : item?.icon} 
                    size={16} 
                  />
                  <span className="hidden lg:inline">{item?.label}</span>
                </button>
                {index < navigationItems?.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-2 transition-colors duration-200
                    ${item?.step < currentStep ? 'bg-success' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="touch-target"
              >
                <span className="text-lg mr-2">{currentLanguageData?.flag}</span>
                <span className="hidden sm:inline">{currentLanguageData?.name}</span>
                <Icon name="ChevronDown" size={16} className="ml-1" />
              </Button>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-interactive z-50">
                  <div className="py-2">
                    {languages?.map((language) => (
                      <button
                        key={language?.code}
                        onClick={() => handleLanguageChange(language?.code)}
                        className={`
                          w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-150
                          flex items-center space-x-3 touch-target
                          ${language?.code === currentLanguage ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'}
                        `}
                      >
                        <span className="text-lg">{language?.flag}</span>
                        <span className="font-medium">{language?.name}</span>
                        {language?.code === currentLanguage && (
                          <Icon name="Check" size={16} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden touch-target"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between px-4 mb-3">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="px-4 mb-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-1">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => {
                      handleNavigation(item?.path, item?.step);
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={item?.step > currentStep}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200
                      ${item?.step === currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : item?.step < currentStep
                          ? 'bg-success/10 text-success hover:bg-success/20' :'text-muted-foreground cursor-not-allowed'
                      }
                      ${item?.step <= currentStep ? 'hover:bg-opacity-90' : ''}
                    `}
                  >
                    <Icon 
                      name={item?.step < currentStep ? 'CheckCircle' : item?.icon} 
                      size={20} 
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs opacity-75">Step {item?.step}</div>
                    </div>
                    {item?.step < currentStep && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;