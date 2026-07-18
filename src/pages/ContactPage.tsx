import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

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

const faqs = [
  {
    q: { en: "How do I book a trial class?", mr: "मी चाचणी वर्गासाठी बुकिंग कसे करू?" },
    a: { en: "You can book a trial class directly through our website by clicking the 'Book a Trial' button. Choose your preferred centre and time slot.", mr: "तुम्ही 'चाचणी बुक करा' बटणावर क्लिक करून आमच्या वेबसाइटवरून थेट चाचणी वर्ग बुक करू शकता. तुमचे आवडते केंद्र आणि वेळेचा स्लॉट निवडा." }
  },
  {
    q: { en: "What are the fees for the programs?", mr: "कार्यक्रमांसाठी फी किती आहे?" },
    a: { en: "Fees vary based on the program level, batch size, and frequency of sessions. Please contact your nearest centre or submit an enquiry for a detailed fee structure.", mr: "कार्यक्रम स्तर, बॅचचा आकार आणि सत्रांच्या वारंवारतेनुसार फी बदलते. तपशीलवार फी रचनेसाठी कृपया तुमच्या जवळच्या केंद्राशी संपर्क साधा किंवा चौकशी सबमिट करा." }
  },
  {
    q: { en: "What is the minimum age to join?", mr: "सामील होण्यासाठी किमान वय किती आहे?" },
    a: { en: "We accept students starting from 5 years of age in our Smash Kids beginner program.", mr: "आम्ही आमच्या स्मॅश किड्स नवशिक्या कार्यक्रमात ५ वर्षांपासूनच्या विद्यार्थ्यांना स्वीकारतो." }
  },
  {
    q: { en: "What should I bring to the first class?", mr: "पहिल्या वर्गाला येताना काय आणावे?" },
    a: { en: "Please bring comfortable sports attire, non-marking indoor shoes, a water bottle, and a towel. If you don't have a racquet, we can provide one for your trial session.", mr: "कृपया आरामदायक खेळाचे कपडे, नॉन-मार्किंग इनडोअर शूज, पाण्याची बाटली आणि टॉवेल आणा. तुमच्याकडे रॅकेट नसल्यास, आम्ही तुमच्या चाचणी सत्रासाठी ते देऊ शकतो." }
  },
  {
    q: { en: "Can I practice at multiple centres?", mr: "मी एकाधिक केंद्रांवर सराव करू शकतो का?" },
    a: { en: "Your membership is tied to your primary centre. However, make-up classes or special sessions can sometimes be arranged at other locations upon request.", mr: "तुमची मेंबरशिप तुमच्या प्राथमिक केंद्राशी जोडलेली असते. तथापि, विनंती केल्यास इतर ठिकाणी मेक-अप वर्ग किंवा विशेष सत्रे आयोजित केली जाऊ शकतात." }
  },
  {
    q: { en: "What is your cancellation policy?", mr: "तुमचे रद्द करण्याचे धोरण काय आहे?" },
    a: { en: "We require a 30-day notice for membership cancellations. For daily or weekly sessions, please inform us 24 hours in advance.", mr: "मेंबरशिप रद्द करण्यासाठी आम्हाला ३० दिवसांची पूर्वसूचना आवश्यक आहे. दररोजच्या किंवा साप्ताहिक सत्रांसाठी, कृपया आम्हाला २४ तास आधी कळवा." }
  }
];

const pageData = {
  label: { en: "Contact", mr: "संपर्क" },
  title: { en: "Let's Talk", mr: "चला बोलूया" },
  subtitle: { en: "Have a question or ready to join? Send us a message or visit our head office.", mr: "काही प्रश्न आहेत की सामील होण्यासाठी तयार आहात? आम्हाला संदेश पाठवा किंवा आमच्या मुख्य कार्यालयाला भेट द्या." },
  form: {
    name: { en: "Full Name", mr: "पूर्ण नाव" },
    phone: { en: "Phone Number", mr: "फोन नंबर" },
    email: { en: "Email Address (Optional)", mr: "ईमेल पत्ता (ऐच्छिक)" },
    topic: { en: "How can we help you?", mr: "आम्ही तुम्हाला कशी मदत करू शकतो?" },
    submit: { en: "Send Message", mr: "संदेश पाठवा" },
    successTitle: { en: "Message Sent Successfully!", mr: "संदेश यशस्वीरित्या पाठवला!" },
    successDesc: { en: "Thanks, we'll reach out to you within 24 hours. For urgent queries, feel free to WhatsApp us.", mr: "धन्यवाद, आम्ही २४ तासांच्या आत तुमच्याशी संपर्क साधू. तातडीच्या चौकशीसाठी, आम्हाला व्हॉट्सॲपवर मोकळेपणाने मेसेज करा." },
    whatsappBtn: { en: "Chat on WhatsApp", mr: "व्हॉट्सॲपवर चॅट करा" }
  },
  contact: {
    title: { en: "Head Office", mr: "मुख्य कार्यालय" },
    address: { en: "SmashPoint Arena, Survey No. 45, Baner Road, Pune, Maharashtra 411045", mr: "स्मॅशपॉईंट अरेना, सर्व्हे क्र. ४५, बाणेर रोड, पुणे, महाराष्ट्र ४११०४५" },
    phone: { en: "+91 98765 43210", mr: "+९१ ९८७६५ ४३२१०" },
    email: { en: "hello@smashpoint.in", mr: "hello@smashpoint.in" }
  },
  faq: {
    title: { en: "Frequently Asked Questions", mr: "सतत विचारले जाणारे प्रश्न" }
  }
};

export function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const mapCenter = { lat: 18.5590, lng: 73.7868 }; // Baner, Pune approx coords

  const waLink = "https://wa.me/919876543210?text=Hi,%20I%20just%20sent%20an%20enquiry%20on%20your%20website.";

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="bg-bg-light min-h-screen pt-32 pb-24">
        {/* Header Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
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

        {/* Two Column Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Form / Success State */}
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-2xl border-2 border-navy hard-shadow h-full">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6 flex flex-col h-full"
                    >
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.form.name)} *</label>
                        <input required type="text" className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.form.phone)} *</label>
                        <input required type="tel" className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.form.email)}</label>
                        <input type="email" className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.form.topic)} *</label>
                        <textarea required rows={4} className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors resize-none"></textarea>
                      </div>
                      <div className="pt-4 mt-auto">
                        <button type="submit" className="w-full bg-shuttle-lime text-navy font-bold py-4 px-8 rounded-lg border-2 border-navy hard-shadow hover-lift uppercase tracking-widest transition-transform">
                          {t(pageData.form.submit)}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center py-12"
                    >
                      <CheckCircle2 className="w-20 h-20 text-shuttle-lime mb-6" />
                      <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-navy mb-4">{t(pageData.form.successTitle)}</h3>
                      <p className="font-medium text-navy/70 text-lg mb-10 max-w-md">{t(pageData.form.successDesc)}</p>
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-electric-blue text-white font-bold py-4 px-8 rounded-lg border-2 border-navy hard-shadow hover-lift uppercase tracking-widest transition-transform">
                        <MessageCircle className="w-5 h-5" />
                        {t(pageData.form.whatsappBtn)}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* Right: Contact Details */}
            <FadeIn delay={0.2}>
              <div className="bg-navy text-white p-8 md:p-10 rounded-2xl border-2 border-navy hard-shadow h-full flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-10 text-shuttle-lime relative z-10">{t(pageData.contact.title)}</h3>
                
                <div className="space-y-8 mb-12 relative z-10 flex-grow">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-6 h-6 text-vivid-teal shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg leading-relaxed text-white/90">{t(pageData.contact.address)}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Phone className="w-6 h-6 text-vivid-teal shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-xl">{t(pageData.contact.phone)}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Mail className="w-6 h-6 text-vivid-teal shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-xl">{t(pageData.contact.email)}</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-64 rounded-xl border-2 border-navy overflow-hidden bg-gray-200 relative z-10 mt-auto">
                  {hasValidKey ? (
                    <Map
                      defaultCenter={mapCenter}
                      defaultZoom={15}
                      mapId="CONTACT_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{width: '100%', height: '100%'}}
                      disableDefaultUI={false}
                    >
                      <AdvancedMarker position={mapCenter}>
                        <Pin background="#D0F553" borderColor="#0A2463" glyphColor="#0A2463" />
                      </AdvancedMarker>
                    </Map>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-navy/60">
                      <MapPin className="w-8 h-8 mb-2 opacity-50" />
                      <p className="font-bold uppercase tracking-wider text-xs">Map unavailable</p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-black text-4xl uppercase tracking-tighter mb-10 text-center">{t(pageData.faq.title)}</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border-2 border-navy hard-shadow overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-lg md:text-xl uppercase tracking-tight text-navy hover:bg-bg-light transition-colors"
                  >
                    {t(faq.q)}
                    <ChevronDown className={`w-6 h-6 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-electric-blue' : 'text-navy/50'}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 font-medium text-navy/80 text-lg leading-relaxed border-t-2 border-navy/5">
                          {t(faq.a)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>
    </APIProvider>
  );
}
