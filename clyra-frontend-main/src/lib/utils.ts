import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M+';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K+';
  }
  return num.toString();
}

export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

export const medicalColors = {
  primary: '#2563EB',
  trustSlate: '#64748B',
  calmingBg: '#F1F5F9',
  successAccent: '#10B981',
  criticalInfo: '#DC2626',
  pureWhite: '#ffffff',
  softGray: '#F3F4F6',
} as const;