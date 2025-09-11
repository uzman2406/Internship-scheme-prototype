import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LanguageSelection from './pages/language-selection';
import AudioPlayerInterface from './pages/audio-player-interface';
import InternshipRecommendations from './pages/internship-recommendations';
import ApplicationConfirmation from './pages/application-confirmation';
import ProfileSetupWizard from './pages/profile-setup-wizard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ApplicationConfirmation />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/audio-player-interface" element={<AudioPlayerInterface />} />
        <Route path="/internship-recommendations" element={<InternshipRecommendations />} />
        <Route path="/application-confirmation" element={<ApplicationConfirmation />} />
        <Route path="/profile-setup-wizard" element={<ProfileSetupWizard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
