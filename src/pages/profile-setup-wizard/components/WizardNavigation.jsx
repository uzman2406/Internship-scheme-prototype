import React from 'react';
import Button from '../../../components/ui/Button';


const WizardNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit,
  isNextDisabled = false,
  isLoading = false,
  currentLanguage = 'en' 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      {/* Previous Button */}
      <div className="flex-1">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isLoading}
            iconName="ChevronLeft"
            iconPosition="left"
            className="touch-target"
          >
            {currentLanguage === 'hi' ? 'पिछला' : 'Previous'}
          </Button>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex-1 text-center">
        <div className="text-sm text-muted-foreground">
          {currentLanguage === 'hi' ? 'चरण' : 'Step'} {currentStep} {currentLanguage === 'hi' ? 'का' : 'of'} {totalSteps}
        </div>
        <div className="w-32 bg-muted rounded-full h-2 mx-auto mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Next/Submit Button */}
      <div className="flex-1 flex justify-end">
        {isLastStep ? (
          <Button
            variant="default"
            onClick={onSubmit}
            disabled={isNextDisabled || isLoading}
            loading={isLoading}
            iconName="CheckCircle"
            iconPosition="right"
            className="touch-target"
          >
            {currentLanguage === 'hi' ? 'प्रोफाइल पूर्ण करें' : 'Complete Profile'}
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            loading={isLoading}
            iconName="ChevronRight"
            iconPosition="right"
            className="touch-target"
          >
            {currentLanguage === 'hi' ? 'अगला' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;