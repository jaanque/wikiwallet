import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WikiWallet | El mapa de tus inversiones tecnológicas",
    template: "%s | WikiWallet"
  },
  description: "Descubre el ecosistema industrial real tras tus productos favoritos. Mapea proveedores, componentes y empresas clave en Tesla, Apple, Sony y más.",
  keywords: ["WikiWallet", "inversión", "tecnología", "ecosistema", "acciones", "TSMC", "Tesla", "Apple", "cadena de suministro", "invertir"],
  authors: [{ name: "WikiWallet Team" }],
  metadataBase: new URL("https://wikiwallet.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "WikiWallet | Mapea tus inversiones",
    description: "Visualiza las empresas que hacen posible la tecnología que amas.",
    url: "https://wikiwallet.com",
    siteName: "WikiWallet",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "WikiWallet Hero"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "WikiWallet | Mapea tus inversiones",
    description: "Visualiza las empresas que hacen posible la tecnología que amas.",
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200"],
    creator: "@wikiwallet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
