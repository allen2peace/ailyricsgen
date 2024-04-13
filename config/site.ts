import { SiteConfig } from "@/types/siteConfig"

const baseSiteConfig = {
  name: "AI Rap Song Lyrics",
  description:
    "Generate Rap Song Lyrics in Seconds",
  url: "",
  ogImage: "",
  metadataBase: new URL("https://www.smartexcel.cc"),
  keywords: ["rap lyrics generator", "online rap lyrics generator", "chicago freestyle lyrics", "rap battle lyrics", "rap battle lyrics", "rap songs motivational"],
  authors: [
    {
      name: "",
      url: "",
    }
  ],
  creator: 'AI Rap Lyrics Generator',
  themeColor: '#fff',
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  links: {
    twitter: "",
    github: "",
  },
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
