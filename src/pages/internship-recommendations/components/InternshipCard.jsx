import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AudioControl from '../../../components/ui/AudioControl';

const InternshipCard = ({ 
  internship, 
  onApply, 
  onViewDetails,
  currentLanguage = 'en' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatStipend = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getLocationDisplay = (location) => {
    return `${location?.city}, ${location?.state}`;
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

  const audioText = `${internship?.title}. Location: ${getLocationDisplay(internship?.location)}. Stipend: ${formatStipend(internship?.stipend)} per month. ${internship?.description}. Why recommended: ${internship?.whyRecommended?.join(', ')}.`;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-interactive transition-all duration-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2">
              {internship?.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{getLocationDisplay(internship?.location)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{internship?.duration} months</span>
              </div>
            </div>
          </div>
          
          {/* Company Logo */}
          <div className="ml-4 flex-shrink-0">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Stipend */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Monthly Stipend</div>
              <div className="text-xl font-heading font-semibold text-primary">
                {formatStipend(internship?.stipend)}
              </div>
            </div>
            <Icon name="IndianRupee" size={24} className="text-primary" />
          </div>
        </div>

        {/* Why Recommended Badges */}
        <div className="mb-4">
          <div className="text-sm font-medium text-foreground mb-2">Why Recommended for You</div>
          <div className="flex flex-wrap gap-2">
            {internship?.whyRecommended?.map((reason, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(reason)}`}
              >
                <Icon name="CheckCircle" size={12} className="mr-1" />
                {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className={`text-sm text-muted-foreground leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {internship?.description}
          </p>
          {internship?.description?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-medium mt-2 hover:underline"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Requirements Preview */}
        <div className="mb-4">
          <div className="text-sm font-medium text-foreground mb-2">Key Requirements</div>
          <div className="flex flex-wrap gap-2">
            {internship?.requirements?.slice(0, 3)?.map((req, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
              >
                {req}
              </span>
            ))}
            {internship?.requirements?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{internship?.requirements?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Audio Control */}
        <div className="mb-4">
          <AudioControl
            text={audioText}
            language={currentLanguage}
            variant="compact"
            showProgress={true}
            showSpeed={true}
          />
        </div>
      </div>
      {/* Footer Actions */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>Apply by {new Date(internship.deadline)?.toLocaleDateString('en-IN')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(internship)}
              className="touch-target"
            >
              <Icon name="Eye" size={16} />
              <span className="ml-2 hidden sm:inline">Details</span>
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onApply(internship)}
              className="touch-target"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
      {/* Match Score Indicator */}
      <div className="absolute top-4 right-4">
        <div className="bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded-full">
          {internship?.matchScore}% Match
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;