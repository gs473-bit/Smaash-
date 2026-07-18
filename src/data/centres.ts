import { Centre } from './types';

export const centres: Centre[] = [
  {
    id: "pune-kalyani-nagar",
    name: { en: "Kalyani Nagar Arena", mr: "कल्याणी नगर अरेना" },
    city: { en: "Pune", mr: "पुणे" },
    address: { en: "15, Central Avenue, Kalyani Nagar", mr: "१५, सेंट्रल एव्हेन्यू, कल्याणी नगर" },
    courts: 8,
    coaches: 6,
    hours: { en: "6:00 AM - 10:00 PM", mr: "सकाळी ६:०० - रात्री १०:००" },
    facilities: [
      { en: "Synthetic Mats", mr: "सिंथेटिक मॅट्स" },
      { en: "Locker Rooms", mr: "लॉकर रूम्स" },
      { en: "Cafe", mr: "कॅफे" }
    ],
    hasProShop: true,
    lat: 18.5484,
    lng: 73.9038
  },
  {
    id: "mumbai-bandra",
    name: { en: "Bandra West Pro Centre", mr: "वांद्रे पश्चिम प्रो सेंटर" },
    city: { en: "Mumbai", mr: "मुंबई" },
    address: { en: "Linking Road, Bandra West", mr: "लिंकिंग रोड, वांद्रे पश्चिम" },
    courts: 6,
    coaches: 5,
    hours: { en: "5:30 AM - 11:00 PM", mr: "पहाटे ५:३0 - रात्री ११:००" },
    facilities: [
      { en: "Synthetic Mats", mr: "सिंथेटिक मॅट्स" },
      { en: "AC Lounge", mr: "एसी लाउंज" }
    ],
    hasProShop: false,
    lat: 19.0596,
    lng: 72.8295
  },
  {
    id: "nashik-gangapur",
    name: { en: "Gangapur Road Hub", mr: "गंगापूर रोड हब" },
    city: { en: "Nashik", mr: "नाशिक" },
    address: { en: "Near Navshya Ganpati, Gangapur Road", mr: "नवश्या गणपती जवळ, गंगापूर रोड" },
    courts: 10,
    coaches: 4,
    hours: { en: "6:00 AM - 9:30 PM", mr: "सकाळी ६:०० - रात्री ९:३०" },
    facilities: [
      { en: "Wooden Courts", mr: "लाकडी कोर्ट्स" },
      { en: "Gymnasium", mr: "व्यायामशाळा" }
    ],
    hasProShop: true,
    lat: 20.0075,
    lng: 73.7629
  },
  {
    id: "nagpur-dharampeth",
    name: { en: "Dharampeth Elite", mr: "धरमपेठ एलिट" },
    city: { en: "Nagpur", mr: "नागपूर" },
    address: { en: "WHC Road, Dharampeth", mr: "डब्ल्यूएचसी रोड, धरमपेठ" },
    courts: 5,
    coaches: 3,
    hours: { en: "6:00 AM - 10:00 PM", mr: "सकाळी ६:०० - रात्री १०:००" },
    facilities: [
      { en: "Synthetic Mats", mr: "सिंथेटिक मॅट्स" }
    ],
    hasProShop: false,
    lat: 21.1378,
    lng: 79.0620
  }
];
