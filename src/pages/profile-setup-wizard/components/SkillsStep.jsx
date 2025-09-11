import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SkillsStep = ({ 
  formData, 
  onFormDataChange, 
  errors = {},
  currentLanguage = 'en' 
}) => {
  const skillCategories = [
    {
      category: currentLanguage === 'hi' ? 'तकनीकी कौशल' : 'Technical Skills',
      icon: 'Code',
      skills: [
        { id: 'computer-basics', label: currentLanguage === 'hi' ? 'कंप्यूटर बेसिक्स' : 'Computer Basics', icon: 'Monitor' },
        { id: 'ms-office', label: currentLanguage === 'hi' ? 'MS Office' : 'MS Office', icon: 'FileText' },
        { id: 'internet-browsing', label: currentLanguage === 'hi' ? 'इंटरनेट ब्राउज़िंग' : 'Internet Browsing', icon: 'Globe' },
        { id: 'social-media', label: currentLanguage === 'hi' ? 'सोशल मीडिया' : 'Social Media', icon: 'Share2' },
        { id: 'data-entry', label: currentLanguage === 'hi' ? 'डेटा एंट्री' : 'Data Entry', icon: 'Keyboard' },
        { id: 'basic-programming', label: currentLanguage === 'hi' ? 'बेसिक प्रोग्रामिंग' : 'Basic Programming', icon: 'Code2' }
      ]
    },
    {
      category: currentLanguage === 'hi' ? 'संचार कौशल' : 'Communication Skills',
      icon: 'MessageCircle',
      skills: [
        { id: 'english-speaking', label: currentLanguage === 'hi' ? 'अंग्रेजी बोलना' : 'English Speaking', icon: 'Mic' },
        { id: 'hindi-fluency', label: currentLanguage === 'hi' ? 'हिंदी प्रवाहता' : 'Hindi Fluency', icon: 'Languages' },
        { id: 'regional-language', label: currentLanguage === 'hi' ? 'क्षेत्रीय भाषा' : 'Regional Language', icon: 'MapPin' },
        { id: 'presentation', label: currentLanguage === 'hi' ? 'प्रेजेंटेशन' : 'Presentation', icon: 'Presentation' },
        { id: 'writing', label: currentLanguage === 'hi' ? 'लेखन' : 'Writing', icon: 'PenTool' }
      ]
    },
    {
      category: currentLanguage === 'hi' ? 'व्यक्तिगत कौशल' : 'Personal Skills',
      icon: 'User',
      skills: [
        { id: 'teamwork', label: currentLanguage === 'hi' ? 'टीमवर्क' : 'Teamwork', icon: 'Users' },
        { id: 'leadership', label: currentLanguage === 'hi' ? 'नेतृत्व' : 'Leadership', icon: 'Crown' },
        { id: 'problem-solving', label: currentLanguage === 'hi' ? 'समस्या समाधान' : 'Problem Solving', icon: 'Lightbulb' },
        { id: 'time-management', label: currentLanguage === 'hi' ? 'समय प्रबंधन' : 'Time Management', icon: 'Clock' },
        { id: 'adaptability', label: currentLanguage === 'hi' ? 'अनुकूलनशीलता' : 'Adaptability', icon: 'Shuffle' }
      ]
    }
  ];

  const handleSkillChange = (skillId, checked) => {
    const currentSkills = formData?.skills || [];
    let updatedSkills;

    if (checked) {
      updatedSkills = [...currentSkills, skillId];
    } else {
      updatedSkills = currentSkills?.filter(skill => skill !== skillId);
    }

    onFormDataChange({
      ...formData,
      skills: updatedSkills
    });
  };

  const selectedSkills = formData?.skills || [];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Award" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'अपने कौशल चुनें' : 'Select Your Skills'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ?'आपके पास जो भी कौशल हैं उन्हें चुनें' :'Choose all the skills you have or are learning'
          }
        </p>
      </div>
      <div className="space-y-8">
        {skillCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={16} className="text-primary" />
              </div>
              <h3 className="text-lg font-heading font-medium text-foreground">
                {category?.category}
              </h3>
            </div>

            <CheckboxGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category?.skills?.map((skill) => (
                  <div key={skill?.id} className="bg-card border border-border rounded-lg p-3 hover:bg-muted/20 transition-colors duration-150">
                    <Checkbox
                      checked={selectedSkills?.includes(skill?.id)}
                      onChange={(e) => handleSkillChange(skill?.id, e?.target?.checked)}
                      label={
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name={skill?.icon} size={12} className="text-primary" />
                          </div>
                          <span className="text-sm font-medium">{skill?.label}</span>
                        </div>
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CheckboxGroup>
          </div>
        ))}
      </div>
      {selectedSkills?.length > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              {selectedSkills?.length} {currentLanguage === 'hi' ? 'कौशल चुने गए' : 'skills selected'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ?'बेहतर मैचिंग के लिए कम से कम 3 कौशल चुनें' :'Select at least 3 skills for better matching'
            }
          </div>
        </div>
      )}
      {errors?.skills && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 mt-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{errors?.skills}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsStep;