import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingAudioControl = ({
  isVisible = false,
  isPlaying = false,
  progress = 0,
  title = '',
  onPlay = () => {},
  onPause = () => {},
  onStop = () => {},
  onExpand = () => {},
  position = 'bottom-right',
  className = ''
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6'
  };

  // Auto-minimize after 5 seconds of inactivity
  useEffect(() => {
    if (isVisible && isPlaying) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isPlaying]);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed ${positionClasses?.[position]} z-40 transition-all duration-300 ease-in-out
      ${isMinimized ? 'scale-90' : 'scale-100'}
      ${className}
    `}>
      <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        {isMinimized ? (
          // Minimized View
          (<div className="p-3">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? onPause : onPlay}
                className="touch-target w-10 h-10 rounded-full"
              >
                {isPlaying ? (
                  <Icon name="Pause" size={16} />
                ) : (
                  <Icon name="Play" size={16} />
                )}
              </Button>
              
              <div className="flex-1 min-w-0">
                <div className="w-16 bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(false)}
                className="touch-target w-8 h-8"
              >
                <Icon name="Maximize2" size={14} />
              </Button>
            </div>
          </div>)
        ) : (
          // Expanded View
          (<div className="p-4 w-72">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Volume2" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    Audio Playing
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {title || 'Internship details'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="touch-target w-8 h-8"
                >
                  <Icon name="Minimize2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onStop}
                  className="touch-target w-8 h-8"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{Math.round(progress)}%</span>
                <span>Playing</span>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                className="touch-target"
              >
                <Icon name="Square" size={16} />
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={isPlaying ? onPause : onPlay}
                className="touch-target w-12 h-12 rounded-full"
              >
                {isPlaying ? (
                  <Icon name="Pause" size={20} />
                ) : (
                  <Icon name="Play" size={20} />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onExpand}
                className="touch-target"
              >
                <Icon name="Maximize2" size={16} />
              </Button>
            </div>
            {/* Quick Actions */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onExpand}
                className="text-xs"
              >
                <Icon name="Eye" size={14} className="mr-1" />
                View Text
              </Button>
              
              <div className="text-xs text-muted-foreground">
                Tap to expand
              </div>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default FloatingAudioControl;