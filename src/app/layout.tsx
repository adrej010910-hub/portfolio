import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.ru"),
  title: {
    default: `${siteConfig.name} — Веб-разработка и дизайн карточек для маркетплейсов`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Создаю современные сайты, лендинги и продающие карточки товаров для Wildberries, Ozon и Яндекс Маркета. Premium дизайн, внимание к деталям, индивидуальный подход.",
  keywords: [
    "разработка сайтов",
    "лендинги",
    "дизайн карточек маркетплейсов",
    "карточки Wildberries",
    "карточки Ozon",
    "веб-дизайнер",
    "фрилансер",
    "продающий дизайн",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: `${siteConfig.name} — современные сайты и дизайн для маркетплейсов`,
    description: siteConfig.subheading,
    siteName: `${siteConfig.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — веб-разработка и дизайн`,
    description: siteConfig.subheading,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${manrope.variable} ${unbounded.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

