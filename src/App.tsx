/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { CoachesPage } from './pages/CoachesPage';
import { CentresPage } from './pages/CentresPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { BookTrialPage } from './pages/BookTrialPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { LanguageProvider } from './context/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const waLink = "https://wa.me/919876543210?text=Hi,%20I%20just%20sent%20an%20enquiry%20on%20your%20website.";

  return (
    <LanguageProvider>
      <Router>
        <ScrollProgress />
        <div className="min-h-screen font-sans bg-bg-light text-navy overflow-x-hidden selection:bg-shuttle-lime selection:text-navy flex flex-col relative">
          <Nav />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/coaches" element={<CoachesPage />} />
              <Route path="/centres" element={<CentresPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/book-trial" element={<BookTrialPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Global WhatsApp Floating Button */}
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full border-2 border-navy hard-shadow hover-lift flex items-center justify-center transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
      </Router>
    </LanguageProvider>
  );
}


