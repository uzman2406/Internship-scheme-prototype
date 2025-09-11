import React from 'react';
import Icon from '../../../components/AppIcon';

const InterestsStep = ({ 
  formData, 
  onFormDataChange, 
  errors = {},
  currentLanguage = 'en' 
}) => {
  const sectorOptions = [
    {
      id: 'technology',
      emoji: '💻',
      title: currentLanguage === 'hi' ? 'प्रौद्योगिकी' : 'Technology',
      description: currentLanguage === 'hi' ? 'सॉफ्टवेयर, वेब डेवलपमेंट, IT सपोर्ट' : 'Software, Web Development, IT Support',
      icon: 'Laptop'
    },
    {
      id: 'business',
      emoji: '📊',
      title: currentLanguage === 'hi' ? 'व्यापार' : 'Business',
      description: currentLanguage === 'hi' ? 'मार्केटिंग, सेल्स, बिजनेस एनालिसिस' : 'Marketing, Sales, Business Analysis',
      icon: 'TrendingUp'
    },
    {
      id: 'healthcare',
      emoji: '🏥',
      title: currentLanguage === 'hi' ? 'स्वास्थ्य सेवा' : 'Healthcare',
      description: currentLanguage === 'hi' ? 'मेडिकल असिस्टेंट, हेल्थ केयर' : 'Medical Assistant, Health Care',
      icon: 'Heart'
    },
    {
      id: 'education',
      emoji: '📚',
      title: currentLanguage === 'hi' ? 'शिक्षा' : 'Education',
      description: currentLanguage === 'hi' ? 'टीचिंग, ट्रेनिंग, कंटेंट राइटिंग' : 'Teaching, Training, Content Writing',
      icon: 'BookOpen'
    },
    {
      id: 'finance',
      emoji: '💰',
      title: currentLanguage === 'hi' ? 'वित्त' : 'Finance',
      description: currentLanguage === 'hi' ? 'अकाउंटिंग, बैंकिंग, इन्वेस्टमेंट' : 'Accounting, Banking, Investment',
      icon: 'DollarSign'
    },
    {
      id: 'manufacturing',
      emoji: '🏭',
      title: currentLanguage === 'hi' ? 'विनिर्माण' : 'Manufacturing',
      description: currentLanguage === 'hi' ? 'प्रोडक्शन, क्वालिटी कंट्रोल' : 'Production, Quality Control',
      icon: 'Settings'
    },
    {
      id: 'retail',
      emoji: '🛍️',
      title: currentLanguage === 'hi' ? 'खुदरा' : 'Retail',
      description: currentLanguage === 'hi' ? 'कस्टमर सर्विस, सेल्स' : 'Customer Service, Sales',
      icon: 'ShoppingBag'
    },
    {
      id: 'agriculture',
      emoji: '🌾',
      title: currentLanguage === 'hi' ? 'कृषि' : 'Agriculture',
      description: currentLanguage === 'hi' ? 'फार्मिंग, एग्री-टेक' : 'Farming, Agri-Tech',
      icon: 'Leaf'
    }
  ];

  const handleSectorChange = (sectorId) => {
    const currentInterests = formData?.interests || [];
    let updatedInterests;

    if (currentInterests?.includes(sectorId)) {
      updatedInterests = currentInterests?.filter(interest => interest !== sectorId);
    } else {
      updatedInterests = [...currentInterests, sectorId];
    }

    onFormDataChange({
      ...formData,
      interests: updatedInterests
    });
  };

  const selectedInterests = formData?.interests || [];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Target" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'रुचि के क्षेत्र' : 'Areas of Interest'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ?'आप किस क्षेत्र में काम करना चाहते हैं?' :'Which sectors would you like to work in?'
          }
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sectorOptions?.map((sector) => {
          const isSelected = selectedInterests?.includes(sector?.id);
          
          return (
            <button
              key={sector?.id}
              onClick={() => handleSectorChange(sector?.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 text-left touch-target
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-interactive' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/20'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl flex-shrink-0">
                  {sector?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-medium text-foreground mb-1">
                    {sector?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {sector?.description}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedInterests?.length > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              {selectedInterests?.length} {currentLanguage === 'hi' ? 'क्षेत्र चुने गए' : 'sectors selected'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ?'आप अधिकतम 3 क्षेत्र चुन सकते हैं' :'You can select up to 3 sectors for better matching'
            }
          </div>
        </div>
      )}
      {errors?.interests && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{errors?.interests}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestsStep;