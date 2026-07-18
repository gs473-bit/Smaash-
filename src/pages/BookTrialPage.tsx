import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { centres } from '../data/centres';
import { programs } from '../data/programs';
import { MapPin, CheckCircle2, ChevronLeft, CalendarPlus, MessageCircle } from 'lucide-react';

const FadeIn = React.forwardRef<HTMLDivElement, { children: React.ReactNode; delay?: number; className?: string }>(({ children, delay = 0, className = "" }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, delay }}
    className={className}
  >
    {children}
  </motion.div>
));
FadeIn.displayName = "FadeIn";

const pageData = {
  step1: {
    title: { en: "Let's find your first class.", mr: "चला तुमचा पहिला वर्ग शोधूया." },
    centreLabel: { en: "Select a Centre", mr: "एक केंद्र निवडा" },
    programLabel: { en: "Select a Program", mr: "एक कार्यक्रम निवडा" }
  },
  step2: {
    title: { en: "Pick a time that works for you.", mr: "तुमच्या सोयीची वेळ निवडा." },
    dateLabel: { en: "Preferred Date", mr: "पसंतीची तारीख" },
    timeLabel: { en: "Preferred Time", mr: "पसंतीची वेळ" },
    note: { en: "We'll confirm your exact slot based on availability.", mr: "आम्ही उपलब्धतेनुसार तुमच्या अचूक स्लॉटची पुष्टी करू." },
    times: {
      morning: { en: "Morning", mr: "सकाळ" },
      afternoon: { en: "Afternoon", mr: "दुपार" },
      evening: { en: "Evening", mr: "संध्याकाळ" }
    }
  },
  step3: {
    title: { en: "Almost there.", mr: "जवळपास पूर्ण झाले." },
    name: { en: "Full Name", mr: "पूर्ण नाव" },
    phone: { en: "Phone Number", mr: "फोन नंबर" },
    email: { en: "Email (Optional)", mr: "ईमेल (ऐच्छिक)" },
    age: { en: "Player's Age", mr: "खेळाडूचे वय" },
    note: { en: "This is a request — our team will confirm your exact slot by phone or WhatsApp within 24 hours.", mr: "ही एक विनंती आहे — आमची टीम २४ तासांच्या आत फोन किंवा व्हॉट्सॲपद्वारे तुमच्या अचूक स्लॉटची पुष्टी करेल." },
    submit: { en: "Book my trial", mr: "माझी चाचणी बुक करा" }
  },
  success: {
    title: { en: "You're booked in!", mr: "तुमचे बुकिंग झाले आहे!" },
    bring: { en: "What to bring: Sports shoes, comfortable clothing. Racket will be provided for trial.", mr: "काय आणावे: स्पोर्ट्स शूज, आरामदायक कपडे. चाचणीसाठी रॅकेट दिले जाईल." },
    calendarBtn: { en: "Add to calendar", mr: "कॅलेंडरमध्ये जोडा" },
    whatsappBtn: { en: "Message us on WhatsApp", mr: "आम्हाला व्हॉट्सॲपवर मेसेज करा" }
  },
  common: {
    back: { en: "Back", mr: "मागे" },
    continue: { en: "Continue", mr: "पुढे जा" }
  }
};

export function BookTrialPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [centreId, setCentreId] = useState<string>(searchParams.get('centre') || '');
  const [programId, setProgramId] = useState<string>(searchParams.get('program') || '');
  
  const [date, setDate] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const selectedProgram = programs.find(p => p.id === programId);
  const isAdultProgram = selectedProgram?.category === 'Adults';
  const selectedCentre = centres.find(c => c.id === centreId);

  const canContinueStep1 = centreId !== '' && programId !== '';
  const canContinueStep2 = date !== '' && timeOfDay !== '';
  const canSubmit = name !== '' && phone !== '' && (isAdultProgram || age !== '');

  const handleNext = () => {
    if (step === 1 && canContinueStep1) setStep(2);
    else if (step === 2 && canContinueStep2) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      setStep(4); // Success
    }
  };

  const generateICS = () => {
    if (!date) return;
    const [year, month, day] = date.split('-');
    
    // Create a generic time slot for the ICS
    let hour = 10;
    if (timeOfDay === 'afternoon') hour = 14;
    if (timeOfDay === 'evening') hour = 18;
    
    const startDate = `${year}${month}${day}T${hour.toString().padStart(2, '0')}0000`;
    const endDate = `${year}${month}${day}T${(hour + 1).toString().padStart(2, '0')}0000`;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:SmashPoint Trial Class
DESCRIPTION:Trial class at ${selectedCentre?.name.en} for ${selectedProgram?.name.en}
LOCATION:${selectedCentre?.address.en}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'smashpoint-trial.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const waMessage = `Hi, I just booked a trial class on your website. Name: ${name}, Centre: ${selectedCentre?.name.en}, Program: ${selectedProgram?.name.en}, Date: ${date}, Preference: ${timeOfDay}.`;
  const waLink = `https://wa.me/919876543210?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-bg-light min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Indicator */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold uppercase tracking-wider text-sm text-navy/50">Step {step} of 3</span>
              {step > 1 && (
                <button onClick={handleBack} className="flex items-center gap-1 font-bold uppercase tracking-wider text-sm text-navy hover:text-electric-blue transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  {t(pageData.common.back)}
                </button>
              )}
            </div>
            <div className="w-full h-1 bg-navy/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-shuttle-lime"
                initial={{ width: `${((step - 1) / 3) * 100}%` }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* Step 1 */}
            {step === 1 && (
              <FadeIn key="step1">
                <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-8 text-navy">
                  {t(pageData.step1.title)}
                </h1>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm text-navy/70 mb-4">{t(pageData.step1.centreLabel)}</h3>
                    <div className="space-y-3">
                      {centres.map(centre => (
                        <button
                          key={centre.id}
                          onClick={() => setCentreId(centre.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            centreId === centre.id 
                              ? 'border-electric-blue bg-electric-blue/5 hard-shadow scale-[1.02]' 
                              : 'border-navy/20 bg-white hover:border-navy/50'
                          }`}
                        >
                          <div className="font-heading font-black text-xl uppercase tracking-tight text-navy mb-1">{t(centre.name)}</div>
                          <div className="font-medium text-navy/60 text-sm flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {t(centre.city)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm text-navy/70 mb-4">{t(pageData.step1.programLabel)}</h3>
                    <div className="space-y-3">
                      {programs.map(prog => (
                        <button
                          key={prog.id}
                          onClick={() => setProgramId(prog.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            programId === prog.id 
                              ? 'border-electric-blue bg-electric-blue/5 hard-shadow scale-[1.02]' 
                              : 'border-navy/20 bg-white hover:border-navy/50'
                          }`}
                        >
                          <div className="font-heading font-black text-xl uppercase tracking-tight text-navy mb-1">{t(prog.name)}</div>
                          <div className="font-medium text-navy/60 text-sm">{t(prog.ageRange)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!canContinueStep1}
                    className={`font-bold py-4 px-8 rounded-lg uppercase tracking-widest transition-all ${
                      canContinueStep1 
                        ? 'bg-shuttle-lime text-navy border-2 border-navy hard-shadow hover-lift cursor-pointer' 
                        : 'bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {t(pageData.common.continue)}
                  </button>
                </div>
              </FadeIn>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <FadeIn key="step2">
                <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-8 text-navy">
                  {t(pageData.step2.title)}
                </h1>
                
                <div className="bg-white p-8 rounded-xl border-2 border-navy hard-shadow mb-8">
                  <div className="space-y-8">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-sm text-navy/70 mb-4">{t(pageData.step2.dateLabel)}</label>
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full md:w-1/2 bg-bg-light border border-navy rounded-lg p-4 font-bold text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" 
                      />
                    </div>
                    
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-sm text-navy/70 mb-4">{t(pageData.step2.timeLabel)}</label>
                      <div className="flex flex-wrap gap-3">
                        {['morning', 'afternoon', 'evening'].map(time => (
                          <button
                            key={time}
                            onClick={() => setTimeOfDay(time)}
                            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm border-2 transition-all ${
                              timeOfDay === time
                                ? 'bg-shuttle-lime border-navy text-navy hard-shadow scale-105'
                                : 'bg-bg-light border-navy/20 text-navy/70 hover:border-navy'
                            }`}
                          >
                            {t(pageData.step2.times[time as keyof typeof pageData.step2.times])}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-lg">
                    <p className="font-medium text-electric-blue text-sm">
                      {t(pageData.step2.note)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!canContinueStep2}
                    className={`font-bold py-4 px-8 rounded-lg uppercase tracking-widest transition-all ${
                      canContinueStep2
                        ? 'bg-shuttle-lime text-navy border-2 border-navy hard-shadow hover-lift cursor-pointer' 
                        : 'bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {t(pageData.common.continue)}
                  </button>
                </div>
              </FadeIn>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <FadeIn key="step3">
                <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-8 text-navy">
                  {t(pageData.step3.title)}
                </h1>
                
                <div className="bg-white p-8 rounded-xl border-2 border-navy hard-shadow mb-8">
                  <form id="trial-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.step3.name)} *</label>
                      <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" 
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.step3.phone)} *</label>
                        <input 
                          required 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.step3.email)}</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" 
                        />
                      </div>
                    </div>

                    {!isAdultProgram && (
                      <div className="space-y-2">
                        <label className="font-bold uppercase tracking-wider text-sm text-navy/80">{t(pageData.step3.age)} *</label>
                        <input 
                          required 
                          type="number" 
                          min="5" 
                          max="99"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full md:w-1/2 bg-bg-light border border-navy rounded-lg p-4 font-medium text-navy focus:outline-none focus:border-2 focus:border-electric-blue transition-colors" 
                        />
                      </div>
                    )}
                  </form>
                  
                  <div className="mt-8 p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-lg">
                    <p className="font-bold text-navy text-sm">
                      {t(pageData.step3.note)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    form="trial-form"
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full md:w-auto font-bold py-4 px-10 rounded-lg uppercase tracking-widest transition-all ${
                      canSubmit
                        ? 'bg-shuttle-lime text-navy border-2 border-navy hard-shadow hover-lift cursor-pointer' 
                        : 'bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {t(pageData.step3.submit)}
                  </button>
                </div>
              </FadeIn>
            )}

            {/* Success */}
            {step === 4 && (
              <FadeIn key="success">
                <div className="bg-electric-blue text-white p-8 md:p-12 rounded-2xl border-2 border-navy hard-shadow text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="inline-block bg-shuttle-lime p-4 rounded-full border-4 border-navy mb-8"
                  >
                    <CheckCircle2 className="w-12 h-12 text-navy" />
                  </motion.div>
                  
                  <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-10 text-white">
                    {t(pageData.success.title)}
                  </h1>
                  
                  <div className="bg-white text-navy p-6 md:p-8 rounded-xl border-2 border-navy text-left mb-10 shadow-[8px_8px_0px_0px_rgba(10,36,99,1)]">
                    <div className="grid sm:grid-cols-2 gap-6 mb-6 pb-6 border-b-2 border-bg-light">
                      <div>
                        <div className="font-bold uppercase tracking-wider text-xs text-navy/50 mb-1">Centre</div>
                        <div className="font-heading font-black text-xl uppercase tracking-tight">{t(selectedCentre?.name || { en: '', mr: '' })}</div>
                        <div className="text-sm font-medium">{t(selectedCentre?.address || { en: '', mr: '' })}</div>
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-wider text-xs text-navy/50 mb-1">Program</div>
                        <div className="font-heading font-black text-xl uppercase tracking-tight">{t(selectedProgram?.name || { en: '', mr: '' })}</div>
                        <div className="text-sm font-medium">{t(selectedProgram?.ageRange || { en: '', mr: '' })}</div>
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-wider text-xs text-navy/50 mb-1">Date & Time</div>
                        <div className="font-bold text-lg">{date}</div>
                        <div className="text-sm font-medium capitalize">{timeOfDay}</div>
                      </div>
                    </div>
                    
                    <div className="bg-shuttle-lime/20 p-4 rounded-lg border border-shuttle-lime/50">
                      <p className="font-bold text-sm">
                        {t(pageData.success.bring)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={generateICS}
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold py-4 px-6 rounded-lg border-2 border-white hover:bg-white/10 uppercase tracking-widest transition-colors"
                    >
                      <CalendarPlus className="w-5 h-5" />
                      {t(pageData.success.calendarBtn)}
                    </button>
                    <a 
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-shuttle-lime text-navy font-bold py-4 px-6 rounded-lg border-2 border-navy hover:scale-105 uppercase tracking-widest transition-transform shadow-[4px_4px_0px_0px_rgba(10,36,99,1)]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {t(pageData.success.whatsappBtn)}
                    </a>
                  </div>
                </div>
              </FadeIn>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
