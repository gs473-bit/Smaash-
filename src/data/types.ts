export interface LocalizedString {
  en: string;
  mr: string;
}

export interface Centre {
  id: string;
  name: LocalizedString;
  city: LocalizedString;
  address: LocalizedString;
  courts: number;
  coaches: number;
  hours: LocalizedString;
  facilities: LocalizedString[];
  hasProShop: boolean;
  lat: number;
  lng: number;
}

export interface Program {
  id: string;
  name: LocalizedString;
  category: 'Beginners' | 'Intermediate' | 'High-Performance' | 'Adults';
  ageRange: LocalizedString;
  level: LocalizedString[];
  description: LocalizedString;
  schedule: LocalizedString;
  batchSize: LocalizedString;
  image: string;
}

export interface Coach {
  id: string;
  name: LocalizedString;
  photo: string;
  credentials: LocalizedString;
  specialization: LocalizedString;
  bio: LocalizedString;
  isHeadCoach?: boolean;
}

export interface Achievement {
  id: string;
  studentName: LocalizedString;
  result: LocalizedString;
  tournament: LocalizedString;
  badgeType: 'Gold' | 'Silver' | 'Bronze' | 'Special';
  photo: string;
  ageGroup: string;
  level: string;
}

export interface Testimonial {
  id: string;
  quote: LocalizedString;
  name: LocalizedString;
  role: LocalizedString;
  avatar: string;
}
