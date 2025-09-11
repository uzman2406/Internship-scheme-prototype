import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSummary = ({ 
  filters, 
  onModifyProfile, 
  onClearFilters,
  currentLanguage = 'en' 
}) => {
  const getSkillsDisplay = (skills) => {
    if (skills?.length <= 3) {
      return skills?.join(', ');
    }
    return `${skills?.slice(0, 3)?.join(', ')} +${skills?.length - 3} more`;
  };

  const getInterestsDisplay = (interests) => {
    const interestIcons = {
      'Technology': '💻',
      'Business': '📊',
      'Healthcare': '🏥',
      'Education': '📚',
      'Finance': '💰',
      'Marketing': '📢',
      'Design': '🎨',
      'Engineering': '⚙️'
    };

    return interests?.map(interest => 
      `${interestIcons?.[interest] || '📋'} ${interest}`
    )?.join(', ');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Your Profile Summary
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onModifyProfile}
          iconName="Edit"
          iconPosition="left"
          iconSize={14}
        >
          Modify
        </Button>
      </div>
      {/* Filter Items */}
      <div className="space-y-4">
        {/* Education Level */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="GraduationCap" size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">Education Level</div>
            <div className="text-sm text-muted-foreground">{filters?.educationLevel}</div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">Skills</div>
            <div className="text-sm text-muted-foreground">
              {getSkillsDisplay(filters?.skills)}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Heart" size={16} className="text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">Sector Interests</div>
            <div className="text-sm text-muted-foreground">
              {getInterestsDisplay(filters?.interests)}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="MapPin" size={16} className="text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">Preferred Location</div>
            <div className="text-sm text-muted-foreground">
              {filters?.location?.district}, {filters?.location?.state}
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Briefcase" size={16} className="text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">Experience Level</div>
            <div className="text-sm text-muted-foreground">{filters?.experienceLevel}</div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-primary">
              {filters?.totalMatches || 0}
            </div>
            <div className="text-xs text-muted-foreground">Total Matches</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-success">
              {filters?.topMatches || 0}
            </div>
            <div className="text-xs text-muted-foreground">Top Matches</div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="flex-1 touch-target"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
          >
            Reset Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onModifyProfile}
            className="flex-1 touch-target"
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSummary;