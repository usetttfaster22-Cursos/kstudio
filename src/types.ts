export interface Project {
  id: string;
  title: string;
  category: 'Residencial' | 'Hotelería' | 'Público';
  image: string;
  description: string;
}

export interface ValueItem {
  iconName: string;
  name: string;
  description: string;
}

export interface StepItem {
  number: string;
  name: string;
  description: string;
}

export interface Designer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  designerId: string;
  projectType: string;
  notes?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
  date: string;
}
