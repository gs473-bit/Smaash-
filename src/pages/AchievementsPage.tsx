import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { achievements } from '../data/achievements';
import { StatCounter } from '../components/StatCounter';
import { Trophy, Medal, Star } from 'lucide-react';

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
  label: { en: "Achievements", mr: "कामगिरी" },
  title: { en: "A Legacy of Champions", mr: "चॅम्पियन्सचा वारसा" },
  subtitle: { en: "Our athletes consistently dominate at district, state, and national levels.", mr: "आमचे खेळाडू सतत जिल्हा, राज्य आणि राष्ट्रीय स्तरावर वर्चस्व गाजवतात." },
  stats: {
    medals: { en: "Total Medals", mr: "एकूण पदके" },
    national: { en: "National Rankings", mr: "राष्ट्रीय क्रमवारी" },
    state: { en: "State Titles", mr: "राज्य विजेतेपदे" },
    tournaments: { en: "Tournaments Won", mr: "जिंकलेल्या स्पर्धा" }
  },
  filters: {
    ageGroup: {
      All: { en: "All Ages", mr: "सर्व वयोगट" },
      U11: { en: "U11", mr: "११-वर्षाखालील" },
      U15: { en: "U15", mr: "१५-वर्षाखालील" },
      U19: { en: "U19", mr: "१९-वर्षाखालील" },
      Adults: { en: "Adults", mr: "प्रौढ" }
    },
    level: {
      All: { en: "All Levels", mr: "सर्व स्तर" },
      District: { en: "District", mr: "जिल्हा" },
      State: { en: "State", mr: "राज्य" },
      National: { en: "National", mr: "राष्ट्रीय" }
    }
  },
  ctaTitle: { en: "Start Your Journey", mr: "तुमचा प्रवास सुरू करा" },
  ctaDesc: { en: "Every champion started with a single trial session. Book yours today.", mr: "प्रत्येक चॅम्पियनने एकाच चाचणी सत्राने सुरुवात केली होती. तुमची आजच बुक करा." },
  ctaButton: { en: "Book a Trial", mr: "चाचणी बुक करा" }
};

export function AchievementsPage() {
  const { t } = useLanguage();
  const [activeAgeGroup, setActiveAgeGroup] = useState<string>("All");
  const [activeLevel, setActiveLevel] = useState<string>("All");

  const filteredAchievements = achievements.filter(ach => {
    const ageMatch = activeAgeGroup === "All" || ach.ageGroup === activeAgeGroup;
    const levelMatch = activeLevel === "All" || ach.level === activeLevel;
    return ageMatch && levelMatch;
  });

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'Gold': return 'bg-shuttle-lime text-navy border-navy';
      case 'Silver': return 'bg-gray-200 text-navy border-navy';
      case 'Bronze': return 'bg-orange-300 text-navy border-navy';
      case 'Special': return 'bg-coral-red text-white border-navy';
      default: return 'bg-vivid-teal text-navy border-navy';
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'Gold': return <Trophy className="w-4 h-4" />;
      case 'Silver': return <Medal className="w-4 h-4" />;
      case 'Bronze': return <Medal className="w-4 h-4" />;
      case 'Special': return <Star className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Stat Band */}
      <section className="bg-navy pt-32 pb-16 border-b-2 border-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <StatCounter target={350} label={t(pageData.stats.medals)} numberColor="text-shuttle-lime" labelColor="text-white" />
            <StatCounter target={42} label={t(pageData.stats.national)} numberColor="text-shuttle-lime" labelColor="text-white" />
            <StatCounter target={85} label={t(pageData.stats.state)} numberColor="text-shuttle-lime" labelColor="text-white" />
            <StatCounter target={120} label={t(pageData.stats.tournaments)} numberColor="text-shuttle-lime" labelColor="text-white" />
          </div>
        </div>
      </section>

      {/* Header Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
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

      {/* Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(pageData.filters.ageGroup) as Array<keyof typeof pageData.filters.ageGroup>).map((age) => (
              <button
                key={age}
                onClick={() => setActiveAgeGroup(age)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-wider text-sm whitespace-nowrap transition-colors border-2 ${
                  activeAgeGroup === age 
                    ? 'bg-shuttle-lime border-navy text-navy hard-shadow hover-lift' 
                    : 'bg-white border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
                }`}
              >
                {t(pageData.filters.ageGroup[age])}
              </button>
            ))}
          </div>
          <div className="hidden md:block w-0.5 h-10 bg-navy/20"></div>
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(pageData.filters.level) as Array<keyof typeof pageData.filters.level>).map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-wider text-sm whitespace-nowrap transition-colors border-2 ${
                  activeLevel === level 
                    ? 'bg-electric-blue border-navy text-white hard-shadow hover-lift' 
                    : 'bg-white border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
                }`}
              >
                {t(pageData.filters.level[level])}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-navy hard-shadow">
            <Trophy className="w-16 h-16 mx-auto text-navy/20 mb-4" />
            <h3 className="font-heading font-black text-2xl uppercase text-navy/50">No achievements found for this filter.</h3>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((ach, idx) => (
              <React.Fragment key={ach.id}>
                <FadeIn delay={0.1 * (idx % 3)}>
                  <div className="bg-white rounded-xl border-2 border-navy hard-shadow hover-lift overflow-hidden h-full flex flex-col relative group">
                  <div className="h-56 w-full relative bg-gray-200 overflow-hidden border-b-2 border-navy">
                    <img 
                      src={ach.photo} 
                      alt={t(ach.studentName)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-md uppercase tracking-wider text-xs border-2 shadow-[2px_2px_0px_0px_rgba(10,36,99,1)] ${getBadgeStyles(ach.badgeType)}`}>
                        {getBadgeIcon(ach.badgeType)}
                        {ach.badgeType}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-navy mb-2">
                      {t(ach.studentName)}
                    </h3>
                    <div className="font-bold text-coral-red text-lg mb-1 leading-tight">
                      {t(ach.result)}
                    </div>
                    <p className="font-medium text-navy/70 leading-snug">
                      {t(ach.tournament)}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t-2 border-navy/10 flex gap-2 mt-auto">
                      <span className="bg-navy/5 text-navy font-bold px-2 py-1 rounded text-xs uppercase tracking-wider">{ach.ageGroup}</span>
                      <span className="bg-navy/5 text-navy font-bold px-2 py-1 rounded text-xs uppercase tracking-wider">{ach.level}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-shuttle-lime border-t-2 border-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-navy">{t(pageData.ctaTitle)}</h2>
          <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">{t(pageData.ctaDesc)}</p>
          <Link 
            to="/book-trial" 
            className="inline-block bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl"
          >
            {t(pageData.ctaButton)}
          </Link>
        </div>
      </section>
    </div>
  );
}
