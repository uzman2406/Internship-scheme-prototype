import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const AccessibilityFeatures = ({ 
  selectedLanguage,
  onTextToSpeech,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Text content for different languages
  const speechContent = {
    en: "Welcome to PM Internship Scheme. Choose your preferred language to get started with finding the perfect internship opportunity for you.",
    hi: "पीएम इंटर्नशिप योजना में आपका स्वागत है। अपने लिए सही इंटर्नशिप अवसर खोजने के लिए अपनी पसंदीदा भाषा चुनें।"
  };

  const handleTextToSpeech = () => {
    const text = speechContent?.[selectedLanguage] || speechContent?.en;
    
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis?.cancel();
      
      if (!isPlaying) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        
        window.speechSynthesis?.speak(utterance);
        onTextToSpeech && onTextToSpeech(text);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 ${className}`}>
      {/* Text-to-Speech Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleTextToSpeech}
        iconName={isPlaying ? "VolumeX" : "Volume2"}
        iconPosition="left"
        className="touch-target"
      >
        {isPlaying ? "Stop Audio" : "Listen to Instructions"}
      </Button>
      {/* High Contrast Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          document.body?.classList?.toggle('high-contrast');
        }}
        iconName="Eye"
        iconPosition="left"
        className="touch-target"
      >
        High Contrast
      </Button>
      {/* Font Size Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const currentSize = document.documentElement?.style?.fontSize;
          const newSize = currentSize === '18px' ? '16px' : '18px';
          document.documentElement.style.fontSize = newSize;
        }}
        iconName="Type"
        iconPosition="left"
        className="touch-target"
      >
        Large Text
      </Button>
    </div>
  );
};

export default AccessibilityFeatures;