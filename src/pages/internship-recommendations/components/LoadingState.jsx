import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ currentLanguage = 'en' }) => {
  const loadingMessages = {
    en: [
      "Finding the perfect internships for you...",
      "Analyzing your profile and preferences...",
      "Matching you with top opportunities...",
      "Almost ready! Preparing your recommendations..."
    ],
    hi: [
      "आपके लिए सही इंटर्नशिप खोजी जा रही है...",
      "आपकी प्रोफाइल का विश्लेषण किया जा रहा है...",
      "आपको बेहतरीन अवसरों से जोड़ा जा रहा है...",
      "लगभग तैयार! आपकी सिफारिशें तैयार की जा रही हैं..."
    ]
  };

  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
  const messages = loadingMessages?.[currentLanguage] || loadingMessages?.en;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages?.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages?.length]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Loading Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Briefcase" size={32} className="text-primary animate-pulse" />
          </div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          
          {/* Progress Dots */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2, 3]?.map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMessageIndex 
                    ? 'bg-primary scale-125' :'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'hi' ? 'कृपया प्रतीक्षा करें' : 'Please Wait'}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed animate-fade-in">
            {messages?.[currentMessageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${((currentMessageIndex + 1) / messages?.length) * 100}%` 
            }}
          />
        </div>

        {/* Government Scheme Branding */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {currentLanguage === 'hi' ? 'पीएम इंटर्नशिप योजना' : 'PM Internship Scheme'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ?'भारत सरकार की आधिकारिक पहल' :'Official Government of India Initiative'
            }
          </p>
        </div>

        {/* Encouraging Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-heading font-semibold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ? 'इंटर्नशिप' : 'Internships'}
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-semibold text-success">95%</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ? 'मैच दर' : 'Match Rate'}
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-semibold text-accent">24/7</div>
            <div className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ? 'सहायता' : 'Support'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;