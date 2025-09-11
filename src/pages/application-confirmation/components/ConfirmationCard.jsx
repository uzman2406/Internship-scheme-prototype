import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationCard = ({ 
  internshipTitle, 
  applicationRef, 
  onContinueToPortal,
  language = 'en' 
}) => {
  const content = {
    en: {
      success: "Application Submitted Successfully!",
      congratulations: "Congratulations! Your application has been submitted.",
      internshipTitle: "Internship Applied For:",
      applicationRef: "Application Reference:",
      nextSteps: "Next Steps:",
      portalInstruction: "Complete your application on the official PM Internship Scheme portal",
      continueButton: "Continue to Official Portal",
      secureConnection: "Secure Government Portal",
      timeRemaining: "Application deadline in 15 days"
    },
    hi: {
      success: "आवेदन सफलतापूर्वक जमा किया गया!",
      congratulations: "बधाई हो! आपका आवेदन जमा कर दिया गया है।",
      internshipTitle: "इंटर्नशिप के लिए आवेदन:",
      applicationRef: "आवेदन संदर्भ:",
      nextSteps: "अगले कदम:",
      portalInstruction: "आधिकारिक पीएम इंटर्नशिप योजना पोर्टल पर अपना आवेदन पूरा करें",
      continueButton: "आधिकारिक पोर्टल पर जाएं",
      secureConnection: "सुरक्षित सरकारी पोर्टल",
      timeRemaining: "आवेदन की अंतिम तिथि 15 दिन में"
    }
  };

  const t = content?.[language] || content?.en;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-6 md:p-8">
      {/* Success Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-micro-celebration">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-success mb-2">
          {t?.success}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t?.congratulations}
        </p>
      </div>
      {/* Application Details */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1">
              {t?.internshipTitle}
            </label>
            <p className="text-foreground font-medium">
              {internshipTitle}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1">
              {t?.applicationRef}
            </label>
            <p className="text-foreground font-mono text-sm bg-background px-3 py-2 rounded border">
              {applicationRef}
            </p>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center">
          <Icon name="ArrowRight" size={20} className="mr-2 text-primary" />
          {t?.nextSteps}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t?.portalInstruction}
        </p>
        
        {/* Portal Button */}
        <Button
          variant="default"
          size="lg"
          onClick={onContinueToPortal}
          iconName="ExternalLink"
          iconPosition="right"
          fullWidth
          className="mb-3"
        >
          {t?.continueButton}
        </Button>
        
        {/* Security Indicators */}
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span>{t?.secureConnection}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-warning" />
            <span>{t?.timeRemaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;