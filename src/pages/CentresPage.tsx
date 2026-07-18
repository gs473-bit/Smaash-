import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { centres } from '../data/centres';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin, Map as MapIcon, Phone, CheckCircle2, ChevronRight, Check } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

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
  label: { en: "Centres", mr: "केंद्रे" },
  title: { en: "Find a centre near you", mr: "तुमच्या जवळचे केंद्र शोधा" },
  subtitle: { en: "We are currently operating at {count} locations across Maharashtra.", mr: "आम्ही सध्या महाराष्ट्रात {count} ठिकाणी कार्यरत आहोत." },
  labels: {
    courts: { en: "Courts", mr: "कोर्ट्स" },
    coaches: { en: "Coaches", mr: "प्रशिक्षक" },
    hours: { en: "Hours", mr: "वेळ" },
    proShop: { en: "Pro Shop", mr: "प्रो शॉप" },
    directions: { en: "Get directions", mr: "मार्ग मिळवा" },
    bookTrial: { en: "Book a trial here", mr: "येथे चाचणी बुक करा" },
    call: { en: "Call this centre", mr: "या केंद्राला कॉल करा" },
    ctaTitle: { en: "Don't see a centre near you?", mr: "तुमच्या जवळचे केंद्र दिसत नाही?" },
    ctaDesc: { en: "Tell us where you are. We are constantly expanding to new cities and neighborhoods.", mr: "तुम्ही कुठे आहात ते आम्हाला सांगा. आम्ही सतत नवीन शहरे आणि परिसरात विस्तार करत आहोत." },
    ctaButton: { en: "Tell Us", mr: "आम्हाला सांगा" }
  },
  placeholderPhotos: [
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595166297379-3c35b45070db?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop",
  ]
};

export function CentresPage() {
  const { t } = useLanguage();
  const [activeCentre, setActiveCentre] = useState(centres[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCentre = (id: string) => {
    setActiveCentre(id);
    const element = sectionRefs.current[id];
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      let currentActive = activeCentre;
      for (const centre of centres) {
        const element = sectionRefs.current[centre.id];
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            currentActive = centre.id;
          }
        }
      }
      
      if (currentActive !== activeCentre) {
        setActiveCentre(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCentre]);

  if (!hasValidKey) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-8 pt-32 text-center text-navy">
        <div className="max-w-xl bg-white p-10 rounded-xl border-2 border-navy hard-shadow">
          <MapIcon className="w-16 h-16 mx-auto mb-6 text-coral-red" />
          <h2 className="font-heading font-black text-3xl uppercase tracking-tight mb-4">Google Maps API Key Required</h2>
          <div className="text-left space-y-4 mb-8">
            <p><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-vivid-teal underline">Get an API Key</a></p>
            <p><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
              <li>Select <strong>Secrets</strong></li>
              <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
              <li>Paste your API key as the value, press <strong>Enter</strong></li>
            </ul>
            <p className="font-bold text-sm bg-shuttle-lime/20 p-3 rounded">The app rebuilds automatically after you add the secret.</p>
          </div>
        </div>
      </div>
    );
  }

  const mapCenter = {
    lat: centres.reduce((sum, c) => sum + c.lat, 0) / centres.length,
    lng: centres.reduce((sum, c) => sum + c.lng, 0) / centres.length
  };

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="bg-bg-light min-h-screen">
        {/* Header Section */}
        <section className="pt-32 pb-12 md:pt-48 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <div className="inline-block bg-vivid-teal/10 text-vivid-teal font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest text-sm border border-vivid-teal/20">
              {t(pageData.label)}
            </div>
            <h1 className="font-heading font-black text-5xl md:text-7xl leading-[1.1] tracking-tighter mb-6 text-navy uppercase">
              {t(pageData.title)}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-navy/70">
              {t(pageData.subtitle).replace('{count}', centres.length.toString())}
            </p>
          </motion.div>
        </section>

        {/* Map Overview */}
        <section className="w-full h-[50vh] min-h-[400px] border-y-2 border-navy relative bg-gray-200">
          <Map
            defaultCenter={mapCenter}
            defaultZoom={6}
            mapId="CENTRES_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{width: '100%', height: '100%'}}
            disableDefaultUI={false}
          >
            {centres.map((centre) => (
              <AdvancedMarker 
                key={centre.id} 
                position={{ lat: centre.lat, lng: centre.lng }}
                onClick={() => scrollToCentre(centre.id)}
                className="cursor-pointer"
              >
                <Pin 
                  background={activeCentre === centre.id ? "#D0F553" : "#1A64ED"} 
                  borderColor="#0A2463"
                  glyphColor={activeCentre === centre.id ? "#0A2463" : "#FFFFFF"} 
                  scale={activeCentre === centre.id ? 1.2 : 1}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </section>

        {/* Jump-to Chips */}
        <div className="sticky top-16 md:top-20 z-40 bg-bg-light/95 backdrop-blur-md border-b-2 border-navy mb-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex overflow-x-auto no-scrollbar gap-3 md:gap-4 pb-1">
              {centres.map((centre) => (
                <button
                  key={centre.id}
                  onClick={() => scrollToCentre(centre.id)}
                  className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm md:text-base whitespace-nowrap transition-colors border-2 ${
                    activeCentre === centre.id 
                      ? 'bg-shuttle-lime border-navy text-navy hard-shadow' 
                      : 'bg-white border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
                  }`}
                >
                  {t(centre.name)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Centre Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid lg:grid-cols-2 gap-10">
            {centres.map((centre, idx) => (
              <section 
                key={centre.id} 
                id={centre.id}
                ref={(el) => (sectionRefs.current[centre.id] = el)}
                className="scroll-mt-40"
              >
                <FadeIn delay={0.1 * (idx % 2 + 1)} className="h-full">
                  <div className={`bg-white rounded-xl border-2 border-navy hard-shadow hover-lift shine-effect overflow-hidden flex flex-col h-full transition-transform duration-300 ${activeCentre === centre.id ? '-translate-y-2' : ''}`}>
                    {/* Photos Strip */}
                    <div className="grid grid-cols-3 gap-1 h-32 md:h-40 bg-navy p-1">
                      {pageData.placeholderPhotos.map((photo, i) => (
                        <div key={i} className="relative overflow-hidden group duotone-navy">
                          <img 
                            src={photo} 
                            alt={`${t(centre.name)} photo ${i + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <div className="mb-6 flex justify-between items-start gap-4">
                        <div>
                          <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-navy mb-2">
                            {t(centre.name)}
                          </h2>
                          <p className="font-medium text-navy/70 flex items-start gap-2 text-lg">
                            <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-coral-red" />
                            {t(centre.address)}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-bg-light p-3 md:p-4 rounded-lg border border-navy text-center">
                          <div className="font-black text-2xl md:text-3xl text-navy">{centre.courts}</div>
                          <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-navy/70 mt-1">{t(pageData.labels.courts)}</div>
                        </div>
                        <div className="bg-bg-light p-3 md:p-4 rounded-lg border border-navy text-center">
                          <div className="font-black text-2xl md:text-3xl text-navy">{centre.coaches}</div>
                          <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-navy/70 mt-1">{t(pageData.labels.coaches)}</div>
                        </div>
                        <div className="bg-bg-light p-3 md:p-4 rounded-lg border border-navy text-center flex flex-col justify-center">
                          <div className="font-bold text-sm md:text-base text-navy leading-tight">{t(centre.hours)}</div>
                        </div>
                      </div>

                      {/* Facilities */}
                      <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                          {centre.facilities.map((fac, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-vivid-teal/10 text-navy font-bold px-3 py-1.5 rounded-md text-sm border border-vivid-teal/20">
                              <Check className="w-4 h-4 text-vivid-teal" />
                              {t(fac)}
                            </span>
                          ))}
                          {centre.hasProShop && (
                            <span className="inline-flex items-center gap-1.5 bg-shuttle-lime/20 text-navy font-bold px-3 py-1.5 rounded-md text-sm border border-shuttle-lime/30">
                              <Check className="w-4 h-4 text-shuttle-lime" />
                              {t(pageData.labels.proShop)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${centre.lat},${centre.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-electric-blue font-bold hover:underline mb-2"
                        >
                          {t(pageData.labels.directions)}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Link 
                            to={`/book-trial?centre=${centre.id}`}
                            className="inline-flex items-center justify-center bg-shuttle-lime text-navy font-bold py-3.5 px-6 rounded-lg border-2 border-navy hard-shadow hover-lift uppercase tracking-widest text-sm transition-transform"
                          >
                            {t(pageData.labels.bookTrial)}
                          </Link>
                          <a 
                            href={`tel:+919876543210`}
                            className="inline-flex items-center justify-center gap-2 bg-white text-navy font-bold py-3.5 px-6 rounded-lg border-2 border-navy hover-lift uppercase tracking-widest text-sm transition-transform"
                          >
                            <Phone className="w-4 h-4" />
                            {t(pageData.labels.call)}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-shuttle-lime border-t-2 border-navy clip-diagonal bg-pattern-dots pb-32">
          <div className="max-w-4xl mx-auto px-4 text-center mt-12 relative z-10">
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tighter mb-4 text-navy">{t(pageData.labels.ctaTitle)}</h2>
            <p className="text-xl md:text-2xl font-bold mb-10 text-navy/80">{t(pageData.labels.ctaDesc)}</p>
            <Link 
              to="/contact?subject=new-centre-request" 
              className="inline-block bg-navy text-white font-bold py-5 px-10 rounded-lg hard-shadow hover-lift border border-navy uppercase tracking-widest text-lg md:text-xl"
            >
              {t(pageData.labels.ctaButton)}
            </Link>
          </div>
        </section>
      </div>
    </APIProvider>
  );
}
