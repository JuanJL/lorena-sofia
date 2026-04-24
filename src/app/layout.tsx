import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import GlobalEffects from "@/components/GlobalEffects";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lorena Sofía — A New Era Begins | 27.06.26",
  description:
    "This is not just a birthday… it’s the beginning of something extraordinary. Tropical luxury meets festival energy. Barcelona, June 27, 2026.",
  openGraph: {
    title: "Lorena Sofía — A New Era Begins | 27.06.26",
    description:
      "This is not just a birthday… it’s the beginning of something extraordinary.",
    type: "website",
    images: [{ url: "/poster.jpg", width: 1075, height: 1418 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-cream text-warm-dark antialiased">
        <LanguageProvider>
          <GlobalEffects />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
