import { ClinicType } from '../data/mockData';

export interface ClinicTheme {
  primaryBg: string;
  primaryHoverBg: string;
  primaryText: string;
  primaryBorder: string;
  softBg: string;
  softBorder: string;
  gradientFrom: string;
  gradientTo: string;
  outerBg: string;
  badgeBg: string;
  badgeText: string;
}

export const CLINIC_THEMES: Record<ClinicType, ClinicTheme> = {
  kecantikan: {
    primaryBg: 'bg-pink-600',
    primaryHoverBg: 'hover:bg-pink-700',
    primaryText: 'text-pink-600',
    primaryBorder: 'border-pink-600',
    softBg: 'bg-pink-50',
    softBorder: 'border-pink-200',
    gradientFrom: 'from-pink-600',
    gradientTo: 'to-fuchsia-700',
    outerBg: 'bg-pink-50/70',
    badgeBg: 'bg-pink-50',
    badgeText: 'text-pink-700',
  },
  mata_gigi: {
    primaryBg: 'bg-blue-600',
    primaryHoverBg: 'hover:bg-blue-700',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600',
    softBg: 'bg-blue-50',
    softBorder: 'border-blue-200',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-700',
    outerBg: 'bg-blue-50/70',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
  },
  lab: {
    primaryBg: 'bg-[#059669]',
    primaryHoverBg: 'hover:bg-[#047857]',
    primaryText: 'text-[#059669]',
    primaryBorder: 'border-[#059669]',
    softBg: 'bg-[#ECFDF5]',
    softBorder: 'border-[#D1FAE5]',
    gradientFrom: 'from-[#059669]',
    gradientTo: 'to-[#047857]',
    outerBg: 'bg-[#E9F2EE]',
    badgeBg: 'bg-[#ECFDF5]',
    badgeText: 'text-[#047857]',
  },
};

export function getClinicTheme(clinicType: ClinicType): ClinicTheme {
  return CLINIC_THEMES[clinicType];
}
