import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import GlobalEffects from "@/components/GlobalEffects";
import AmbientMusic from "@/components/AmbientMusic";
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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lorena Sofía — El Cuento Comienza | 27.06.26",
  description:
    "Un cuento mágico para celebrar el cumpleaños de Lorena Sofía. 27 de junio de 2026, Barcelona. Comienza una nueva era.",
  openGraph: {
    title: "Lorena Sofía — Save the Date | 27.06.26",
    description:
      "Comienza una nueva era. Un día para celebrar todo lo vivido, todo lo que somos y todo lo que está por venir.",
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
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-cream text-warm-dark antialiased">
        <LanguageProvider>
          <GlobalEffects />
          {children}
          <AmbientMusic />
        </LanguageProvider>
      </body>
    </html>
  );
}
