export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  verified: boolean;
}

export interface MedicalStatistic {
  label: string;
  value: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
}

export interface AICollaborationExample {
  symptom: string;
  specialists: string[];
  reasoning: string[];
  conclusion: string;
  confidence: number;
}