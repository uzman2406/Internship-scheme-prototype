import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AudioPlayerOverlay from './components/AudioPlayerOverlay';
import FloatingAudioControl from './components/FloatingAudioControl';
import AudioControlPanel from './components/AudioControlPanel';
import TextHighlighter from './components/TextHighlighter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AudioPlayerInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state or use mock data
  const internshipData = location?.state?.internship || {
    id: 1,
    title: "Software Development Intern",
    company: "Tech Solutions Pvt Ltd",
    location: "Bangalore, Karnataka",
    stipend: "₹15,000",
    duration: "6 months",
    description: `Join our dynamic software development team as an intern and gain hands-on experience in modern web technologies. You will work alongside experienced developers on real-world projects, contributing to both frontend and backend development.

Key Responsibilities:
• Develop and maintain web applications using React.js and Node.js
• Collaborate with cross-functional teams to deliver high-quality software solutions
• Participate in code reviews and follow best practices for software development
• Learn and implement new technologies as required by project needs
• Assist in testing and debugging applications to ensure optimal performance

Requirements:
• Currently pursuing or recently completed degree in Computer Science or related field
• Basic knowledge of JavaScript, HTML, and CSS
• Familiarity with React.js framework is preferred
• Strong problem-solving skills and attention to detail
• Excellent communication skills and ability to work in a team environment

What You'll Learn:
• Modern web development frameworks and tools
• Software development lifecycle and agile methodologies
• Database design and management
• API development and integration
• Version control using Git and collaborative development practices

This internship offers excellent learning opportunities and potential for full-time employment based on performance. You'll be mentored by senior developers and have access to comprehensive training resources.`,
    skills: ["React.js", "JavaScript", "Node.js", "MongoDB"],
    whyRecommended: ["Matches your technical skills", "Located in preferred city", "Good stipend range"]
  };

  // Audio player state
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('preferred-language') || 'en';
  });
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('description');

  // Text content for different sections
  const textSections = {
    description: internshipData?.description,
    requirements: `Requirements for this internship include: ${internshipData?.skills?.join(', ')}. You should have basic knowledge in these areas and be eager to learn more.`,
    benefits: `This internship offers a competitive stipend of ${internshipData?.stipend} for ${internshipData?.duration}. Located in ${internshipData?.location}, this position provides excellent learning opportunities.`,
    whyRecommended: `This internship is recommended for you because: ${internshipData?.whyRecommended?.join('. ')}. It aligns perfectly with your profile and career goals.`
  };

  // Language content
  const content = {
    en: {
      title: "Audio Player Interface",
      subtitle: "Listen to internship details",
      sections: {
        description: "Job Description",
        requirements: "Requirements",
        benefits: "Benefits & Stipend",
        whyRecommended: "Why Recommended"
      },
      controls: {
        playAll: "Play All Sections",
        playSection: "Play This Section",
        stopAudio: "Stop Audio",
        openPlayer: "Open Full Player",
        backToRecommendations: "Back to Recommendations",
        apply: "Apply Now"
      },
      status: {
        loading: "Loading audio...",
        playing: "Playing audio",
        paused: "Audio paused",
        stopped: "Audio stopped"
      }
    },
    hi: {
      title: "ऑडियो प्लेयर इंटरफेस",
      subtitle: "इंटर्नशिप विवरण सुनें",
      sections: {
        description: "नौकरी का विवरण",
        requirements: "आवश्यकताएं",
        benefits: "लाभ और वेतन",
        whyRecommended: "क्यों सुझाया गया"
      },
      controls: {
        playAll: "सभी भाग चलाएं",
        playSection: "यह भाग चलाएं",
        stopAudio: "ऑडियो बंद करें",
        openPlayer: "पूरा प्लेयर खोलें",
        backToRecommendations: "सुझावों पर वापस जाएं",
        apply: "अभी आवेदन करें"
      },
      status: {
        loading: "ऑडियो लोड हो रहा है...",
        playing: "ऑडियो चल रहा है",
        paused: "ऑडियो रुका हुआ है",
        stopped: "ऑडियो बंद है"
      }
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  // Update language when changed
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Audio control handlers
  const handlePlay = (section = activeSection) => {
    setActiveSection(section);
    setIsPlaying(true);
    setIsOverlayVisible(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setCurrentWordIndex(0);
    setIsOverlayVisible(false);
    setIsFloatingVisible(false);
  };

  const handleMinimize = () => {
    setIsOverlayVisible(false);
    setIsFloatingVisible(true);
  };

  const handleExpand = () => {
    setIsOverlayVisible(true);
    setIsFloatingVisible(false);
  };

  const handleSpeedChange = (newRate) => {
    setPlaybackRate(newRate);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleSeek = (event) => {
    // Implement seek functionality
    const rect = event?.currentTarget?.getBoundingClientRect();
    const clickX = event?.clientX - rect?.left;
    const newProgress = (clickX / rect?.width) * 100;
    setProgress(newProgress);
  };

  const playAllSections = () => {
    const allText = Object.values(textSections)?.join('\n\n');
    handlePlay('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/internship-recommendations')}
                className="touch-target"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                {t?.controls?.backToRecommendations}
              </Button>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {internshipData?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Building" size={16} />
                      <span>{internshipData?.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>{internshipData?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="IndianRupee" size={16} />
                      <span>{internshipData?.stipend}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {internshipData?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                  <Button
                    variant="default"
                    onClick={playAllSections}
                    disabled={isLoading}
                    className="touch-target"
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    {t?.controls?.playAll}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/application-confirmation', { 
                      state: { internship: internshipData } 
                    })}
                    className="touch-target"
                  >
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    {t?.controls?.apply}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Text Content */}
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(textSections)?.map(([sectionKey, sectionText]) => (
                <div key={sectionKey} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      {t?.sections?.[sectionKey]}
                    </h2>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlay(sectionKey)}
                      disabled={isLoading}
                      className="touch-target"
                    >
                      <Icon name="Play" size={14} className="mr-2" />
                      {t?.controls?.playSection}
                    </Button>
                  </div>
                  
                  <TextHighlighter
                    text={sectionText}
                    currentWordIndex={activeSection === sectionKey ? currentWordIndex : 0}
                    isPlaying={isPlaying && activeSection === sectionKey}
                    fontSize="text-base"
                  />
                </div>
              ))}
            </div>

            {/* Audio Control Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <AudioControlPanel
                  isPlaying={isPlaying}
                  isLoading={isLoading}
                  progress={progress}
                  duration={duration}
                  currentTime={currentTime}
                  playbackRate={playbackRate}
                  volume={volume}
                  onPlay={() => handlePlay()}
                  onPause={handlePause}
                  onStop={handleStop}
                  onSpeedChange={handleSpeedChange}
                  onVolumeChange={handleVolumeChange}
                  onSeek={handleSeek}
                  error={error}
                />

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleExpand}
                    disabled={!isPlaying}
                    className="touch-target"
                  >
                    <Icon name="Maximize2" size={16} className="mr-2" />
                    {t?.controls?.openPlayer}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => navigate('/application-confirmation', { 
                      state: { internship: internshipData } 
                    })}
                    className="touch-target"
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    {t?.controls?.apply}
                  </Button>
                </div>

                {/* Status Display */}
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      isPlaying ? 'bg-success animate-pulse' : isLoading ?'bg-warning animate-spin' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-sm text-muted-foreground">
                      {isLoading ? t?.status?.loading : 
                       isPlaying ? t?.status?.playing : 
                       progress > 0 ? t?.status?.paused : t?.status?.stopped}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Audio Player Overlay */}
      <AudioPlayerOverlay
        text={textSections?.[activeSection] || ''}
        title={`${internshipData?.title} - ${t?.sections?.[activeSection]}`}
        language={currentLanguage}
        isVisible={isOverlayVisible}
        onClose={handleStop}
        onMinimize={handleMinimize}
      />
      {/* Floating Audio Control */}
      <FloatingAudioControl
        isVisible={isFloatingVisible}
        isPlaying={isPlaying}
        progress={progress}
        title={internshipData?.title}
        onPlay={() => handlePlay()}
        onPause={handlePause}
        onStop={handleStop}
        onExpand={handleExpand}
        position="bottom-right"
      />
    </div>
  );
};

export default AudioPlayerInterface;