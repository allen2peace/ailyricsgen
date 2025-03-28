import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import { NextAuthProvider } from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { UserInfo } from "@/types/user";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "@/navigation";
import { notFound } from "next/navigation";
import local from "next/font/local";

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};

interface Props {
  locale: never;
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  // const user = (await getCurrentUser()) as UserInfo;

  const { locale, children } = props;
  // console.log(`RootLayout locale==${local} locales==${locales}`);
  // if (!locales.includes(locale)) {
  //   notFound();
  // }
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9625126052904435"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextAuthProvider>
              <Header />
              <div className="max-full mx-auto flex min-h-screen flex-col justify-center py-0">
                <main className="mt-20 flex flex-1 justify-center">
                  {children}
                </main>
                <Footer />
              </div>
            </NextAuthProvider>
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
          {/* {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
            <BaiDuAnalytics />
          </>
        )} */}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
