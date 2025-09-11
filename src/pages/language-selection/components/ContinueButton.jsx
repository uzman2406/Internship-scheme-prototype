import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const ContinueButton = ({ 
  selectedLanguage, 
  onContinue,
  disabled = false,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedLanguage && !disabled) {
      onContinue();
      navigate('/profile-setup-wizard');
    }
  };

  // Button text based on selected language
  const buttonText = {
    en: "Continue to Profile Setup",
    hi: "प्रोफाइल सेटअप पर जाएं",
    bn: "প্রোফাইল সেটআপে যান",
    te: "ప్రొఫైల్ సెటప్‌కు వెళ్లండి",
    ta: "சுயவிவர அமைப்புக்கு செல்லுங்கள்",
    gu: "પ્રોફાઇલ સેટઅપ પર જાઓ",
    mr: "प्रोफाइल सेटअप वर जा",
    kn: "ಪ್ರೊಫೈಲ್ ಸೆಟಪ್‌ಗೆ ಹೋಗಿ"
  };

  const text = buttonText?.[selectedLanguage] || buttonText?.en;

  return (
    <div className={`text-center ${className}`}>
      <Button
        variant="default"
        size="lg"
        onClick={handleContinue}
        disabled={!selectedLanguage || disabled}
        iconName="ArrowRight"
        iconPosition="right"
        className="px-8 py-4 text-lg font-medium min-w-[200px] sm:min-w-[280px]"
      >
        {text}
      </Button>
      
      {!selectedLanguage && (
        <p className="text-sm text-muted-foreground mt-3">
          Please select a language to continue
        </p>
      )}
    </div>
  );
};

export default ContinueButton;