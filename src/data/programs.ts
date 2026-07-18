import { Program } from './types';

export const programs: Program[] = [
  {
    id: "smash-kids-beginners",
    name: { en: "Smash Kids (Beginners)", mr: "स्मॅश किड्स (सुरुवात करणारे)" },
    category: "Beginners",
    ageRange: { en: "Ages 6-12", mr: "वय ६-१२" },
    level: [{ en: "Beginner", mr: "सुरुवात करणारे" }],
    description: { en: "Introduction to badminton. Focus on grip, basic footwork, hand-eye coordination, and having fun on the court.", mr: "बॅडमिंटनचा परिचय. ग्रिप, मूलभूत फूटवर्क, हात आणि डोळ्यांचा समन्वय आणि कोर्टवर मजा करण्यावर भर." },
    schedule: { en: "Mon, Wed, Fri - 4:00 PM to 5:30 PM", mr: "सोम, बुध, शुक्र - सायं ४:०० ते ५:३०" },
    batchSize: { en: "15 Students per batch", mr: "प्रति बॅच १५ विद्यार्थी" },
    image: "https://images.unsplash.com/photo-1595166297379-3c35b45070db?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "smash-juniors-intermediate",
    name: { en: "Smash Juniors", mr: "स्मॅश ज्युनियर्स" },
    category: "Intermediate",
    ageRange: { en: "Ages 10-15", mr: "वय १०-१५" },
    level: [{ en: "Intermediate", mr: "मध्यम" }],
    description: { en: "For players with basic skills. Focus on advanced strokes, match tactics, stamina building, and agility drills.", mr: "मूलभूत कौशल्ये असलेल्या खेळाडूंसाठी. प्रगत स्ट्रोक्स, मॅच डावपेच, स्टॅमिना वाढवणे आणि चपळाईच्या सरावावर भर." },
    schedule: { en: "Tue, Thu, Sat - 5:00 PM to 7:00 PM", mr: "मंगळ, गुरू, शनी - सायं ५:०० ते ७:००" },
    batchSize: { en: "12 Students per batch", mr: "प्रति बॅच १२ विद्यार्थी" },
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "elite-squad",
    name: { en: "Elite Squad", mr: "एलिट स्क्वॉड" },
    category: "High-Performance",
    ageRange: { en: "All Ages (By Invitation)", mr: "सर्व वयोगट (आमंत्रणाद्वारे)" },
    level: [{ en: "Pro", mr: "प्रो" }, { en: "Tournaments", mr: "स्पर्धा" }],
    description: { en: "High-performance coaching for tournament-level athletes. Intense physical conditioning and mental toughness.", mr: "स्पर्धेच्या स्तरावरील खेळाडूंसाठी उच्च-कामगिरीचे प्रशिक्षण. सखोल शारीरिक तंदुरुस्ती आणि मानसिक कणखरपणा." },
    schedule: { en: "Daily - 5:30 AM to 8:30 AM & 6:00 PM to 8:00 PM", mr: "दररोज - सकाळी ५:३० ते ८:३० आणि सायं ६:०० ते ८:००" },
    batchSize: { en: "8 Students per batch", mr: "प्रति बॅच ८ विद्यार्थी" },
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "adult-pro",
    name: { en: "Adult Pro", mr: "प्रौढ प्रो" },
    category: "Adults",
    ageRange: { en: "Ages 16+", mr: "वय १६+" },
    level: [{ en: "Intermediate", mr: "मध्यम" }, { en: "Advanced", mr: "प्रगत" }],
    description: { en: "Intense drill sessions and match play for adults who want to dominate local leagues or stay incredibly fit.", mr: "ज्या प्रौढांना स्थानिक लीगमध्ये वर्चस्व मिळवायचे आहे किंवा तंदुरुस्त राहायचे आहे त्यांच्यासाठी सखोल सराव सत्र आणि मॅच प्ले." },
    schedule: { en: "Tue, Thu, Sat - 7:00 PM to 9:00 PM", mr: "मंगळ, गुरू, शनी - सायं ७:०० ते ९:००" },
    batchSize: { en: "16 Players per batch", mr: "प्रति बॅच १६ खेळाडू" },
    image: "https://images.unsplash.com/photo-1611684347209-663f7d1d2518?q=80&w=1000&auto=format&fit=crop"
  }
];
