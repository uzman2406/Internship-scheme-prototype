import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4,
  className = '' 
}) => {
  const steps = [
    { id: 1, label: 'Language', icon: 'Globe' },
    { id: 2, label: 'Profile', icon: 'User' },
    { id: 3, label: 'Recommendations', icon: 'Briefcase' },
    { id: 4, label: 'Application', icon: 'CheckCircle' }
  ];

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1">
          {steps?.map((step) => (
            <div
              key={step?.id}
              className={`
                flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200
                ${step?.id <= currentStep 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-muted text-muted-foreground'
                }
              `}
            >
              {step?.id < currentStep ? (
                <Icon name="Check" size={12} />
              ) : (
                <span className="text-xs font-bold">{step?.id}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step Labels */}
      <div className="flex justify-between">
        {steps?.map((step) => (
          <div key={step?.id} className="flex flex-col items-center text-center">
            <div className={`
              text-xs font-medium transition-colors duration-200
              ${step?.id === currentStep ? 'text-primary' : step?.id < currentStep ? 'text-success' : 'text-muted-foreground'}
            `}>
              {step?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Progress Text */}
      <div className="text-center mt-3">
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;