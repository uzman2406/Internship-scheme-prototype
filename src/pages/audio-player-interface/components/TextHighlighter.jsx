import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TextHighlighter = ({
  text = '',
  currentWordIndex = 0,
  isPlaying = false,
  fontSize = 'text-lg',
  highlightColor = 'bg-primary',
  className = ''
}) => {
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userFontSize, setUserFontSize] = useState(fontSize);
  const [showControls, setShowControls] = useState(false);
  const textRef = useRef(null);
  const highlightedWordRef = useRef(null);

  // Process text into words and sentences
  useEffect(() => {
    if (text) {
      const processedWords = text?.split(/(\s+)/)?.filter(word => word?.trim()?.length > 0);
      setWords(processedWords);

      const processedSentences = text?.split(/[.!?]+/)?.filter(sentence => sentence?.trim()?.length > 0);
      setSentences(processedSentences);
    }
  }, [text]);

  // Update current sentence based on word index
  useEffect(() => {
    if (words?.length > 0 && sentences?.length > 0) {
      let wordCount = 0;
      let sentenceIndex = 0;

      for (let i = 0; i < sentences?.length; i++) {
        const sentenceWords = sentences?.[i]?.split(/\s+/)?.filter(word => word?.trim()?.length > 0);
        if (currentWordIndex < wordCount + sentenceWords?.length) {
          sentenceIndex = i;
          break;
        }
        wordCount += sentenceWords?.length;
      }

      setCurrentSentenceIndex(sentenceIndex);
    }
  }, [currentWordIndex, words, sentences]);

  // Auto-scroll to highlighted word
  useEffect(() => {
    if (highlightedWordRef?.current && isPlaying) {
      highlightedWordRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [currentWordIndex, isPlaying]);

  const fontSizeOptions = [
    { value: 'text-sm', label: 'Small', size: '14px' },
    { value: 'text-base', label: 'Normal', size: '16px' },
    { value: 'text-lg', label: 'Large', size: '18px' },
    { value: 'text-xl', label: 'Extra Large', size: '20px' },
    { value: 'text-2xl', label: 'XXL', size: '24px' }
  ];

  const renderHighlightedText = () => {
    return words?.map((word, index) => {
      const isCurrentWord = index === currentWordIndex;
      const isPastWord = index < currentWordIndex;
      const isFutureWord = index > currentWordIndex;

      return (
        <span
          key={index}
          ref={isCurrentWord ? highlightedWordRef : null}
          className={`
            transition-all duration-200 inline-block mx-0.5
            ${isCurrentWord 
              ? `${highlightColor} text-primary-foreground px-1 py-0.5 rounded-md shadow-sm transform scale-105` 
              : isPastWord 
                ? 'text-muted-foreground opacity-70' 
                : 'text-foreground'
            }
            ${isCurrentWord ? 'animate-pulse' : ''}
          `}
        >
          {word}
        </span>
      );
    });
  };

  const renderSentenceView = () => {
    return sentences?.map((sentence, index) => (
      <div
        key={index}
        className={`
          mb-4 p-3 rounded-lg transition-all duration-300
          ${index === currentSentenceIndex 
            ? 'bg-accent/20 border-l-4 border-primary' 
            : index < currentSentenceIndex 
              ? 'bg-muted/30 opacity-60' :'bg-background'
          }
        `}
      >
        <div className={`${userFontSize} leading-relaxed`}>
          {sentence?.trim()}.
        </div>
        {index === currentSentenceIndex && (
          <div className="mt-2 flex items-center space-x-2">
            <Icon name="Volume2" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Currently reading</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Text Controls */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Type" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Text Display</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className="touch-target"
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      {/* Advanced Controls */}
      {showControls && (
        <div className="mb-4 p-4 bg-card border border-border rounded-lg space-y-4">
          {/* Font Size Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Font Size
            </label>
            <div className="grid grid-cols-5 gap-2">
              {fontSizeOptions?.map((option) => (
                <Button
                  key={option?.value}
                  variant={userFontSize === option?.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUserFontSize(option?.value)}
                  className="touch-target text-xs"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Reading Progress */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Words Read</div>
                <div className="font-medium text-foreground">{currentWordIndex}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Words</div>
                <div className="font-medium text-foreground">{words?.length}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Progress</div>
                <div className="font-medium text-foreground">
                  {Math.round((currentWordIndex / words?.length) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Text Content */}
      <div 
        ref={textRef}
        className="bg-background border border-border rounded-lg p-6 max-h-96 overflow-y-auto"
      >
        <div className={`${userFontSize} leading-relaxed text-foreground`}>
          {renderHighlightedText()}
        </div>
      </div>
      {/* Reading Statistics */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Word {currentWordIndex + 1} of {words?.length}</span>
          <span>•</span>
          <span>Sentence {currentSentenceIndex + 1} of {sentences?.length}</span>
        </div>
        
        {isPlaying && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Reading...</span>
          </div>
        )}
      </div>
      {/* Mobile Reading Helper */}
      <div className="sm:hidden mt-4 p-3 bg-accent/10 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-accent-foreground">
          <Icon name="Info" size={14} />
          <span>The highlighted word shows current reading position</span>
        </div>
      </div>
    </div>
  );
};

export default TextHighlighter;