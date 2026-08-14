import { Service } from './types';

export const services: Service[] = [
  {
    id: 'general-consultation',
    title: 'General Consultation',
    description: 'A 1-on-1 session with a physician to discuss your health needs and medical history.',
    duration: 30,
    price: 800,
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800',
    iconName: 'Stethoscope',
  },
  {
    id: 'specialist-visit',
    title: 'Specialist Visit',
    description: 'Detailed evaluation and treatment plan by a board-certified specialist.',
    duration: 45,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    iconName: 'HeartPulse',
  },
  {
    id: 'comprehensive-checkup',
    title: 'Comprehensive Checkup',
    description: 'Full-body health screening, including vitals, blood tests, and medical review.',
    duration: 60,
    price: 3500,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    iconName: 'Activity',
  },
  {
    id: 'telehealth-session',
    title: 'Telehealth Session',
    description: 'Virtual medical consultation from the comfort of your home.',
    duration: 20,
    price: 500,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    iconName: 'Laptop',
  }
];

export const availableTimes = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM'
];
