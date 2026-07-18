import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Zap, Shield, Users, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

const aboutData = {
  heroTitle: { en: "Built by players, for players.", mr: "खेळाडूंनी, खेळाडूंसाठी बनवलेले." },
  heroSubtitle: { en: "We started with one court in Pune. Now we're forging champions across Maharashtra.", mr: "आम्ही पुण्यात एका कोर्टपासून सुरुवात केली. आता आम्ही संपूर्ण महाराष्ट्रात चॅम्पियन्स घडवत आहोत." },
  founderTag: { en: "Rajesh Patil, Head Coach & Founder (Former National Champion)", mr: "राजेश पाटील, मुख्य प्रशिक्षक आणि संस्थापक (माजी राष्ट्रीय चॅम्पियन)" },
  missionTitle: { en: "Our Mission", mr: "आमचे ध्येय" },
  missionText: { en: "To democratize elite badminton training and build a relentless winning mindset.", mr: "उत्कृष्ट बॅडमिंटन प्रशिक्षण सर्वसामान्यांपर्यंत पोहोचवणे आणि जिंकण्याची अदम्य मानसिकता निर्माण करणे." },
  visionTitle: { en: "Our Vision", mr: "आमचा दृष्टिकोन" },
  visionText: { en: "To produce Olympic-level athletes from every corner of Maharashtra.", mr: "महाराष्ट्राच्या कानाकोपऱ्यातून ऑलिम्पिक स्तरावरील खेळाडू घडवणे." },
  philosophyTitle: { en: "Coaching Philosophy", mr: "प्रशिक्षण तत्त्वज्ञान" },
  values: [
    {
      id: 1,
      icon: Target,
      title: { en: "Discipline", mr: "शिस्त" },
      desc: { en: "Talent fails without daily, unrelenting discipline.", mr: "दैनंदिन, कठोर शिस्तीशिवाय गुणवत्ता अपयशी ठरते." },
      bgColor: "bg-electric-blue",
      textColor: "text-white"
    },
    {
      id: 2,
      icon: Zap,
      title: { en: "Agility", mr: "चपळाई" },
      desc: { en: "Speed on the court translates to speed in decision making.", mr: "कोर्टवरील वेग हा निर्णय घेण्याच्या वेगात रूपांतरित होतो." },
      bgColor: "bg-shuttle-lime",
      textColor: "text-navy"
    },
    {
      id: 3,
      icon: Shield,
      title: { en: "Perseverance", mr: "चिकाटी" },
      desc: { en: "We celebrate the grind as much as the victory.", mr: "आम्ही विजयाइतकाच संघर्षाचाही उत्सव साजरा करतो." },
      bgColor: "bg-vivid-teal",
      textColor: "text-navy"
    },
    {
      id: 4,
      icon: Users,
      title: { en: "Teamwork", mr: "सांघिक कार्य" },
      desc: { en: "Even in singles, your squad is your ultimate weapon.", mr: "एकेरीतही, तुमचा संघ हेच तुमचे अंतिम शस्त्र असते." },
      bgColor: "bg-white",
      textColor: "text-navy"
    }
  ],
  milestonesTitle: { en: "The Journey", mr: "प्रवास" },
  milestones: [
    { year: "2018", title: { en: "The First Court", mr: "पहिले कोर्ट" }, desc: { en: "Opened a 2-court facility in Pune.", mr: "पुण्यात २-कोर्ट सुविधेची सुरुवात." } },
    { year: "2020", title: { en: "State Dominance", mr: "राज्यात वर्चस्व" }, desc: { en: "First SmashPoint athlete wins the U-15 State Championship.", mr: "स्मॅशपॉईंटच्या पहिल्या खेळाडूने १५-वर्षाखालील राज्य चॅम्पियनशिप जिंकली." } },
    { year: "2022", title: { en: "Mumbai Expansion", mr: "मुंबईत विस्तार" }, desc: { en: "Launched our flagship Pro Centre in Bandra West.", mr: "वांद्रे पश्चिम येथे आमच्या प्रमुख प्रो सेंटरचा शुभारंभ." } },
    { year: "2024", title: { en: "12 Centres", mr: "१२ केंद्रे" }, desc: { en: "Expanded across Pune, Mumbai, Nashik, and Nagpur.", mr: "पुणे, मुंबई, नाशिक आणि नागपूरमध्ये विस्तार." } }
  ],
  ctaTitle: { en: "Ready to Sweat?", mr: "घाम गाळण्यासाठी तयार आहात?" },
  ctaDesc: { en: "Book your first trial session. Bring your racket. We'll bring the heat.", mr: "तुमचे पहिले चाचणी सत्र बुक करा. तुमचे रॅकेट आणा. आम्ही जोश आणू." },
  ctaButton: { en: "Book Trial Now", mr: "आता चाचणी बुक करा" }
};

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-6 uppercase text-navy">
              {t(aboutData.heroTitle)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-md font-medium text-navy/80">
              {t(aboutData.heroSubtitle)}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="aspect-square md:aspect-[4/5] rounded-xl border-2 border-navy hard-shadow overflow-hidden relative bg-electric-blue">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover mix-blend-overlay opacity-90 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-shuttle-lime text-navy px-4 py-3 rounded-lg border border-navy hard-shadow inline-block">
                  <div className="font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-5 h-5 shrink-0" /> {t(aboutData.founderTag)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Block */}
      <section className="py-24 bg-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <div className="border-l-4 border-shuttle-lime pl-8 md:pl-10">
                <h3 className="font-heading font-black text-2xl uppercase tracking-widest text-shuttle-lime mb-4">{t(aboutData.missionTitle)}</h3>
                <p className="font-heading font-bold text-3xl md:text-5xl leading-tight">"{t(aboutData.missionText)}"</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="border-l-4 border-vivid-teal pl-8 md:pl-10">
                <h3 className="font-heading font-black text-2xl uppercase tracking-widest text-vivid-teal mb-4">{t(aboutData.visionTitle)}</h3>
                <p className="font-heading font-bold text-3xl md:text-5xl leading-tight">"{t(aboutData.visionText)}"</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Coaching Philosophy */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight mb-16 text-center">{t(aboutData.philosophyTitle)}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.map((val, idx) => (
              <React.Fragment key={val.id}>
                <FadeIn delay={0.1 * (idx + 1)}>
                  <div className={`${val.bgColor} ${val.textColor} rounded-xl p-8 border-2 border-navy hard-shadow hover-lift h-full flex flex-col`}>
                    <div className={`w-14 h-14 rounded-lg border border-navy flex items-center justify-center mb-6 bg-white text-navy`}>
                      <val.icon className="w-8 h-8" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-heading font-black text-2xl mb-3 uppercase">{t(val.title)}</h3>
                    <p className="font-medium opacity-90">{t(val.desc)}</p>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-24 bg-electric-blue text-white overflow-hidden border-t-2 border-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight mb-20">{t(aboutData.milestonesTitle)}</h2>
          </FadeIn>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 left-8 bottom-0 w-1 bg-white/20 md:hidden"></div>
            <div className="hidden md:block absolute top-7 left-0 right-0 h-1 bg-white/20"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {aboutData.milestones.map((milestone, idx) => (
                <React.Fragment key={idx}>
                  <FadeIn delay={0.1 * (idx + 1)} className="relative z-10 flex md:flex-col items-start gap-6 md:gap-6">
                    <div className="shrink-0 w-16 h-16 bg-shuttle-lime rounded-full border-4 border-navy flex items-center justify-center hard-shadow relative z-10 mt-0 md:mt-0">
                      <span className="font-heading font-black text-navy text-sm md:text-base">{milestone.year}</span>
                    </div>
                    <div className="pt-3 md:pt-0">
                      <h4 className="font-heading font-black text-2xl uppercase mb-2">{t(milestone.title)}</h4>
                      <p className="font-medium text-white/80">{t(milestone.desc)}</p>
                    </div>
                  </FadeIn>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-shuttle-lime border-t-2 border-b-2 border-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-navy">{t(aboutData.ctaTitle)}</h2>
          <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">{t(aboutData.ctaDesc)}</p>
          <Link to="/book-trial" className="inline-block bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl">
            {t(aboutData.ctaButton)}
          </Link>
        </div>
      </section>
    </>
  );
}
