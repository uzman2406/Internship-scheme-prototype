import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ 
  currentStep, 
  totalSteps = 4, 
  currentLanguage = 'en' 
}) => {
  const steps = [
    {
      number: 1,
      title: currentLanguage === 'hi' ? 'शिक्षा' : 'Education',
      icon: 'GraduationCap'
    },
    {
      number: 2,
      title: currentLanguage === 'hi' ? 'कौशल' : 'Skills',
      icon: 'Award'
    },
    {
      number: 3,
      title: currentLanguage === 'hi' ? 'रुचि' : 'Interests',
      icon: 'Target'
    },
    {
      number: 4,
      title: currentLanguage === 'hi' ? 'स्थान' : 'Location',
      icon: 'MapPin'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card mb-6">
      <div className="flex items-center justify-between">
        {steps?.slice(0, totalSteps)?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center space-y-2">
              {/* Step Circle */}
              <div className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${step?.number === currentStep 
                  ? 'bg-primary border-primary text-primary-foreground shadow-interactive' 
                  : step?.number < currentStep
                    ? 'bg-success border-success text-success-foreground'
                    : 'bg-background border-muted text-muted-foreground'
                }
              `}>
                {step?.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              
              {/* Step Title */}
              <div className={`
                text-xs font-medium text-center transition-colors duration-200
                ${step?.number === currentStep 
                  ? 'text-primary' 
                  : step?.number < currentStep
                    ? 'text-success' :'text-muted-foreground'
                }
              `}>
                {step?.title}
              </div>
            </div>
            
            {/* Connector Line */}
            {index < totalSteps - 1 && (
              <div className={`
                flex-1 h-0.5 mx-2 transition-colors duration-200
                ${step?.number < currentStep ? 'bg-success' : 'bg-muted'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Progress Text */}
      <div className="text-center mt-4">
        <div className="text-sm text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}% {currentLanguage === 'hi' ? 'पूर्ण' : 'Complete'}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;