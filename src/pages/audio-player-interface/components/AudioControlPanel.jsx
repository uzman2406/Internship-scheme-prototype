import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioControlPanel = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  duration = 0,
  currentTime = 0,
  playbackRate = 1,
  volume = 0.8,
  onPlay = () => {},
  onPause = () => {},
  onStop = () => {},
  onSpeedChange = () => {},
  onVolumeChange = () => {},
  onSeek = () => {},
  error = null,
  className = ''
}) => {
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const speedOptions = [
    { value: 0.5, label: '0.5x', description: 'Slow' },
    { value: 0.75, label: '0.75x', description: 'Slower' },
    { value: 1, label: '1x', description: 'Normal' },
    { value: 1.25, label: '1.25x', description: 'Faster' },
    { value: 1.5, label: '1.5x', description: 'Fast' },
    { value: 2, label: '2x', description: 'Very Fast' }
  ];

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
      {/* Main Controls */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onStop}
            disabled={!isPlaying && !window.speechSynthesis?.paused}
            className="touch-target"
            aria-label="Stop audio"
          >
            <Icon name="Square" size={20} />
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={isPlaying ? onPause : onPlay}
            disabled={isLoading}
            className="touch-target w-16 h-16 rounded-full"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isLoading ? (
              <Icon name="Loader2" size={24} className="animate-spin" />
            ) : isPlaying ? (
              <Icon name="Pause" size={24} />
            ) : (
              <Icon name="Play" size={24} />
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAdvancedControls(!showAdvancedControls)}
            className="touch-target"
            aria-label="Toggle advanced controls"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {isLoading ? 'Loading audio...' : isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>
      {/* Progress Section */}
      <div className="space-y-3 mb-6">
        <div className="w-full bg-muted rounded-full h-3 cursor-pointer" onClick={onSeek}>
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-sm" />
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{Math.round(progress)}% complete</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      {/* Speed Control - Always Visible */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Playback Speed
          </label>
          <span className="text-sm text-muted-foreground">
            {speedOptions?.find(s => s?.value === playbackRate)?.description}
          </span>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {speedOptions?.map((speed) => (
            <Button
              key={speed?.value}
              variant={playbackRate === speed?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSpeedChange(speed?.value)}
              className="touch-target text-xs"
            >
              {speed?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Advanced Controls */}
      {showAdvancedControls && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Volume
              </label>
              <span className="text-sm text-muted-foreground">
                {Math.round(volume * 100)}%
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="VolumeX" size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer touch-target"
                aria-label="Volume control"
              />
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
            </div>
          </div>

          {/* Audio Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Duration</div>
                <div className="font-medium text-foreground">{formatTime(duration)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Remaining</div>
                <div className="font-medium text-foreground">{formatTime(duration - currentTime)}</div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSpeedChange(0.75);
                  onVolumeChange(1);
                }}
                className="touch-target"
              >
                <Icon name="Turtle" size={14} className="mr-2" />
                Slow & Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSpeedChange(1.25);
                  onVolumeChange(0.8);
                }}
                className="touch-target"
              >
                <Icon name="Rabbit" size={14} className="mr-2" />
                Fast Reading
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile-Specific Controls */}
      <div className="sm:hidden mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Tap and hold the progress bar to seek • Double-tap play button for quick restart
        </div>
      </div>
    </div>
  );
};

export default AudioControlPanel;