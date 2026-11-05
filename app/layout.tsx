import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { personal, seo } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL("https://tanvirahmmed.codes"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    siteName: personal.name,
    images: [
      {
        url: "/tanvir-hero.jpg",
        width: 1024,
        height: 572,
        alt: "MD Tanvir Ahmmed - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/tanvir-hero.jpg"],
    creator: "@Tanviir_Ahmmed",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090B] text-[#F2F1ED] font-sans">
        {children}
      </body>
    </html>
  );
}
