import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LanguageGrid from './components/LanguageGrid';
import ContinueButton from './components/ContinueButton';
import ProgressIndicator from './components/ProgressIndicator';
import AccessibilityFeatures from './components/AccessibilityFeatures';

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Available languages for the PM Internship Scheme
  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English', 
      flag: '🇺🇸',
      region: 'Global'
    },
    { 
      code: 'hi', 
      name: 'Hindi', 
      nativeName: 'हिंदी', 
      flag: '🇮🇳',
      region: 'North India'
    },
    { 
      code: 'bn', 
      name: 'Bengali', 
      nativeName: 'বাংলা', 
      flag: '🇧🇩',
      region: 'West Bengal'
    },
    { 
      code: 'te', 
      name: 'Telugu', 
      nativeName: 'తెలుగు', 
      flag: '🇮🇳',
      region: 'Andhra Pradesh'
    },
    { 
      code: 'ta', 
      name: 'Tamil', 
      nativeName: 'தமிழ்', 
      flag: '🇮🇳',
      region: 'Tamil Nadu'
    },
    { 
      code: 'gu', 
      name: 'Gujarati', 
      nativeName: 'ગુજરાતી', 
      flag: '🇮🇳',
      region: 'Gujarat'
    },
    { 
      code: 'mr', 
      name: 'Marathi', 
      nativeName: 'मराठी', 
      flag: '🇮🇳',
      region: 'Maharashtra'
    },
    { 
      code: 'kn', 
      name: 'Kannada', 
      nativeName: 'ಕನ್ನಡ', 
      flag: '🇮🇳',
      region: 'Karnataka'
    }
  ];

  // Load saved language preference on component mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Could not load language preference:', error);
    }
  }, []);

  // Handle language selection
  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    
    // Provide visual feedback
    const selectedCard = document.querySelector(`[aria-pressed="true"]`);
    if (selectedCard) {
      selectedCard?.classList?.add('animate-micro-celebration');
      setTimeout(() => {
        selectedCard?.classList?.remove('animate-micro-celebration');
      }, 200);
    }

    // Save to localStorage
    try {
      localStorage.setItem('preferred-language', languageCode);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  };

  // Handle continue action
  const handleContinue = () => {
    setIsLoading(true);
    
    // Simulate brief loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      // Navigation is handled by ContinueButton component
    }, 500);
  };

  // Handle text-to-speech
  const handleTextToSpeech = (text) => {
    console.log('Playing audio:', text);
  };

  return (
    <>
      <Helmet>
        <title>Language Selection - PM Internship Scheme</title>
        <meta name="description" content="Choose your preferred language for the PM Internship Scheme application process. Available in multiple Indian languages." />
        <meta name="keywords" content="PM Internship Scheme, language selection, Hindi, English, regional languages, government internship" />
        <meta property="og:title" content="Language Selection - PM Internship Scheme" />
        <meta property="og:description" content="Select your preferred language to start your internship journey with the PM Internship Scheme." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content Container */}
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={1} 
            totalSteps={4}
            className="mb-8 sm:mb-12"
          />

          {/* Welcome Header */}
          <WelcomeHeader currentLanguage={selectedLanguage || 'en'} />

          {/* Accessibility Features */}
          <AccessibilityFeatures
            selectedLanguage={selectedLanguage || 'en'}
            onTextToSpeech={handleTextToSpeech}
            className="mb-8 sm:mb-12"
          />

          {/* Language Selection Grid */}
          <div className="mb-8 sm:mb-12">
            <LanguageGrid
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
            />
          </div>

          {/* Continue Button */}
          <ContinueButton
            selectedLanguage={selectedLanguage}
            onContinue={handleContinue}
            disabled={isLoading}
            className="mb-8"
          />

          {/* Additional Information */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                About PM Internship Scheme
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Prime Minister's Internship Scheme is a Government of India initiative designed to provide 
                practical work experience to young professionals and students across various sectors.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Government Initiative
                </span>
                <span className="bg-success/10 text-success px-3 py-1 rounded-full">
                  Skill Development
                </span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                  Career Growth
                </span>
              </div>
            </div>
          </div>

          {/* Footer Information */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Government of India. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PM Internship Scheme - Empowering India's Youth
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSelection;