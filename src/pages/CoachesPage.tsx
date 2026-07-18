import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { coaches } from '../data/coaches';
import { Award, Zap } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const pageData = {
  label: { en: "Coaches", mr: "प्रशिक्षक" },
  title: { en: "Learn from the Best", mr: "सर्वोत्कृष्टांकडून शिका" },
  subtitle: { en: "Our coaching staff brings decades of national and international experience to the court.", mr: "आमचे प्रशिक्षक कर्मचारी कोर्टवर अनेक दशकांचा राष्ट्रीय आणि आंतरराष्ट्रीय अनुभव आणतात." },
  headCoachLabel: { en: "Head Coach", mr: "मुख्य प्रशिक्षक" },
  ctaTitle: { en: "Interested in Coaching with Us?", mr: "आमच्यासोबत प्रशिक्षण देण्यास इच्छुक आहात?" },
  ctaDesc: { en: "We are always looking for passionate, certified coaches to join the SmashPoint family.", mr: "आम्ही नेहमीच स्मॅशपॉईंट कुटुंबात सामील होण्यासाठी उत्कट, प्रमाणित प्रशिक्षकांच्या शोधात असतो." },
  ctaButton: { en: "Get in Touch", mr: "संपर्क साधा" }
};

export function CoachesPage() {
  const { t } = useLanguage();
  const headCoach = coaches.find(c => c.isHeadCoach) || coaches[0];
  const regularCoaches = coaches.filter(c => !c.isHeadCoach);

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <div className="inline-block bg-vivid-teal/10 text-vivid-teal font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest text-sm border border-vivid-teal/20">
            {t(pageData.label)}
          </div>
          <h1 className="font-heading font-black text-5xl md:text-7xl leading-[1.1] tracking-tighter mb-6 text-navy uppercase">
            {t(pageData.title)}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-navy/70">
            {t(pageData.subtitle)}
          </p>
        </motion.div>
      </section>

      {/* Featured Head Coach Section */}
      {headCoach && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeIn>
            <div className="bg-electric-blue rounded-xl border-2 border-navy hard-shadow overflow-hidden flex flex-col md:flex-row text-white">
              <div className="md:w-2/5 relative h-64 md:h-auto">
                <img 
                  src={headCoach.photo} 
                  alt={t(headCoach.name)} 
                  className="w-full h-full object-cover mix-blend-overlay opacity-90 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent md:bg-gradient-to-r"></div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 text-shuttle-lime font-bold uppercase tracking-widest text-sm">
                  <Award className="w-5 h-5" />
                  {t(pageData.headCoachLabel)}
                </div>
                <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight mb-2">
                  {t(headCoach.name)}
                </h2>
                <p className="font-bold text-white/80 text-lg mb-6">
                  {t(headCoach.credentials)}
                </p>
                <div className="inline-block bg-vivid-teal text-navy font-bold px-3 py-1 rounded-md uppercase tracking-wider text-xs mb-6 self-start border border-navy shadow-[2px_2px_0px_0px_rgba(10,36,99,1)]">
                  {t(headCoach.specialization)}
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed opacity-95">
                  "{t(headCoach.bio)}"
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Coaches Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {regularCoaches.map((coach, idx) => (
            <React.Fragment key={coach.id}>
              <FadeIn delay={0.1 * (idx + 1)}>
                <div className="group bg-white rounded-xl border-2 border-navy hard-shadow hover-lift overflow-hidden flex flex-col h-full relative cursor-pointer">
                  {/* Photo Section */}
                  <div className="h-64 sm:h-72 w-full relative bg-gray-200 overflow-hidden border-b-2 border-navy">
                    <img 
                      src={coach.photo} 
                      alt={t(coach.name)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Specialization Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-vivid-teal text-navy font-bold px-3 py-1.5 rounded-md uppercase tracking-wider text-xs border border-navy shadow-[2px_2px_0px_0px_rgba(10,36,99,1)]">
                        {t(coach.specialization)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-white">
                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-navy mb-1">
                      {t(coach.name)}
                    </h3>
                    <p className="font-bold text-navy/60 text-sm mb-4">
                      {t(coach.credentials)}
                    </p>
                  </div>

                  {/* Hover Overlay Reveal (Bio) */}
                  <div className="absolute inset-0 bg-navy text-white p-6 md:p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight mb-1 text-shuttle-lime">
                      {t(coach.name)}
                    </h3>
                    <p className="font-bold text-white/60 text-sm mb-4 border-b border-white/20 pb-4">
                      {t(coach.credentials)}
                    </p>
                    <p className="font-medium text-white/90 leading-relaxed overflow-y-auto no-scrollbar">
                      {t(coach.bio)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-shuttle-lime border-t-2 border-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-navy">{t(pageData.ctaTitle)}</h2>
          <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">{t(pageData.ctaDesc)}</p>
          <Link 
            to="/contact?subject=coaching-inquiry" 
            className="inline-block bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl"
          >
            {t(pageData.ctaButton)}
          </Link>
        </div>
      </section>
    </div>
  );
}
