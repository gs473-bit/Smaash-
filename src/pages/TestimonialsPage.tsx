import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { testimonials } from '../data/testimonials';
import { Quote } from 'lucide-react';

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
  label: { en: "Testimonials", mr: "प्रशस्तिपत्रे" },
  title: { en: "Stories from the Court", mr: "कोर्टवरच्या कथा" },
  subtitle: { en: "Hear from our athletes, parents, and community about their SmashPoint journey.", mr: "आमचे खेळाडू, पालक आणि समुदायाकडून त्यांच्या स्मॅशपॉईंट प्रवासाबद्दल ऐका." },
  ctaTitle: { en: "Become Our Next Success Story", mr: "आमची पुढची यशोगाथा बना" },
  ctaDesc: { en: "Experience the SmashPoint difference firsthand.", mr: "स्मॅशपॉईंटचा फरक स्वतः अनुभवा." },
  ctaButton: { en: "Book a Trial", mr: "चाचणी बुक करा" }
};

export function TestimonialsPage() {
  const { t } = useLanguage();
  const featured = testimonials[0];
  const remaining = testimonials.slice(1);

  return (
    <div className="bg-bg-light min-h-screen pt-32 pb-0">
      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16 md:mb-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Featured Testimonial */}
        {featured && (
          <FadeIn delay={0.2} className="mb-16">
            <div className="bg-electric-blue text-white rounded-2xl p-8 md:p-12 relative overflow-hidden hard-shadow border-2 border-navy">
              <Quote className="absolute top-4 right-4 md:top-8 md:right-8 w-24 h-24 md:w-48 md:h-48 text-white/10 -rotate-12" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full border-4 border-shuttle-lime overflow-hidden hard-shadow bg-navy">
                  <img src={featured.avatar} alt={t(featured.name)} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <p className="font-heading font-bold text-2xl md:text-4xl leading-tight mb-8">
                    "{t(featured.quote)}"
                  </p>
                  <div>
                    <div className="font-heading font-black text-xl uppercase tracking-wider mb-1">
                      {t(featured.name)}
                    </div>
                    <div className="inline-block bg-shuttle-lime text-navy font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">
                      {t(featured.role)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {remaining.map((test, idx) => {
            const isLime = idx % 2 === 0;
            const accentColor = isLime ? 'bg-shuttle-lime text-navy' : 'bg-vivid-teal text-white';
            const borderColor = isLime ? 'border-shuttle-lime' : 'border-vivid-teal';

            return (
              <React.Fragment key={test.id}>
                <FadeIn delay={0.1 * (idx % 3)} className="break-inside-avoid">
                  <div className="bg-white p-8 rounded-xl border-2 border-navy hard-shadow hover-lift flex flex-col relative h-full">
                  <Quote className={`absolute top-6 right-6 w-12 h-12 opacity-10 ${isLime ? 'text-shuttle-lime' : 'text-vivid-teal'}`} />
                  
                  <p className="font-medium text-lg text-navy/80 mb-8 relative z-10 italic">
                    "{t(test.quote)}"
                  </p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <div className={`w-16 h-16 shrink-0 rounded-full border-2 ${borderColor} overflow-hidden bg-navy`}>
                      <img src={test.avatar} alt={t(test.name)} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <div className="font-heading font-black text-lg uppercase tracking-tight text-navy mb-1">
                        {t(test.name)}
                      </div>
                      <div className={`inline-block font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider ${accentColor}`}>
                        {t(test.role)}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              </React.Fragment>
            );
          })}
        </div>
      </div>

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
