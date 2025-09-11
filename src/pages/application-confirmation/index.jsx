import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AudioControl from '../../components/ui/AudioControl';
import ConfirmationCard from './components/ConfirmationCard';
import RequiredDocuments from './components/RequiredDocuments';
import ApplicationTips from './components/ApplicationTips';
import NavigationActions from './components/NavigationActions';

const ApplicationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [applicationData, setApplicationData] = useState(null);

  // Load language preference and application data
  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Get application data from navigation state or localStorage
    const appData = location?.state?.applicationData || 
                   JSON.parse(localStorage.getItem('current-application') || '{}');
    
    if (!appData?.internshipTitle) {
      // If no application data, redirect to recommendations
      navigate('/internship-recommendations');
      return;
    }

    setApplicationData(appData);
  }, [location?.state, navigate]);

  // Mock application data if not available
  const mockApplicationData = {
    internshipTitle: "Digital Marketing Assistant - Tech Startup",
    applicationRef: "PM2025-DMA-" + Math.random()?.toString(36)?.substr(2, 8)?.toUpperCase(),
    company: "InnovateTech Solutions",
    location: "Bangalore, Karnataka",
    stipend: "₹15,000",
    submittedAt: new Date()?.toISOString()
  };

  const finalApplicationData = applicationData || mockApplicationData;

  // Handle continue to portal
  const handleContinueToPortal = () => {
    // In real app, this would redirect to actual government portal
    window.open('https://www.pminternship.mca.gov.in', '_blank');
  };

  // Content for text-to-speech
  const getConfirmationText = () => {
    const content = {
      en: `Application submitted successfully! You have applied for ${finalApplicationData?.internshipTitle}. Your application reference number is ${finalApplicationData?.applicationRef}. Please continue to the official PM Internship Scheme portal to complete your application process.`,
      hi: `आवेदन सफलतापूर्वक जमा किया गया! आपने ${finalApplicationData?.internshipTitle} के लिए आवेदन किया है। आपका आवेदन संदर्भ संख्या ${finalApplicationData?.applicationRef} है। कृपया अपनी आवेदन प्रक्रिया पूरी करने के लिए आधिकारिक पीएम इंटर्नशिप योजना पोर्टल पर जाएं।`
    };
    return content?.[currentLanguage] || content?.en;
  };

  if (!finalApplicationData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 px-4 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Loading application details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {currentLanguage === 'hi' ? 'आवेदन पुष्टि' : 'Application Confirmation'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'hi' ?'आपका आवेदन सफलतापूर्वक जमा कर दिया गया है। आगे की प्रक्रिया के लिए नीचे दिए गए निर्देशों का पालन करें।' :'Your application has been successfully submitted. Follow the instructions below to complete the process.'
              }
            </p>
          </div>

          {/* Audio Control for Page Content */}
          <div className="mb-6">
            <AudioControl
              text={getConfirmationText()}
              language={currentLanguage}
              variant="compact"
              showProgress={true}
              className="bg-primary/5 border border-primary/20"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Confirmation Card */}
              <ConfirmationCard
                internshipTitle={finalApplicationData?.internshipTitle}
                applicationRef={finalApplicationData?.applicationRef}
                onContinueToPortal={handleContinueToPortal}
                language={currentLanguage}
              />

              {/* Required Documents */}
              <RequiredDocuments language={currentLanguage} />

              {/* Application Tips */}
              <ApplicationTips language={currentLanguage} />
            </div>

            {/* Right Column - Navigation & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <NavigationActions language={currentLanguage} />
                
                {/* Application Summary */}
                <div className="bg-card border border-border rounded-xl shadow-card p-4">
                  <h4 className="font-medium text-foreground mb-3">
                    {currentLanguage === 'hi' ? 'आवेदन सारांश' : 'Application Summary'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {currentLanguage === 'hi' ? 'स्थिति:' : 'Status:'}
                      </span>
                      <span className="text-success font-medium">
                        {currentLanguage === 'hi' ? 'जमा किया गया' : 'Submitted'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {currentLanguage === 'hi' ? 'कंपनी:' : 'Company:'}
                      </span>
                      <span className="text-foreground">{finalApplicationData?.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {currentLanguage === 'hi' ? 'स्थान:' : 'Location:'}
                      </span>
                      <span className="text-foreground">{finalApplicationData?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {currentLanguage === 'hi' ? 'वृत्तिका:' : 'Stipend:'}
                      </span>
                      <span className="text-foreground font-medium">{finalApplicationData?.stipend}</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <h4 className="font-medium text-warning-foreground mb-2 flex items-center">
                    <span className="mr-2">🆘</span>
                    {currentLanguage === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Help'}
                  </h4>
                  <p className="text-sm text-warning-foreground mb-2">
                    {currentLanguage === 'hi' ?'यदि आपको तत्काल सहायता की आवश्यकता है:' :'If you need immediate assistance:'
                    }
                  </p>
                  <div className="text-sm space-y-1">
                    <div>📞 1800-XXX-XXXX</div>
                    <div>📧 help@pminternship.gov.in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 text-center">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              {currentLanguage === 'hi' ?'अपने सपनों की इंटर्नशिप की शुरुआत करें!' :'Start Your Dream Internship Journey!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {currentLanguage === 'hi' ?'आपका आवेदन जमा हो गया है। अब आधिकारिक पोर्टल पर जाकर प्रक्रिया पूरी करें।' :'Your application is submitted. Now complete the process on the official portal.'
              }
            </p>
            <button
              onClick={handleContinueToPortal}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 touch-target"
            >
              {currentLanguage === 'hi' ?'आधिकारिक पोर्टल पर जाएं →' :'Go to Official Portal →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationConfirmation;