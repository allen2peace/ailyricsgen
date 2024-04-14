import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import {
  CN,
  DE,
  ES,
  FR,
  FlagComponent,
  IN,
  IT,
  JP,
  KR,
  PT,
  PY,
  US,
  VI,
} from 'country-flag-icons/react/3x2';

export const countryList: FlagComponent[] = [
  US,
  ES,
  FR,
  DE,
  IT,
  PT,
  PY,
  IN,
  VI,
  KR,
  JP,
  CN,
];

export const locales = [
  'en',
  'es',
  'zh',
  'fr',
  'ru',
  'pt',
  'de',
  'ja',
  'ko',
  'it',
  'hi',
  'vi',
];
export const localePrefix = 'as-needed';
export const defaultLocale = 'en';
export const localeItems = [
  { name: 'English', code: 'en', iso: 'en-US', dir: 'ltr', flag: 0 },
  { name: 'Español', code: 'es', iso: 'es-ES', dir: 'ltr', flag: 1 },
  { name: 'Français', code: 'fr', iso: 'fr-FR', dir: 'ltr', flag: 2 },
  { name: 'Deutsch', code: 'de', iso: 'de-DE', dir: 'ltr', flag: 3 },
  { name: 'Italiano', code: 'it', iso: 'it-IT', dir: 'ltr', flag: 4 },
  { name: 'Português', code: 'pt', iso: 'pt-PT', dir: 'ltr', flag: 5 },
  { name: 'Pусский', code: 'ru', iso: 'ru-RU', dir: 'ltr', flag: 6 },
  { name: 'हिन्दी', code: 'hi', iso: 'hi-IN', dir: 'ltr', flag: 7 },
  { name: 'Tiếng Việ', code: 'vi', iso: 'vi-VN', dir: 'ltr', flag: 8 },
  { name: '한국어', code: 'ko', iso: 'ko-KR', dir: 'ltr', flag: 9 },
  { name: '日本語', code: 'ja', iso: 'ja-JP', dir: 'ltr', flag: 10 },
  {
    name: '中文(简体)',
    code: 'zh',
    iso: 'zh',
    dir: 'ltr',
    flag: 11,
  },
];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
