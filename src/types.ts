export interface SignupFormData {
  fullName?: string;
  contact: string; // WhatsApp or Email
  childAge?: string;
  childAges?: string[];
  numberOfChildren?: string;
  mainChallenge?: string;
  customChallenge?: string;
}

export interface SignupRecord extends SignupFormData {
  id: string;
  createdAt: string;
  spreadsheetUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  example: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string; // e.g., "أم لـ ٣ أطفال (الرياض)"
  comment: string;
  avatarText: string;
  highlight: string;
}
