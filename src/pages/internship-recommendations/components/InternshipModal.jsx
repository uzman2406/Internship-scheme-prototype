import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AudioControl from '../../../components/ui/AudioControl';

const InternshipModal = ({ 
  internship, 
  isOpen, 
  onClose, 
  onApply,
  currentLanguage = 'en' 
}) => {
  if (!isOpen || !internship) return null;

  const formatStipend = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getBadgeColor = (reason) => {
    const colors = {
      'Skills Match': 'bg-success/10 text-success border-success/20',
      'Location Match': 'bg-primary/10 text-primary border-primary/20',
      'Education Match': 'bg-accent/10 text-accent border-accent/20',
      'Interest Match': 'bg-secondary/10 text-secondary border-secondary/20',
      'Experience Level': 'bg-warning/10 text-warning border-warning/20'
    };
    return colors?.[reason] || 'bg-muted text-muted-foreground border-border';
  };

  const detailedAudioText = `Complete details for ${internship?.title}. Company: ${internship?.company}. Location: ${internship?.location?.city}, ${internship?.location?.state}. Duration: ${internship?.duration} months. Stipend: ${formatStipend(internship?.stipend)} per month. Description: ${internship?.description}. Requirements: ${internship?.requirements?.join(', ')}. Why recommended: ${internship?.whyRecommended?.join(', ')}.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card border border-border rounded-lg shadow-interactive w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {internship?.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Building2" size={16} />
                    <span>{internship?.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{internship?.location?.city}, {internship?.location?.state}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="touch-target"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Match Score */}
            <div className="mt-3">
              <div className="inline-flex items-center bg-success/10 text-success border border-success/20 rounded-full px-3 py-1">
                <Icon name="Target" size={14} className="mr-1" />
                <span className="text-sm font-medium">{internship?.matchScore}% Match</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Stipend & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="IndianRupee" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Monthly Stipend</span>
                </div>
                <div className="text-2xl font-heading font-semibold text-primary">
                  {formatStipend(internship?.stipend)}
                </div>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={20} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Duration</span>
                </div>
                <div className="text-2xl font-heading font-semibold text-accent">
                  {internship?.duration} months
                </div>
              </div>
            </div>

            {/* Why Recommended */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                Why Recommended for You
              </h3>
              <div className="flex flex-wrap gap-2">
                {internship?.whyRecommended?.map((reason, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${getBadgeColor(reason)}`}
                  >
                    <Icon name="CheckCircle" size={14} className="mr-2" />
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                About This Internship
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {internship?.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                Requirements
              </h3>
              <div className="space-y-2">
                {internship?.requirements?.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            {internship?.responsibilities && (
              <div className="mb-6">
                <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                  Key Responsibilities
                </h3>
                <div className="space-y-2">
                  {internship?.responsibilities?.map((responsibility, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {internship?.benefits && (
              <div className="mb-6">
                <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {internship?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-muted/30 rounded-lg p-3">
                      <Icon name="Gift" size={16} className="text-secondary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Deadline */}
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Application Deadline</span>
              </div>
              <div className="text-lg font-heading font-semibold text-warning mt-1">
                {new Date(internship.deadline)?.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Audio Control */}
            <div className="mb-6">
              <AudioControl
                text={detailedAudioText}
                language={currentLanguage}
                variant="default"
                showProgress={true}
                showSpeed={true}
                showVolume={true}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-card border-t border-border p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>PM Internship Scheme</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="touch-target"
                >
                  Close
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => onApply(internship)}
                  className="touch-target"
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={16}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipModal;