import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from '@/navigation';
export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: false,
});

export const config = {
  // Skip all paths that should not be internationalized.
  // This skips the folders "api", "_next" and all files
  // with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
