/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Trophy, Users, ArrowRight, Activity, ChevronRight, Menu, X } from 'lucide-react';

function StatCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const duration = 1500;
      const step = Math.max(1, Math.floor(target / (duration / 16)));
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-heading text-4xl md:text-5xl font-black text-electric-blue">{count}+</span>
      <span className="font-sans font-bold text-navy uppercase tracking-wider text-sm mt-1">{label}</span>
    </div>
  );
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-bg-light text-navy overflow-x-hidden selection:bg-shuttle-lime selection:text-navy">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-bg-light/90 backdrop-blur-md z-50 border-b border-navy-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-electric-blue" strokeWidth={3} />
              <span className="font-heading font-black text-2xl tracking-tight">SMASH<span className="text-electric-blue">POINT</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#programs" className="font-bold text-navy hover:text-electric-blue transition-colors">PROGRAMS</a>
              <a href="#centers" className="font-bold text-navy hover:text-electric-blue transition-colors">CENTERS</a>
              <a href="#coaches" className="font-bold text-navy hover:text-electric-blue transition-colors">COACHES</a>
              <button className="bg-electric-blue text-white font-bold py-2.5 px-6 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-wide text-sm flex items-center gap-2">
                Book Trial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="md:hidden flex items-center">
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
          <a href="#programs" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">PROGRAMS</a>
          <a href="#centers" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">CENTERS</a>
          <a href="#coaches" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-black text-3xl">COACHES</a>
          <button className="bg-shuttle-lime text-navy font-bold py-4 px-6 rounded-lg hard-shadow w-full text-left uppercase tracking-wide text-xl flex items-center justify-between border border-navy mt-4">
            Book a Trial
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-vivid-teal text-navy font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-6 border border-navy">
              India's #1 Badminton Academy
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-6 uppercase">
              Own the <br />
              <span className="text-electric-blue">Court.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-md font-medium text-navy/80">
              Elite coaching. Pro facilities. We build champions from the ground up. Stop playing, start dominating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-shuttle-lime text-navy font-bold py-4 px-8 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-wide text-lg flex items-center justify-center gap-2 group">
                Join Academy
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-navy font-bold py-4 px-8 rounded-lg border border-navy hover:bg-navy-10 transition-colors uppercase tracking-wide text-lg text-center">
                Find a Center
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-electric-blue rounded-xl border-2 border-navy hard-shadow overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop" 
                alt="Badminton player smashing" 
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="bg-white px-4 py-2 rounded-lg border border-navy hard-shadow">
                  <div className="font-heading font-black text-2xl">200+</div>
                  <div className="text-xs font-bold uppercase tracking-wider">Active Players</div>
                </div>
                <div className="bg-match-red text-white px-4 py-2 rounded-lg border border-navy hard-shadow">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-4 h-4" /> Top Tier
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-navy-10 mt-20">
          <StatCounter target={12} label="Centers in India" />
          <StatCounter target={50} label="Pro Coaches" />
          <StatCounter target={500} label="Tournaments Won" />
          <StatCounter target={2500} label="Students Trained" />
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-electric-blue text-white relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-shuttle-lime border-b border-navy"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-black text-5xl md:text-6xl mb-4 uppercase tracking-tight">Pick Your Path</h2>
            <p className="text-xl mb-16 max-w-2xl text-blue-100 font-medium">Programs designed for every level. We push you to your absolute limit.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white text-navy rounded-xl p-8 border-2 border-navy hard-shadow hover-lift h-full flex flex-col">
                <div className="w-14 h-14 bg-shuttle-lime rounded-lg border border-navy flex items-center justify-center mb-6">
                  <span className="font-heading font-black text-2xl">01</span>
                </div>
                <h3 className="font-heading font-black text-2xl mb-3 uppercase">Smash Kids</h3>
                <p className="mb-6 font-medium text-navy/80">Ages 6-15. Build fundamentals, agility, and a winning mindset early.</p>
                <div className="mt-auto">
                  <div className="flex gap-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider bg-navy-10 px-2 py-1 rounded">Beginner</span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-navy-10 px-2 py-1 rounded">Intermediate</span>
                  </div>
                  <button className="w-full bg-navy text-white font-bold py-3 rounded-lg border border-navy hover:bg-navy/90 transition-colors uppercase tracking-wide text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white text-navy rounded-xl p-8 border-2 border-navy hard-shadow hover-lift h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-match-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-navy">Popular</div>
                <div className="w-14 h-14 bg-vivid-teal rounded-lg border border-navy flex items-center justify-center mb-6">
                  <span className="font-heading font-black text-2xl">02</span>
                </div>
                <h3 className="font-heading font-black text-2xl mb-3 uppercase">Adult Pro</h3>
                <p className="mb-6 font-medium text-navy/80">Intense drill sessions and match play for adults who want to dominate local leagues.</p>
                <div className="mt-auto">
                  <div className="flex gap-2 mb-6 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider bg-navy-10 px-2 py-1 rounded">Intermediate</span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-navy-10 px-2 py-1 rounded">Advanced</span>
                  </div>
                  <button className="w-full bg-electric-blue text-white font-bold py-3 rounded-lg border border-navy hard-shadow-hover transition-all uppercase tracking-wide text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-navy text-white rounded-xl p-8 border-2 border-white/20 hard-shadow-blue hover-lift h-full flex flex-col">
                <div className="w-14 h-14 bg-white text-navy rounded-lg flex items-center justify-center mb-6">
                  <span className="font-heading font-black text-2xl">03</span>
                </div>
                <h3 className="font-heading font-black text-2xl mb-3 uppercase">Elite Squad</h3>
                <p className="mb-6 text-white/80 font-medium">Invitation only. High-performance coaching for tournament-level athletes.</p>
                <div className="mt-auto">
                  <div className="flex gap-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded">Pro</span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded">Tournaments</span>
                  </div>
                  <button className="w-full bg-transparent border border-white text-white font-bold py-3 rounded-lg hover:bg-white/10 transition-colors uppercase tracking-wide text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Centers Section */}
      <section id="centers" className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn>
              <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight">Our Arenas</h2>
              <p className="text-xl mt-4 font-medium max-w-xl text-navy/80">World-class BWF approved synthetic mats. Brilliant lighting. Pure focus.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <button className="bg-white text-navy font-bold py-3 px-6 rounded-lg border border-navy hard-shadow hover-lift uppercase tracking-wide text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                View All 12 Centers
              </button>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="group bg-white rounded-xl border border-navy-10 overflow-hidden hover:border-navy transition-colors flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-48 sm:h-auto bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop" alt="Center" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="font-heading font-black text-2xl uppercase mb-2">HSR Layout</h3>
                  <p className="text-navy/70 font-medium mb-4 flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" /> Bangalore, Karnataka
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <div className="font-black text-xl">8</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Courts</div>
                    </div>
                    <div>
                      <div className="font-black text-xl text-vivid-teal">Yes</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Pro Shop</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group bg-white rounded-xl border border-navy-10 overflow-hidden hover:border-navy transition-colors flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-48 sm:h-auto bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1579691851221-3e4b77f805a5?q=80&w=2070&auto=format&fit=crop" alt="Center" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="font-heading font-black text-2xl uppercase mb-2">Bandra West</h3>
                  <p className="text-navy/70 font-medium mb-4 flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" /> Mumbai, Maharashtra
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <div className="font-black text-xl">6</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Courts</div>
                    </div>
                    <div>
                      <div className="font-black text-xl text-match-red">Soon</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Pro Shop</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-shuttle-lime border-t-2 border-b-2 border-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-navy">Ready to Sweat?</h2>
          <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">Book your first trial session. Bring your racket. We'll bring the heat.</p>
          <button className="bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl">
            Book Trial Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 border-b border-white/20 pb-12 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-8 h-8 text-shuttle-lime" strokeWidth={3} />
              <span className="font-heading font-black text-2xl tracking-tight">SMASH<span className="text-shuttle-lime">POINT</span></span>
            </div>
            <p className="text-white/60 font-medium max-w-sm">
              The premier destination for badminton training in India. Play hard, train harder.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-wider text-vivid-teal">Links</h4>
            <ul className="space-y-3 font-medium text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Coaches</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-wider text-vivid-teal">Legal</h4>
            <ul className="space-y-3 font-medium text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Rules</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} SmashPoint Academy</p>
          <p className="mt-2 md:mt-0">Never Stop Moving.</p>
        </div>
      </footer>
    </div>
  );
}

