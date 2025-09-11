import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  onModifyProfile, 
  onRetry, 
  currentLanguage = 'en' 
}) => {
  const content = {
    en: {
      title: "No Matching Internships Found",
      subtitle: "Don\'t worry! Let\'s find the perfect opportunities for you.",
      description: "We couldn\'t find internships that match your current preferences. Try adjusting your profile settings or expanding your search criteria.",
      suggestions: [
        "Consider different skill combinations",
        "Expand your location preferences",
        "Try different sector interests",
        "Adjust your experience level requirements"
      ],
      modifyButton: "Modify Profile",
      retryButton: "Search Again",
      supportText: "Need help? Contact our support team"
    },
    hi: {
      title: "कोई मैचिंग इंटर्नशिप नहीं मिली",
      subtitle: "चिंता न करें! आइए आपके लिए सही अवसर खोजते हैं।",
      description: "हमें आपकी वर्तमान प्राथमिकताओं से मेल खाने वाली इंटर्नशिप नहीं मिली। अपनी प्रोफाइल सेटिंग्स को समायोजित करने या खोज मानदंड का विस्तार करने का प्रयास करें।",
      suggestions: [
        "विभिन्न कौशल संयोजनों पर विचार करें",
        "अपनी स्थान प्राथमिकताओं का विस्तार करें",
        "विभिन्न क्षेत्रीय रुचियों को आज़माएं",
        "अपने अनुभव स्तर की आवश्यकताओं को समायोजित करें"
      ],
      modifyButton: "प्रोफाइल संशोधित करें",
      retryButton: "फिर से खोजें",
      supportText: "सहायता चाहिए? हमारी सहायता टीम से संपर्क करें"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Icon name="Search" size={48} className="text-muted-foreground" />
          </div>
          
          {/* Floating Icons */}
          <div className="relative">
            <div className="absolute -top-16 -left-8 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Briefcase" size={20} className="text-primary" />
            </div>
            <div className="absolute -top-12 -right-8 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center animate-bounce delay-150">
              <Icon name="Target" size={16} className="text-accent" />
            </div>
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center animate-bounce delay-300">
              <Icon name="Star" size={14} className="text-secondary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-3">
            {currentContent?.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {currentContent?.subtitle}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {currentContent?.description}
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            {currentLanguage === 'hi' ? 'सुझाव:' : 'Suggestions:'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentContent?.suggestions?.map((suggestion, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" size={14} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
          <Button
            variant="default"
            size="lg"
            onClick={onModifyProfile}
            className="w-full sm:w-auto touch-target"
            iconName="Edit"
            iconPosition="left"
          >
            {currentContent?.modifyButton}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onRetry}
            className="w-full sm:w-auto touch-target"
            iconName="RefreshCw"
            iconPosition="left"
          >
            {currentContent?.retryButton}
          </Button>
        </div>

        {/* Government Scheme Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {currentLanguage === 'hi' ? 'पीएम इंटर्नशिप योजना' : 'PM Internship Scheme'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ?'हमारे पास हजारों इंटर्नशिप अवसर उपलब्ध हैं। आइए आपके लिए सही मैच खोजते हैं।' :'We have thousands of internship opportunities available. Let\'s find the right match for you.'
            }
          </p>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            {currentContent?.supportText}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Phone" size={12} className="mr-1" />
              {currentLanguage === 'hi' ? 'कॉल करें' : 'Call'}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Mail" size={12} className="mr-1" />
              {currentLanguage === 'hi' ? 'ईमेल' : 'Email'}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="MessageCircle" size={12} className="mr-1" />
              {currentLanguage === 'hi' ? 'चैट' : 'Chat'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;