import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import LanguageToggle from '../../components/ui/LanguageToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InternshipCard from './components/InternshipCard';
import FilterSummary from './components/FilterSummary';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import InternshipModal from './components/InternshipModal';

const InternshipRecommendations = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');

  // Mock user profile data
  const userProfile = {
    educationLevel: "Bachelor\'s Degree",
    skills: ["JavaScript", "React", "Node.js", "Python", "Communication"],
    interests: ["Technology", "Business", "Design"],
    location: {
      state: "Maharashtra",
      district: "Mumbai"
    },
    experienceLevel: "Fresher",
    totalMatches: 47,
    topMatches: 5
  };

  // Mock internship data
  const mockInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      location: {
        city: "Mumbai",
        state: "Maharashtra"
      },
      stipend: 25000,
      duration: 6,
      matchScore: 95,
      description: `Join our dynamic frontend development team and work on cutting-edge web applications using React.js and modern JavaScript frameworks.\n\nYou'll collaborate with experienced developers to build responsive user interfaces, implement interactive features, and optimize application performance. This internship offers hands-on experience with industry-standard tools and methodologies.`,
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Familiarity with React.js framework",
        "Understanding of responsive web design",
        "Good communication skills",
        "Eagerness to learn new technologies"
      ],
      responsibilities: [
        "Develop and maintain frontend components using React.js",
        "Collaborate with UI/UX designers to implement designs",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and team meetings",
        "Assist in testing and debugging applications"
      ],
      benefits: [
        "Mentorship from senior developers",
        "Flexible working hours",
        "Learning and development opportunities",
        "Certificate of completion",
        "Potential for full-time offer"
      ],
      whyRecommended: ["Skills Match", "Location Match", "Education Match"],
      deadline: "2025-01-15",
      applicationUrl: "https://pminternship.gov.in/apply/frontend-dev-001"
    },
    {
      id: 2,
      title: "Digital Marketing Intern",
      company: "Growth Marketing Agency",
      location: {
        city: "Pune",
        state: "Maharashtra"
      },
      stipend: 20000,
      duration: 4,
      matchScore: 88,
      description: `Dive into the world of digital marketing and learn how to create compelling campaigns that drive business growth.\n\nWork with our marketing team to develop social media strategies, create content, analyze campaign performance, and optimize marketing funnels. Perfect opportunity for creative minds interested in business growth.`,
      requirements: [
        "Basic understanding of digital marketing concepts",
        "Good written and verbal communication skills",
        "Familiarity with social media platforms",
        "Creative thinking and problem-solving abilities",
        "Bachelor's degree in Marketing, Business, or related field"
      ],
      responsibilities: [
        "Assist in creating and executing digital marketing campaigns","Manage social media accounts and create engaging content","Analyze campaign performance using analytics tools","Conduct market research and competitor analysis","Support email marketing and content creation efforts"
      ],
      benefits: [
        "Hands-on experience with marketing tools","Exposure to various marketing channels","Networking opportunities","Performance-based incentives","Industry certification courses"
      ],
      whyRecommended: ["Interest Match", "Location Match", "Experience Level"],
      deadline: "2025-01-20",applicationUrl: "https://pminternship.gov.in/apply/digital-marketing-002"
    },
    {
      id: 3,
      title: "UI/UX Design Intern",company: "Creative Design Studio",
      location: {
        city: "Bangalore",state: "Karnataka"
      },
      stipend: 22000,
      duration: 5,
      matchScore: 82,
      description: `Join our creative team and learn the art of user experience design while working on real client projects.\n\nYou'll be involved in the complete design process from user research to final implementation, working with modern design tools and methodologies. Great opportunity to build a strong design portfolio.`,
      requirements: [
        "Basic knowledge of design principles","Familiarity with design tools like Figma or Adobe XD","Understanding of user-centered design","Portfolio showcasing design work","Strong attention to detail"
      ],
      responsibilities: [
        "Create wireframes, prototypes, and user interface designs","Conduct user research and usability testing","Collaborate with developers to implement designs","Maintain design systems and style guides","Present design concepts to clients and stakeholders"
      ],
      benefits: [
        "Access to premium design tools","Portfolio development support","Client interaction experience","Design thinking workshops","Mentorship from senior designers"
      ],
      whyRecommended: ["Interest Match", "Skills Match", "Education Match"],
      deadline: "2025-01-25",applicationUrl: "https://pminternship.gov.in/apply/ui-ux-design-003"
    },
    {
      id: 4,
      title: "Business Analyst Intern",company: "Consulting Partners Ltd",
      location: {
        city: "Delhi",state: "Delhi"
      },
      stipend: 28000,
      duration: 6,
      matchScore: 79,
      description: `Gain valuable experience in business analysis and strategic consulting while working with diverse clients across industries.\n\nYou'll learn to analyze business processes, identify improvement opportunities, and present actionable recommendations to senior management. Excellent stepping stone for a consulting career.`,
      requirements: [
        "Strong analytical and problem-solving skills","Proficiency in Microsoft Excel and PowerPoint","Good communication and presentation skills","Bachelor's degree in Business, Economics, or related field",
        "Interest in business strategy and operations"
      ],
      responsibilities: [
        "Analyze business processes and identify improvement areas",
        "Prepare detailed reports and presentations",
        "Assist in client meetings and workshops",
        "Conduct market research and competitive analysis",
        "Support project management activities"
      ],
      benefits: [
        "Exposure to multiple industries",
        "Client-facing experience",
        "Professional development training",
        "Networking with industry leaders",
        "Potential for permanent placement"
      ],
      whyRecommended: ["Interest Match", "Education Match", "Experience Level"],
      deadline: "2025-01-30",
      applicationUrl: "https://pminternship.gov.in/apply/business-analyst-004"
    },
    {
      id: 5,
      title: "Full Stack Developer Intern",
      company: "Innovation Labs",
      location: {
        city: "Hyderabad",
        state: "Telangana"
      },
      stipend: 30000,
      duration: 6,
      matchScore: 91,
      description: `Work on end-to-end web application development using modern technologies and frameworks.\n\nYou'll gain experience in both frontend and backend development, database management, and deployment processes. Perfect for aspiring full-stack developers who want comprehensive technical experience.`,
      requirements: [
        "Knowledge of JavaScript, HTML, and CSS",
        "Basic understanding of Node.js and databases",
        "Familiarity with version control (Git)",
        "Problem-solving and debugging skills",
        "Willingness to learn new technologies quickly"
      ],
      responsibilities: [
        "Develop full-stack web applications using modern frameworks",
        "Design and implement RESTful APIs",
        "Work with databases and data modeling",
        "Implement responsive frontend interfaces",
        "Participate in agile development processes"
      ],
      benefits: [
        "Comprehensive technical training",
        "Mentorship from senior developers",
        "Exposure to latest technologies",
        "Project-based learning approach",
        "High potential for full-time conversion"
      ],
      whyRecommended: ["Skills Match", "Education Match", "Interest Match"],
      deadline: "2025-02-05",
      applicationUrl: "https://pminternship.gov.in/apply/fullstack-dev-005"
    }
  ];

  // Load language preference and simulate data loading
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      setInternships(mockInternships);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferred-language', languageCode);
  };

  // Handle internship application
  const handleApply = (internship) => {
    // Store application data
    const applicationData = {
      internshipId: internship?.id,
      internshipTitle: internship?.title,
      company: internship?.company,
      appliedAt: new Date()?.toISOString(),
      applicationUrl: internship?.applicationUrl
    };
    
    localStorage.setItem('currentApplication', JSON.stringify(applicationData));
    
    // Navigate to confirmation page
    navigate('/application-confirmation');
  };

  // Handle view details
  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  // Handle profile modification
  const handleModifyProfile = () => {
    navigate('/profile-setup-wizard');
  };

  // Handle retry search
  const handleRetrySearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setInternships(mockInternships);
      setIsLoading(false);
    }, 2000);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSortBy('match');
    setFilterBy('all');
    // In real app, this would reset user preferences
  };

  // Sort internships
  const sortedInternships = [...internships]?.sort((a, b) => {
    switch (sortBy) {
      case 'stipend':
        return b?.stipend - a?.stipend;
      case 'duration':
        return a?.duration - b?.duration;
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      default: // match
        return b?.matchScore - a?.matchScore;
    }
  });

  // Filter internships
  const filteredInternships = sortedInternships?.filter(internship => {
    switch (filterBy) {
      case 'high-match':
        return internship?.matchScore >= 85;
      case 'high-stipend':
        return internship?.stipend >= 25000;
      case 'short-term':
        return internship?.duration <= 4;
      default: // all
        return true;
    }
  });

  // Show loading state
  if (isLoading) {
    return <LoadingState currentLanguage={currentLanguage} />;
  }

  // Show empty state if no internships
  if (internships?.length === 0) {
    return (
      <EmptyState
        onModifyProfile={handleModifyProfile}
        onRetry={handleRetrySearch}
        currentLanguage={currentLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-primary/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-heading font-semibold text-foreground mb-3">
                {currentLanguage === 'hi' ? 'आपके लिए सुझाई गई इंटर्नशिप' : 'Recommended Internships for You'}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {currentLanguage === 'hi' ?'आपकी प्रोफाइल के आधार पर हमने सबसे अच्छी इंटर्नशिप अवसर खोजे हैं।' :'Based on your profile, we\'ve found the best internship opportunities that match your skills and interests.'
                }
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-2xl mx-auto mb-6">
              <ProgressIndicator
                currentStep={3}
                totalSteps={4}
                steps={[
                  { id: 1, label: currentLanguage === 'hi' ? 'भाषा चयन' : 'Language Selection', icon: 'Globe' },
                  { id: 2, label: currentLanguage === 'hi' ? 'प्रोफाइल सेटअप' : 'Profile Setup', icon: 'User' },
                  { id: 3, label: currentLanguage === 'hi' ? 'सिफारिशें' : 'Recommendations', icon: 'Briefcase' },
                  { id: 4, label: currentLanguage === 'hi' ? 'आवेदन' : 'Application', icon: 'CheckCircle' }
                ]}
                onStepClick={(step, stepNumber) => {
                  if (stepNumber === 1) navigate('/language-selection');
                  if (stepNumber === 2) navigate('/profile-setup-wizard');
                }}
              />
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                variant="compact"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filter Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterSummary
                  filters={userProfile}
                  onModifyProfile={handleModifyProfile}
                  onClearFilters={handleClearFilters}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} className="text-primary" />
                  <span className="text-lg font-heading font-medium text-foreground">
                    {filteredInternships?.length} {currentLanguage === 'hi' ? 'मैच मिले' : 'Matches Found'}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Filter Dropdown */}
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e?.target?.value)}
                    className="text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">
                      {currentLanguage === 'hi' ? 'सभी' : 'All Matches'}
                    </option>
                    <option value="high-match">
                      {currentLanguage === 'hi' ? 'उच्च मैच (85%+)' : 'High Match (85%+)'}
                    </option>
                    <option value="high-stipend">
                      {currentLanguage === 'hi' ? 'उच्च वेतन (₹25K+)' : 'High Stipend (₹25K+)'}
                    </option>
                    <option value="short-term">
                      {currentLanguage === 'hi' ? 'कम अवधि (≤4 महीने)' : 'Short Term (≤4 months)'}
                    </option>
                  </select>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="match">
                      {currentLanguage === 'hi' ? 'मैच स्कोर' : 'Best Match'}
                    </option>
                    <option value="stipend">
                      {currentLanguage === 'hi' ? 'वेतन' : 'Highest Stipend'}
                    </option>
                    <option value="duration">
                      {currentLanguage === 'hi' ? 'अवधि' : 'Shortest Duration'}
                    </option>
                    <option value="deadline">
                      {currentLanguage === 'hi' ? 'समय सीमा' : 'Application Deadline'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Internship Cards */}
              <div className="space-y-6">
                {filteredInternships?.map((internship) => (
                  <InternshipCard
                    key={internship?.id}
                    internship={internship}
                    onApply={handleApply}
                    onViewDetails={handleViewDetails}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>

              {/* No Results */}
              {filteredInternships?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    {currentLanguage === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No Results Found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentLanguage === 'hi' ?'अपने फिल्टर को समायोजित करने का प्रयास करें।' :'Try adjusting your filters to see more results.'
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterBy('all');
                      setSortBy('match');
                    }}
                  >
                    {currentLanguage === 'hi' ? 'फिल्टर रीसेट करें' : 'Reset Filters'}
                  </Button>
                </div>
              )}

              {/* Load More */}
              {filteredInternships?.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    className="touch-target"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'और लोड करें' : 'Load More Opportunities'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Government Scheme Footer */}
        <div className="bg-primary/5 border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-lg font-heading font-medium text-primary">
                  {currentLanguage === 'hi' ? 'पीएम इंटर्नशिप योजना' : 'PM Internship Scheme'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {currentLanguage === 'hi' ?'भारत सरकार की आधिकारिक पहल - युवाओं को बेहतर करियर अवसर प्रदान करना।' :'Official Government of India Initiative - Empowering youth with better career opportunities.'
                }
              </p>
              <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-muted-foreground">
                <span>© {new Date()?.getFullYear()} Government of India</span>
                <span>•</span>
                <span>{currentLanguage === 'hi' ? 'सहायता: 1800-XXX-XXXX' : 'Support: 1800-XXX-XXXX'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Internship Details Modal */}
      <InternshipModal
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default InternshipRecommendations;