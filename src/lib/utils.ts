import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInCents: number, locale: string = 'fr'): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceInCents / 100);
}

export function formatDate(date: Date | number, locale: string = 'fr'): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}
