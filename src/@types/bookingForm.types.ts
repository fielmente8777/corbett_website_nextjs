// types/bookingForm.types.ts
export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  program?: string;
  guests: string;
  healthIssue: string;
  extraInfo: string;
  villa?: string; 
  time: string;
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  program?: string;
  guests?: string;
  healthIssue?: string;
  extraInfo?: string;
  villa?: string;
  time?: string;
}

export interface UseBookingFormProps {
  createdFrom: string;
  includeProgram?: boolean;
  includeVilla?: boolean; 
  onSubmitSuccess?: () => void;
}