import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  onStepClick = () => {},
  allowNavigation = true,
  variant = 'horizontal' // 'horizontal' | 'vertical'
}) => {
  // Default steps if not provided
  const defaultSteps = [
    { id: 1, label: 'Language Selection', icon: 'Globe', completed: false },
    { id: 2, label: 'Profile Setup', icon: 'User', completed: false },
    { id: 3, label: 'Recommendations', icon: 'Briefcase', completed: false },
    { id: 4, label: 'Application', icon: 'CheckCircle', completed: false }
  ];

  const processedSteps = steps?.length > 0 ? steps : defaultSteps?.slice(0, totalSteps);

  // Update completion status based on current step
  const stepsWithStatus = processedSteps?.map((step, index) => ({
    ...step,
    completed: index + 1 < currentStep,
    current: index + 1 === currentStep,
    accessible: index + 1 <= currentStep
  }));

  const handleStepClick = (step, index) => {
    if (allowNavigation && step?.accessible) {
      onStepClick(step, index + 1);
    }
  };

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col space-y-4">
        {stepsWithStatus?.map((step, index) => (
          <div key={step?.id} className="flex items-start space-x-3">
            {/* Step Indicator */}
            <button
              onClick={() => handleStepClick(step, index)}
              disabled={!allowNavigation || !step?.accessible}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                ${step?.completed 
                  ? 'bg-success border-success text-success-foreground hover:bg-success/90' 
                  : step?.current
                    ? 'bg-primary border-primary text-primary-foreground shadow-interactive'
                    : 'bg-background border-muted text-muted-foreground'
                }
                ${allowNavigation && step?.accessible ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                touch-target
              `}
            >
              {step?.completed ? (
                <Icon name="Check" size={16} />
              ) : (
                <Icon name={step?.icon} size={16} />
              )}
            </button>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className={`
                text-sm font-medium transition-colors duration-200
                ${step?.current ? 'text-primary' : step?.completed ? 'text-success' : 'text-muted-foreground'}
              `}>
                {step?.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Step {index + 1} of {totalSteps}
              </div>
            </div>

            {/* Connector Line */}
            {index < stepsWithStatus?.length - 1 && (
              <div className="absolute left-5 mt-10 w-0.5 h-8 bg-muted" />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out-custom"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1">
          {stepsWithStatus?.map((step, index) => (
            <button
              key={step?.id}
              onClick={() => handleStepClick(step, index)}
              disabled={!allowNavigation || !step?.accessible}
              className={`
                flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200
                ${step?.completed 
                  ? 'bg-success border-success text-success-foreground hover:bg-success/90' 
                  : step?.current
                    ? 'bg-primary border-primary text-primary-foreground shadow-interactive'
                    : 'bg-background border-muted text-muted-foreground'
                }
                ${allowNavigation && step?.accessible ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              `}
            >
              {step?.completed ? (
                <Icon name="Check" size={12} />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Step Labels */}
      <div className="flex justify-between">
        {stepsWithStatus?.map((step, index) => (
          <div 
            key={step?.id} 
            className="flex flex-col items-center text-center max-w-20"
          >
            <div className={`
              text-xs font-medium transition-colors duration-200 mb-1
              ${step?.current ? 'text-primary' : step?.completed ? 'text-success' : 'text-muted-foreground'}
            `}>
              {step?.label}
            </div>
            {step?.current && (
              <div className="text-xs text-muted-foreground">
                Current Step
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Progress Text */}
      <div className="text-center mt-4">
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;