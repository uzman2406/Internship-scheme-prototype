import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LanguageToggle from '../../components/ui/LanguageToggle';
import AudioControl from '../../components/ui/AudioControl';
import Icon from '../../components/AppIcon';

// Import step components
import EducationStep from './components/EducationStep';
import SkillsStep from './components/SkillsStep';
import InterestsStep from './components/InterestsStep';
import LocationStep from './components/LocationStep';
import WizardNavigation from './components/WizardNavigation';
import StepIndicator from './components/StepIndicator';

const ProfileSetupWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    interests: [],
    state: '',
    district: '',
    workPreference: 'local'
  });

  const totalSteps = 4;

  // Load saved language preference
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Could not load language preference:', error);
    }
  }, []);

  // Load saved form data
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('profile-wizard-data');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.warn('Could not load saved form data:', error);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('profile-wizard-data', JSON.stringify(formData));
    } catch (error) {
      console.warn('Could not save form data:', error);
    }
  }, [formData]);

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    try {
      localStorage.setItem('preferred-language', languageCode);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  };

  // Handle form data change
  const handleFormDataChange = (newData) => {
    setFormData(newData);
    // Clear errors for changed fields
    const changedFields = Object.keys(newData)?.filter(key => newData?.[key] !== formData?.[key]);
    if (changedFields?.length > 0) {
      const newErrors = { ...errors };
      changedFields?.forEach(field => {
        delete newErrors?.[field];
      });
      setErrors(newErrors);
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Education
        if (!formData?.education) {
          newErrors.education = currentLanguage === 'hi' ?'कृपया अपनी शिक्षा का स्तर चुनें' :'Please select your education level';
        }
        break;

      case 2: // Skills
        if (!formData?.skills || formData?.skills?.length < 3) {
          newErrors.skills = currentLanguage === 'hi' ?'कम से कम 3 कौशल चुनें' :'Please select at least 3 skills';
        }
        break;

      case 3: // Interests
        if (!formData?.interests || formData?.interests?.length === 0) {
          newErrors.interests = currentLanguage === 'hi' ?'कम से कम 1 रुचि का क्षेत्र चुनें' :'Please select at least 1 area of interest';
        }
        if (formData?.interests && formData?.interests?.length > 3) {
          newErrors.interests = currentLanguage === 'hi' ?'अधिकतम 3 क्षेत्र चुन सकते हैं' :'You can select maximum 3 areas of interest';
        }
        break;

      case 4: // Location
        if (!formData?.state) {
          newErrors.state = currentLanguage === 'hi' ?'कृपया अपना राज्य चुनें' :'Please select your state';
        }
        if (!formData?.district) {
          newErrors.district = currentLanguage === 'hi' ?'कृपया अपना जिला चुनें' :'Please select your district';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save completed profile data
      const profileData = {
        ...formData,
        completedAt: new Date()?.toISOString(),
        language: currentLanguage
      };

      localStorage.setItem('user-profile', JSON.stringify(profileData));
      localStorage.removeItem('profile-wizard-data'); // Clear wizard data

      // Navigate to recommendations
      navigate('/internship-recommendations');
    } catch (error) {
      console.error('Profile submission failed:', error);
      setErrors({
        submit: currentLanguage === 'hi' ?'प्रोफाइल सबमिट करने में त्रुटि हुई' :'Failed to submit profile. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get current step component
  const getCurrentStepComponent = () => {
    const commonProps = {
      formData,
      onFormDataChange: handleFormDataChange,
      errors,
      currentLanguage
    };

    switch (currentStep) {
      case 1:
        return <EducationStep {...commonProps} />;
      case 2:
        return <SkillsStep {...commonProps} />;
      case 3:
        return <InterestsStep {...commonProps} />;
      case 4:
        return <LocationStep {...commonProps} />;
      default:
        return <EducationStep {...commonProps} />;
    }
  };

  // Get step content for audio
  const getStepAudioContent = () => {
    const stepTitles = {
      1: currentLanguage === 'hi' ? 'शिक्षा स्तर चुनें' : 'Select your education level',
      2: currentLanguage === 'hi' ? 'अपने कौशल चुनें' : 'Choose your skills',
      3: currentLanguage === 'hi' ? 'रुचि के क्षेत्र चुनें' : 'Select areas of interest',
      4: currentLanguage === 'hi' ? 'स्थान की जानकारी दें' : 'Provide location information'
    };

    const stepDescriptions = {
      1: currentLanguage === 'hi' ?'अपनी सबसे उच्च शिक्षा योग्यता चुनें। यह जानकारी आपके लिए उपयुक्त इंटर्नशिप खोजने में मदद करेगी।' :'Select your highest educational qualification. This information will help us find suitable internships for you.',
      2: currentLanguage === 'hi' ?'आपके पास जो भी कौशल हैं या जो आप सीख रहे हैं, उन्हें चुनें। कम से कम 3 कौशल चुनना आवश्यक है।' :'Choose all the skills you have or are currently learning. Please select at least 3 skills for better matching.',
      3: currentLanguage === 'hi' ?'आप किस क्षेत्र में काम करना चाहते हैं? अधिकतम 3 क्षेत्र चुन सकते हैं।' :'Which sectors would you like to work in? You can select up to 3 areas of interest.',
      4: currentLanguage === 'hi' ?'अपना राज्य और जिला चुनें। यह बताएं कि आप कहाँ काम करना चाहते हैं।' :'Select your state and district. Let us know where you would prefer to work.'
    };

    return `${stepTitles?.[currentStep]}. ${stepDescriptions?.[currentStep]}`;
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !formData?.education;
      case 2:
        return !formData?.skills || formData?.skills?.length < 3;
      case 3:
        return !formData?.interests || formData?.interests?.length === 0;
      case 4:
        return !formData?.state || !formData?.district;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  {currentLanguage === 'hi' ? 'प्रोफाइल सेटअप' : 'Profile Setup'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === 'hi' ?'अपनी जानकारी भरें और सबसे अच्छी इंटर्नशिप पाएं' :'Complete your profile to get the best internship matches'
                  }
                </p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center mb-6">
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                variant="compact"
              />
            </div>

            {/* Audio Control */}
            <div className="flex justify-center mb-6">
              <AudioControl
                text={getStepAudioContent()}
                language={currentLanguage}
                variant="compact"
                showProgress={false}
              />
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator 
            currentStep={currentStep} 
            totalSteps={totalSteps}
            currentLanguage={currentLanguage}
          />

          {/* Step Content */}
          <div className="mb-8">
            {getCurrentStepComponent()}
          </div>

          {/* Navigation */}
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isNextDisabled={isNextDisabled()}
            isLoading={isLoading}
            currentLanguage={currentLanguage}
          />

          {/* Submit Error */}
          {errors?.submit && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm text-error">{errors?.submit}</span>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 shadow-interactive">
            <div className="flex items-center space-x-3">
              <Icon name="Loader2" size={24} className="animate-spin text-primary" />
              <span className="text-foreground font-medium">
                {currentLanguage === 'hi' ? 'प्रोफाइल तैयार की जा रही है...' : 'Setting up your profile...'}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {currentLanguage === 'hi' ?'प्रधानमंत्री इंटर्नशिप योजना - भारत सरकार की पहल' :'PM Internship Scheme - Government of India Initiative'
              }
            </p>
            <p className="mt-1">
              © {new Date()?.getFullYear()} {currentLanguage === 'hi' ? 'सभी अधिकार सुरक्षित' : 'All rights reserved'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSetupWizard;