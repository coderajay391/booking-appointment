export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  price: number;
  image: string;
  iconName: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingState {
  step: number;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  userDetails: UserDetails;
}
