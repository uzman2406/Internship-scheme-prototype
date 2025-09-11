import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationTips = ({ language = 'en' }) => {
  const content = {
    en: {
      title: "Helpful Tips for First-Time Applicants",
      subtitle: "Follow these simple steps to complete your application successfully",
      tips: [
        {
          icon: "Clock",
          title: "Apply Early",
          description: "Don't wait until the last minute. Applications are processed on first-come, first-served basis.",
          color: "text-primary"
        },
        {
          icon: "FileCheck",
          title: "Double-Check Documents",
          description: "Ensure all documents are clear, readable, and in the correct format before uploading.",
          color: "text-success"
        },
        {
          icon: "Phone",
          title: "Keep Contact Details Updated",
          description: "Make sure your phone number and email are correct for important updates.",
          color: "text-secondary"
        },
        {
          icon: "Shield",
          title: "Save Your Application ID",
          description: "Keep your application reference number safe. You\'ll need it to track your application.",
          color: "text-warning"
        },
        {
          icon: "Users",
          title: "Seek Help if Needed",
          description: "Visit your nearest Common Service Center (CSC) if you need assistance with the application.",
          color: "text-accent"
        },
        {
          icon: "Bell",
          title: "Check for Updates",
          description: "Regularly check your email and SMS for application status updates and interview calls.",
          color: "text-primary"
        }
      ],
      contactInfo: {
        title: "Need Help?",
        helpline: "Helpline: 1800-XXX-XXXX",
        email: "Email: support@pminternship.gov.in",
        hours: "Available: Mon-Fri, 9 AM - 6 PM"
      }
    },
    hi: {
      title: "पहली बार आवेदन करने वालों के लिए उपयोगी सुझाव",
      subtitle: "अपना आवेदन सफलतापूर्वक पूरा करने के लिए इन सरल चरणों का पालन करें",
      tips: [
        {
          icon: "Clock",
          title: "जल्दी आवेदन करें",
          description: "अंतिम समय तक इंतजार न करें। आवेदन पहले आओ, पहले पाओ के आधार पर प्रोसेस होते हैं।",
          color: "text-primary"
        },
        {
          icon: "FileCheck",
          title: "दस्तावेजों की दोबारा जांच करें",
          description: "अपलोड करने से पहले सुनिश्चित करें कि सभी दस्तावेज स्पष्ट, पढ़ने योग्य और सही प्रारूप में हैं।",
          color: "text-success"
        },
        {
          icon: "Phone",
          title: "संपर्क विवरण अपडेट रखें",
          description: "महत्वपूर्ण अपडेट के लिए सुनिश्चित करें कि आपका फोन नंबर और ईमेल सही है।",
          color: "text-secondary"
        },
        {
          icon: "Shield",
          title: "अपना आवेदन ID सेव करें",
          description: "अपना आवेदन संदर्भ संख्या सुरक्षित रखें। आपको अपने आवेदन को ट्रैक करने के लिए इसकी आवश्यकता होगी।",
          color: "text-warning"
        },
        {
          icon: "Users",
          title: "जरूरत पड़ने पर मदद लें",
          description: "यदि आपको आवेदन में सहायता की आवश्यकता है तो अपने निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं।",
          color: "text-accent"
        },
        {
          icon: "Bell",
          title: "अपडेट के लिए जांच करें",
          description: "आवेदन स्थिति अपडेट और इंटरव्यू कॉल के लिए नियमित रूप से अपना ईमेल और SMS चेक करें।",
          color: "text-primary"
        }
      ],
      contactInfo: {
        title: "मदद चाहिए?",
        helpline: "हेल्पलाइन: 1800-XXX-XXXX",
        email: "ईमेल: support@pminternship.gov.in",
        hours: "उपलब्ध: सोम-शुक्र, सुबह 9 - शाम 6"
      }
    }
  };

  const t = content?.[language] || content?.en;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={24} className="mr-2 text-accent" />
          {t?.title}
        </h3>
        <p className="text-muted-foreground">
          {t?.subtitle}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {t?.tips?.map((tip, index) => (
          <div 
            key={index}
            className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-150"
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0
                ${tip?.color}
              `}>
                <Icon name={tip?.icon} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">
                  {tip?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Contact Information */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
          {t?.contactInfo?.title}
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="text-foreground">{t?.contactInfo?.helpline}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-foreground">{t?.contactInfo?.email}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-muted-foreground">{t?.contactInfo?.hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTips;