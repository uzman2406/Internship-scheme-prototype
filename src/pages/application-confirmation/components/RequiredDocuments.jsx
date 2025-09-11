import React from 'react';
import Icon from '../../../components/AppIcon';

const RequiredDocuments = ({ language = 'en' }) => {
  const content = {
    en: {
      title: "Required Documents",
      subtitle: "Please prepare these documents for your application",
      documents: [
        {
          name: "Aadhaar Card",
          description: "Government issued identity proof",
          icon: "CreditCard",
          required: true
        },
        {
          name: "Educational Certificates",
          description: "10th, 12th, or graduation certificates",
          icon: "GraduationCap",
          required: true
        },
        {
          name: "Bank Account Details",
          description: "For stipend payment processing",
          icon: "Building2",
          required: true
        },
        {
          name: "Passport Size Photo",
          description: "Recent photograph in JPG format",
          icon: "Camera",
          required: true
        },
        {
          name: "Caste Certificate",
          description: "If applicable for reservation benefits",
          icon: "FileText",
          required: false
        },
        {
          name: "Income Certificate",
          description: "Family income proof if required",
          icon: "Receipt",
          required: false
        }
      ],
      note: "All documents should be in PDF or JPG format, maximum 2MB each"
    },
    hi: {
      title: "आवश्यक दस्तावेज",
      subtitle: "कृपया अपने आवेदन के लिए ये दस्तावेज तैयार रखें",
      documents: [
        {
          name: "आधार कार्ड",
          description: "सरकारी पहचान प्रमाण",
          icon: "CreditCard",
          required: true
        },
        {
          name: "शैक्षणिक प्रमाणपत्र",
          description: "10वीं, 12वीं, या स्नातक प्रमाणपत्र",
          icon: "GraduationCap",
          required: true
        },
        {
          name: "बैंक खाता विवरण",
          description: "वृत्तिका भुगतान के लिए",
          icon: "Building2",
          required: true
        },
        {
          name: "पासपोर्ट साइज फोटो",
          description: "JPG प्रारूप में हाल की तस्वीर",
          icon: "Camera",
          required: true
        },
        {
          name: "जाति प्रमाणपत्र",
          description: "आरक्षण लाभ के लिए यदि लागू हो",
          icon: "FileText",
          required: false
        },
        {
          name: "आय प्रमाणपत्र",
          description: "पारिवारिक आय प्रमाण यदि आवश्यक हो",
          icon: "Receipt",
          required: false
        }
      ],
      note: "सभी दस्तावेज PDF या JPG प्रारूप में होने चाहिए, अधिकतम 2MB प्रत्येक"
    }
  };

  const t = content?.[language] || content?.en;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2 flex items-center">
          <Icon name="FileCheck" size={24} className="mr-2 text-primary" />
          {t?.title}
        </h3>
        <p className="text-muted-foreground">
          {t?.subtitle}
        </p>
      </div>
      <div className="space-y-4 mb-6">
        {t?.documents?.map((doc, index) => (
          <div 
            key={index}
            className="flex items-start space-x-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150"
          >
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
              ${doc?.required ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
            `}>
              <Icon name={doc?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-foreground">
                  {doc?.name}
                </h4>
                {doc?.required && (
                  <span className="text-xs bg-error text-error-foreground px-2 py-0.5 rounded-full">
                    Required
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {doc?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-warning-foreground">
            {t?.note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocuments;