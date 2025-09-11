import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationActions = ({ language = 'en' }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      backToRecommendations: "Back to Recommendations",
      backToRecommendationsDesc: "Browse more internship opportunities",
      viewApplications: "View My Applications",
      viewApplicationsDesc: "Track your application status",
      startOver: "Start New Search",
      startOverDesc: "Begin with a fresh profile setup",
      audioPlayer: "Audio Player",
      audioPlayerDesc: "Listen to internship details"
    },
    hi: {
      backToRecommendations: "सिफारिशों पर वापस जाएं",
      backToRecommendationsDesc: "अधिक इंटर्नशिप अवसर देखें",
      viewApplications: "मेरे आवेदन देखें",
      viewApplicationsDesc: "अपने आवेदन की स्थिति ट्रैक करें",
      startOver: "नई खोज शुरू करें",
      startOverDesc: "नए प्रोफाइल सेटअप के साथ शुरुआत करें",
      audioPlayer: "ऑडियो प्लेयर",
      audioPlayerDesc: "इंटर्नशिप विवरण सुनें"
    }
  };

  const t = content?.[language] || content?.en;

  const navigationOptions = [
    {
      title: t?.backToRecommendations,
      description: t?.backToRecommendationsDesc,
      icon: "ArrowLeft",
      variant: "outline",
      action: () => navigate('/internship-recommendations'),
      color: "text-primary"
    },
    {
      title: t?.audioPlayer,
      description: t?.audioPlayerDesc,
      icon: "Volume2",
      variant: "outline",
      action: () => navigate('/audio-player-interface'),
      color: "text-secondary"
    },
    {
      title: t?.startOver,
      description: t?.startOverDesc,
      icon: "RotateCcw",
      variant: "ghost",
      action: () => navigate('/language-selection'),
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="Navigation" size={20} className="mr-2 text-primary" />
          What's Next?
        </h3>
      </div>
      <div className="space-y-3">
        {navigationOptions?.map((option, index) => (
          <Button
            key={index}
            variant={option?.variant}
            onClick={option?.action}
            fullWidth
            className="justify-start h-auto p-4 text-left"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className={`
                w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0
                ${option?.color}
              `}>
                <Icon name={option?.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground mb-1">
                  {option?.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {option?.description}
                </div>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
            </div>
          </Button>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-2xl font-bold text-primary mb-1">1</div>
            <div className="text-xs text-muted-foreground">Applications Submitted</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-2xl font-bold text-success mb-1">15</div>
            <div className="text-xs text-muted-foreground">Days Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationActions;