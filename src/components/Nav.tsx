import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <nav className="fixed top-0 w-full bg-bg-light/90 backdrop-blur-md z-50 border-b border-navy-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-electric-blue" strokeWidth={3} />
              <span className="font-heading font-black text-2xl tracking-tight">SMASH<span className="text-electric-blue">POINT</span></span>
            </Link>
            
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/programs" className="font-bold text-navy hover:text-electric-blue transition-colors">PROGRAMS</Link>
              <Link to="/centres" className="font-bold text-navy hover:text-electric-blue transition-colors">CENTERS</Link>
              <Link to="/coaches" className="font-bold text-navy hover:text-electric-blue transition-colors">COACHES</Link>
              <div className="flex items-center gap-1 font-bold text-sm bg-navy-10 rounded-full p-1 border border-navy-10">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-white hard-shadow-blue' : 'opacity-70 hover:opacity-100'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('mr')} 
                  className={`px-2 py-1 rounded-full transition-colors ${language === 'mr' ? 'bg-white hard-shadow-blue' : 'opacity-70 hover:opacity-100'}`}
                >
                  MR
                </button>
              </div>
              <Link to="/book-trial" className="bg-electric-blue text-white font-bold py-2.5 px-6 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-wide text-sm flex items-center gap-2">
                Book Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <div className="flex items-center gap-1 font-bold text-xs bg-navy-10 rounded-full p-1 border border-navy-10">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-white hard-shadow-blue' : 'opacity-70 hover:opacity-100'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('mr')} 
                  className={`px-2 py-1 rounded-full transition-colors ${language === 'mr' ? 'bg-white hard-shadow-blue' : 'opacity-70 hover:opacity-100'}`}
                >
                  MR
                </button>
              </div>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-navy">
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-bg-light border-t border-navy-10 md:hidden flex flex-col p-6 space-y-6">
          <Link to="/programs" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">PROGRAMS</Link>
          <Link to="/centres" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">CENTERS</Link>
          <Link to="/coaches" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">COACHES</Link>
          <Link to="/book-trial" onClick={() => setIsMobileMenuOpen(false)} className="bg-shuttle-lime text-navy font-bold py-4 px-6 rounded-lg hard-shadow w-full text-left uppercase tracking-wide text-xl flex items-center justify-between border border-navy mt-4">
            Book a Trial
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      )}
    </>
  );
}
