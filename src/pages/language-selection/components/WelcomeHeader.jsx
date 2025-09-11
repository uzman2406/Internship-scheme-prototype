import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ currentLanguage }) => {
  // Welcome messages in different languages
  const welcomeMessages = {
    en: {
      title: "Welcome to PM Internship Scheme",
      subtitle: "Choose your preferred language to get started",
      description: "Select the language you\'re most comfortable with. You can change this anytime during your journey."
    },
    hi: {
      title: "पीएम इंटर्नशिप योजना में आपका स्वागत है",
      subtitle: "शुरू करने के लिए अपनी पसंदीदा भाषा चुनें",
      description: "वह भाषा चुनें जिसमें आप सबसे सहज हैं। आप अपनी यात्रा के दौरान कभी भी इसे बदल सकते हैं।"
    }
  };

  const message = welcomeMessages?.[currentLanguage] || welcomeMessages?.en;

  return (
    <div className="text-center mb-8 sm:mb-12">
      {/* Government Scheme Badge */}
      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
        <Icon name="Shield" size={16} />
        <span className="text-sm font-medium">Government of India Initiative</span>
      </div>
      {/* Main Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
        {message?.title}
      </h1>
      {/* Subtitle */}
      <h2 className="text-lg sm:text-xl text-muted-foreground font-medium mb-4">
        {message?.subtitle}
      </h2>
      {/* Description */}
      <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {message?.description}
      </p>
      {/* Visual Separator */}
      <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
        <div className="w-8 h-0.5 bg-primary/30 rounded-full"></div>
        <Icon name="Globe" size={20} className="text-primary" />
        <div className="w-8 h-0.5 bg-primary/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default WelcomeHeader;