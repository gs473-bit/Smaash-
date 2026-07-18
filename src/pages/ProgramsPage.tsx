import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { programs } from '../data/programs';
import { Clock, Users, CalendarDays, Award, Zap } from 'lucide-react';

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
  label: { en: "Programs", mr: "कार्यक्रम" },
  title: { en: "Find the right level to start", mr: "सुरुवात करण्यासाठी योग्य स्तर शोधा" },
  subtitle: { en: "From first swing to national tournaments, we have a clear path for every player's development.", mr: "पहिल्या स्विंगपासून ते राष्ट्रीय स्पर्धांपर्यंत, आमच्याकडे प्रत्येक खेळाडूच्या विकासासाठी स्पष्ट मार्ग आहे." },
  tabs: {
    Beginners: { en: "Beginners", mr: "सुरुवात करणारे" },
    Intermediate: { en: "Intermediate", mr: "मध्यम" },
    "High-Performance": { en: "High-Performance", mr: "उच्च-कामगिरी" },
    Adults: { en: "Adults", mr: "प्रौढ" }
  },
  labels: {
    age: { en: "Age Group", mr: "वयोगट" },
    level: { en: "Skill Level", mr: "कौशल्य स्तर" },
    schedule: { en: "Schedule", mr: "वेळापत्रक" },
    batchSize: { en: "Batch Size", mr: "बॅच आकार" },
    bookTrial: { en: "Book a trial for this program", mr: "या कार्यक्रमासाठी चाचणी बुक करा" },
    eliteBadge: { en: "Elite Track", mr: "एलिट ट्रॅक" }
  }
};

export function ProgramsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(programs[0].category);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = (category: string) => {
    setActiveTab(category);
    const element = sectionRefs.current[category];
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150; // offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Optional: Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset
      
      let currentActive = activeTab;
      for (const category of Object.keys(pageData.tabs)) {
        const element = sectionRefs.current[category];
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            currentActive = category as any;
          }
        }
      }
      
      if (currentActive !== activeTab) {
        setActiveTab(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

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

      {/* Sticky Tabs */}
      <div className="sticky top-16 md:top-20 z-40 bg-bg-light/90 backdrop-blur-md border-b-2 border-navy mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-8">
            {(Object.keys(pageData.tabs) as Array<keyof typeof pageData.tabs>).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => scrollToSection(tabKey)}
                className={`py-4 font-bold uppercase tracking-wider whitespace-nowrap border-b-4 transition-colors ${
                  activeTab === tabKey 
                    ? 'border-shuttle-lime text-navy' 
                    : 'border-transparent text-navy/50 hover:text-navy hover:border-navy/20'
                }`}
              >
                {t(pageData.tabs[tabKey])}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32">
        {programs.map((program, idx) => (
          <section 
            key={program.id} 
            id={program.category}
            ref={(el) => (sectionRefs.current[program.category] = el)}
            className="scroll-mt-40"
          >
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${idx % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              
              {/* Image Side */}
              <FadeIn delay={0.1} className={idx % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <div className="relative aspect-[4/3] rounded-xl border-2 border-navy hard-shadow overflow-hidden bg-electric-blue duotone-navy">
                  <img 
                    src={program.image} 
                    alt={t(program.name)}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent z-10"></div>
                  
                  {program.category === 'High-Performance' && (
                    <div className="absolute top-4 left-4 bg-coral-red text-white font-bold px-4 py-2 rounded uppercase tracking-wider text-sm flex items-center gap-2 border-2 border-navy hard-shadow z-10">
                      <Zap className="w-4 h-4" />
                      {t(pageData.labels.eliteBadge)}
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h2 className="font-heading font-black text-4xl text-white uppercase tracking-tight drop-shadow-md">
                      {t(program.name)}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              {/* Content Side */}
              <FadeIn delay={0.2} className={idx % 2 !== 0 ? 'lg:col-start-1' : ''}>
                <div className="space-y-8">
                  <p className="text-xl md:text-2xl text-navy/80 font-medium">
                    {t(program.description)}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border-2 border-navy hard-shadow">
                      <div className="flex items-center gap-3 mb-2 text-vivid-teal">
                        <Users className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wider text-sm text-navy/60">{t(pageData.labels.age)}</span>
                      </div>
                      <p className="font-bold text-navy text-lg">{t(program.ageRange)}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border-2 border-navy hard-shadow">
                      <div className="flex items-center gap-3 mb-2 text-vivid-teal">
                        <Award className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wider text-sm text-navy/60">{t(pageData.labels.level)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {program.level.map((lvl, lidx) => (
                          <span key={lidx} className="font-bold text-navy text-lg">
                            {t(lvl)}{lidx < program.level.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border-2 border-navy hard-shadow">
                      <div className="flex items-center gap-3 mb-2 text-vivid-teal">
                        <CalendarDays className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wider text-sm text-navy/60">{t(pageData.labels.schedule)}</span>
                      </div>
                      <p className="font-bold text-navy text-lg">{t(program.schedule)}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border-2 border-navy hard-shadow">
                      <div className="flex items-center gap-3 mb-2 text-vivid-teal">
                        <Clock className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wider text-sm text-navy/60">{t(pageData.labels.batchSize)}</span>
                      </div>
                      <p className="font-bold text-navy text-lg">{t(program.batchSize)}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link 
                      to={`/book-trial?program=${program.id}`}
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-shuttle-lime text-navy font-bold py-4 px-8 rounded-lg border-2 border-navy hard-shadow hover-lift uppercase tracking-widest transition-transform"
                    >
                      {t(pageData.labels.bookTrial)}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
