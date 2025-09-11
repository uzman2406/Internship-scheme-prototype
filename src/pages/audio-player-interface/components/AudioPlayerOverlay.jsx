import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPlayerOverlay = ({
  text = '',
  title = '',
  language = 'en',
  isVisible = false,
  onClose = () => {},
  onMinimize = () => {},
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState(null);

  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const wordsRef = useRef([]);

  // Split text into words for highlighting
  useEffect(() => {
    if (text) {
      wordsRef.current = text?.split(' ');
    }
  }, [text]);

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

  // Auto-play when overlay becomes visible
  useEffect(() => {
    if (isVisible && text && !isPlaying) {
      setTimeout(() => handlePlay(), 500);
    }
  }, [isVisible, text]);

  const handlePlay = async () => {
    if (!text) return;

    try {
      setIsLoading(true);
      setError(null);

      window.speechSynthesis?.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Set voice and language
      const voices = window.speechSynthesis?.getVoices();
      const voice = voices?.find(v => v?.lang?.startsWith(language)) || voices?.[0];
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = language;
      utterance.rate = playbackRate;
      utterance.volume = volume;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
        startProgressTracking();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        setCurrentTime(duration);
        setCurrentWordIndex(wordsRef?.current?.length);
        stopProgressTracking();
      };

      utterance.onerror = (event) => {
        setIsPlaying(false);
        setIsLoading(false);
        setError('Audio playback failed. Please try again.');
        stopProgressTracking();
      };

      utterance.onpause = () => {
        setIsPlaying(false);
        stopProgressTracking();
      };

      utterance.onresume = () => {
        setIsPlaying(true);
        startProgressTracking();
      };

      // Estimate duration
      const wordsPerMinute = 150;
      const words = text?.split(' ')?.length;
      const estimatedDuration = (words / wordsPerMinute) * 60 / playbackRate;
      setDuration(estimatedDuration);

      window.speechSynthesis?.speak(utterance);

    } catch (error) {
      setIsLoading(false);
      setError('Failed to start audio playback');
      console.error('Speech synthesis error:', error);
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis?.speaking && !window.speechSynthesis?.paused) {
      window.speechSynthesis?.pause();
    } else if (window.speechSynthesis?.paused) {
      window.speechSynthesis?.resume();
    }
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setCurrentWordIndex(0);
    stopProgressTracking();
  };

  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(() => {
      if (duration > 0) {
        setCurrentTime(prev => {
          const newTime = Math.min(prev + 0.1, duration);
          const progressPercent = (newTime / duration) * 100;
          setProgress(progressPercent);
          
          // Update word highlighting
          const wordIndex = Math.floor((progressPercent / 100) * wordsRef?.current?.length);
          setCurrentWordIndex(wordIndex);
          
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

  const handleSpeedChange = (newRate) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      const wasPlaying = isPlaying;
      handleStop();
      if (wasPlaying) {
        setTimeout(() => handlePlay(), 100);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const renderHighlightedText = () => {
    return wordsRef?.current?.map((word, index) => (
      <span
        key={index}
        className={`
          ${index === currentWordIndex ? 'bg-primary text-primary-foreground px-1 rounded' : ''}
          ${index < currentWordIndex ? 'text-muted-foreground' : ''}
        `}
      >
        {word}{' '}
      </span>
    ));
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Volume2" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Audio Player</h2>
              <p className="text-sm text-muted-foreground">{title || 'Reading content aloud'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMinimize}
              className="touch-target"
              aria-label="Minimize player"
            >
              <Icon name="Minimize2" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="touch-target"
              aria-label="Close player"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Text Display */}
          <div className="flex-1 p-6 overflow-y-auto bg-background">
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed text-lg">
                {renderHighlightedText()}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-80 bg-muted/20 border-t lg:border-t-0 lg:border-l border-border p-6">
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
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleStop}
                    disabled={!isPlaying && !window.speechSynthesis?.paused}
                    className="touch-target"
                  >
                    <Icon name="Square" size={20} />
                  </Button>

                  <Button
                    variant="default"
                    size="lg"
                    onClick={isPlaying ? handlePause : handlePlay}
                    disabled={isLoading || !text}
                    className="touch-target w-16 h-16"
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
                    onClick={onMinimize}
                    className="touch-target"
                  >
                    <Icon name="Minimize2" size={20} />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {isLoading ? 'Loading audio...' : isPlaying ? 'Playing' : 'Paused'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Speed Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Playback Speed
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0.5, 1, 1.5]?.map((speed) => (
                    <Button
                      key={speed}
                      variant={playbackRate === speed ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSpeedChange(speed)}
                      className="touch-target"
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Volume
                </label>
                <div className="flex items-center space-x-3">
                  <Icon name="VolumeX" size={16} className="text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e?.target?.value))}
                    className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer"
                  />
                  <Icon name="Volume2" size={16} className="text-muted-foreground" />
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  {Math.round(volume * 100)}%
                </div>
              </div>

              {/* Progress Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-foreground mb-1">
                  Reading Progress
                </div>
                <div className="text-xs text-muted-foreground">
                  Word {currentWordIndex} of {wordsRef?.current?.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(progress)}% complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerOverlay;