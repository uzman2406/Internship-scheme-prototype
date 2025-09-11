import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EducationStep = ({ 
  formData, 
  onFormDataChange, 
  errors = {},
  currentLanguage = 'en' 
}) => {
  const educationOptions = [
    { value: 'below-10th', label: currentLanguage === 'hi' ? 'कक्षा 10 से कम' : 'Below 10th Standard' },
    { value: '10th-pass', label: currentLanguage === 'hi' ? 'कक्षा 10 पास' : '10th Standard Pass' },
    { value: '12th-pass', label: currentLanguage === 'hi' ? 'कक्षा 12 पास' : '12th Standard Pass' },
    { value: 'diploma', label: currentLanguage === 'hi' ? 'डिप्लोमा' : 'Diploma' },
    { value: 'graduation', label: currentLanguage === 'hi' ? 'स्नातक' : 'Graduation' },
    { value: 'post-graduation', label: currentLanguage === 'hi' ? 'स्नातकोत्तर' : 'Post Graduation' }
  ];

  const handleEducationChange = (value) => {
    onFormDataChange({
      ...formData,
      education: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="GraduationCap" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'शिक्षा स्तर' : 'Education Level'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ?'अपनी शिक्षा का स्तर चुनें' :'Select your highest education qualification'
          }
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <Select
          label={currentLanguage === 'hi' ? 'शिक्षा योग्यता' : 'Educational Qualification'}
          placeholder={currentLanguage === 'hi' ? 'अपनी शिक्षा चुनें' : 'Choose your education level'}
          options={educationOptions}
          value={formData?.education || ''}
          onChange={handleEducationChange}
          error={errors?.education}
          required
          className="mb-4"
        />

        {formData?.education && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">
                {currentLanguage === 'hi' ? 'चयन सफल' : 'Selection Confirmed'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <div className="text-xs text-muted-foreground">
          {currentLanguage === 'hi' ?'यह जानकारी आपके लिए उपयुक्त इंटर्नशिप खोजने में मदद करेगी' :'This information helps us find suitable internships for you'
          }
        </div>
      </div>
    </div>
  );
};

export default EducationStep;