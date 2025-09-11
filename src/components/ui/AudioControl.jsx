import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AudioControl = ({
  text = '',
  language = 'en',
  autoPlay = false,
  showProgress = true,
  showSpeed = true,
  showVolume = false,
  variant = 'default', // 'default' | 'compact' | 'floating'
  position = 'bottom-right', // for floating variant
  onPlay = () => {},
  onPause = () => {},
  onEnd = () => {},
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);

  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Check for speech synthesis support
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      setError('Text-to-speech is not supported in this browser');
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && text && isSupported) {
      handlePlay();
    }
  }, [text, autoPlay, isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef?.current) {
        window.speechSynthesis?.cancel();
      }
      if (progressIntervalRef?.current) {
        clearInterval(progressIntervalRef?.current);
      }
    };
  }, []);

  // Handle play
  const handlePlay = async () => {
    if (!text || !isSupported) return;

    try {
      setIsLoading(true);
      setError(null);

      // Cancel any existing speech
      window.speechSynthesis?.cancel();

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Set language and voice
      const voices = window.speechSynthesis?.getVoices();
      const voice = voices?.find(v => v?.lang?.startsWith(language)) || voices?.[0];
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = language;

      // Set speech parameters
      utterance.rate = playbackRate;
      utterance.volume = volume;
      utterance.pitch = 1;

      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
        onPlay();
        startProgressTracking();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        setCurrentTime(duration);
        onEnd();
        stopProgressTracking();
      };

      utterance.onerror = (event) => {
        setIsPlaying(false);
        setIsLoading(false);
        setError('Speech synthesis failed');
        console.error('Speech synthesis error:', event);
        stopProgressTracking();
      };

      utterance.onpause = () => {
        setIsPlaying(false);
        onPause();
        stopProgressTracking();
      };

      utterance.onresume = () => {
        setIsPlaying(true);
        onPlay();
        startProgressTracking();
      };

      // Estimate duration (rough calculation)
      const wordsPerMinute = 150;
      const words = text?.split(' ')?.length;
      const estimatedDuration = (words / wordsPerMinute) * 60 / playbackRate;
      setDuration(estimatedDuration);

      // Start speech
      window.speechSynthesis?.speak(utterance);

    } catch (error) {
      setIsLoading(false);
      setError('Failed to start speech synthesis');
      console.error('Speech synthesis error:', error);
    }
  };

  // Handle pause/resume
  const handlePause = () => {
    if (window.speechSynthesis?.speaking && !window.speechSynthesis?.paused) {
      window.speechSynthesis?.pause();
    } else if (window.speechSynthesis?.paused) {
      window.speechSynthesis?.resume();
    }
  };

  // Handle stop
  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    stopProgressTracking();
  };

  // Progress tracking
  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(() => {
      if (duration > 0) {
        setCurrentTime(prev => {
          const newTime = Math.min(prev + 0.1, duration);
          setProgress((newTime / duration) * 100);
          return newTime;
        });
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef?.current) {
      clearInterval(progressIntervalRef?.current);
      progressIntervalRef.current = null;
    }
  };

  // Handle speed change
  const handleSpeedChange = (newRate) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      // Restart with new rate
      const wasPlaying = isPlaying;
      handleStop();
      if (wasPlaying) {
        setTimeout(() => handlePlay(), 100);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (utteranceRef?.current) {
      utteranceRef.current.volume = newVolume;
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  // Don't render if not supported
  if (!isSupported) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        <Icon name="VolumeX" size={16} className="inline mr-1" />
        Audio not supported
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading || !text}
          className="touch-target"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isLoading ? (
            <Icon name="Loader2" size={16} className="animate-spin" />
          ) : isPlaying ? (
            <Icon name="Pause" size={16} />
          ) : (
            <Icon name="Play" size={16} />
          )}
        </Button>
        
        {showProgress && isPlaying && (
          <div className="flex-1 min-w-0">
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Floating variant
  if (variant === 'floating') {
    if (!isPlaying && !isLoading) return null;

    const positionClasses = {
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4'
    };

    return (
      <div className={`
        fixed ${positionClasses?.[position]} z-50 bg-card border border-border rounded-lg shadow-interactive p-3
        animate-slide-in ${className}
      `}>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePause}
            className="touch-target"
          >
            {isLoading ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
            )}
          </Button>
          
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground mb-1">Playing audio</div>
            <div className="w-24 bg-muted rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStop}
            className="touch-target"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Volume2" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Audio Playback</span>
        </div>
        
        {error && (
          <div className="text-xs text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={12} />
            <span>Error</span>
          </div>
        )}
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-3 mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading || !text}
          className="touch-target"
        >
          {isLoading ? (
            <Icon name="Loader2" size={16} className="animate-spin" />
          ) : isPlaying ? (
            <Icon name="Pause" size={16} />
          ) : (
            <Icon name="Play" size={16} />
          )}
          <span className="ml-2">
            {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleStop}
          disabled={!isPlaying && !window.speechSynthesis?.paused}
          className="touch-target"
        >
          <Icon name="Square" size={16} />
        </Button>

        {/* Speed Control */}
        {showSpeed && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <select
              value={playbackRate}
              onChange={(e) => handleSpeedChange(parseFloat(e?.target?.value))}
              className="text-xs bg-background border border-border rounded px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      {showProgress && (
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
      {/* Volume Control */}
      {showVolume && (
        <div className="flex items-center space-x-2 mt-3">
          <Icon name="Volume2" size={14} className="text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e?.target?.value))}
            className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs text-muted-foreground w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioControl;