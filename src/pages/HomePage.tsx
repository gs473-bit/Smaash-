import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { programs } from '../data/programs';
import { centres } from '../data/centres';
import { StatCounter } from '../components/StatCounter';

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

export function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-vivid-teal text-navy font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-6 border border-navy">
              Maharashtra's #1 Badminton Academy
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-6 uppercase">
              Own the <br />
              <span className="text-electric-blue">Court.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-md font-medium text-navy/80">
              Elite coaching. Pro facilities. We build champions from the ground up. Stop playing, start dominating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-trial" className="bg-shuttle-lime text-navy font-bold py-4 px-8 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-wide text-lg flex items-center justify-center gap-2 group">
                Join Academy
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/centres" className="bg-white text-navy font-bold py-4 px-8 rounded-lg border border-navy hover:bg-navy-10 transition-colors uppercase tracking-wide text-lg text-center">
                Find a Center
              </Link>
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
          <StatCounter target={12} label="Centers in MH" />
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
            {programs.map((program, idx) => (
              <React.Fragment key={program.id}>
                <FadeIn delay={0.1 * (idx + 1)}>
                <div className={`rounded-xl p-8 border-2 hard-shadow hover-lift h-full flex flex-col relative overflow-hidden ${
                  idx === 0 ? 'bg-white text-navy border-navy' : 
                  idx === 1 ? 'bg-white text-navy border-navy' : 
                  'bg-navy text-white border-white/20 shadow-none hard-shadow-blue'
                }`}>
                  {idx === 1 && (
                    <div className="absolute top-4 right-4 bg-match-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-navy">Popular</div>
                  )}
                  <div className={`w-14 h-14 rounded-lg border flex items-center justify-center mb-6 ${
                    idx === 0 ? 'bg-shuttle-lime border-navy' :
                    idx === 1 ? 'bg-vivid-teal border-navy' :
                    'bg-white text-navy border-none'
                  }`}>
                    <span className="font-heading font-black text-2xl">0{idx + 1}</span>
                  </div>
                  <h3 className="font-heading font-black text-2xl mb-3 uppercase">{t(program.name)}</h3>
                  <p className={`mb-6 font-medium ${idx === 2 ? 'text-white/80' : 'text-navy/80'}`}>
                    {t(program.description)}
                  </p>
                  <div className="mt-auto">
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {program.level.map((lvl, lidx) => (
                        <span key={lidx} className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                          idx === 2 ? 'bg-white/10' : 'bg-navy-10'
                        }`}>
                          {t(lvl)}
                        </span>
                      ))}
                    </div>
                    <Link to="/programs" className={`w-full font-bold py-3 rounded-lg border uppercase tracking-wide text-sm block text-center transition-colors ${
                      idx === 0 ? 'bg-navy text-white border-navy hover:bg-navy/90' :
                      idx === 1 ? 'bg-electric-blue text-white border-navy hover:opacity-90' :
                      'bg-transparent border-white text-white hover:bg-white/10'
                    }`}>
                      {idx === 2 ? 'Apply Now' : 'View Details'}
                    </Link>
                  </div>
                </div>
              </FadeIn>
              </React.Fragment>
            ))}
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
              <Link to="/centres" className="bg-white text-navy font-bold py-3 px-6 rounded-lg border border-navy hard-shadow hover-lift uppercase tracking-wide text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                View All {centres.length} Centers
              </Link>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {centres.slice(0, 2).map((centre, idx) => (
              <React.Fragment key={centre.id}>
                <FadeIn delay={0.1 * (idx + 1)}>
                <div className="group bg-white rounded-xl border border-navy-10 overflow-hidden hover:border-navy transition-colors flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 h-48 sm:h-auto bg-gray-200 relative">
                    <img 
                      src={idx === 0 ? "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1579691851221-3e4b77f805a5?q=80&w=2070&auto=format&fit=crop"} 
                      alt="Center" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                    <h3 className="font-heading font-black text-2xl uppercase mb-2">{t(centre.name)}</h3>
                    <p className="text-navy/70 font-medium mb-4 flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" /> {t(centre.city)}, Maharashtra
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <div className="font-black text-xl">{centre.courts}</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Courts</div>
                      </div>
                      <div>
                        <div className={`font-black text-xl ${centre.hasProShop ? 'text-vivid-teal' : 'text-match-red'}`}>
                          {centre.hasProShop ? 'Yes' : 'No'}
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-navy/60">Pro Shop</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-shuttle-lime border-t-2 border-b-2 border-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-navy">Ready to Sweat?</h2>
          <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">Book your first trial session. Bring your racket. We'll bring the heat.</p>
          <Link to="/book-trial" className="inline-block bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl">
            Book Trial Now
          </Link>
        </div>
      </section>
    </>
  );
}
