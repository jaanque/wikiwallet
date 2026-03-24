import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WikiWallet | El mapa de tus inversiones tecnológicas",
  description: "Descubre el ecosistema industrial real tras tus productos favoritos. Mapea proveedores, componentes y empresas clave en Tesla, Apple, Sony y más.",
  keywords: ["WikiWallet", "inversión", "tecnología", "ecosistema", "acciones", "TSMC", "Tesla", "Apple", "cadena de suministro"],
  authors: [{ name: "WikiWallet Team" }],
  openGraph: {
    title: "WikiWallet | Mapea tus inversiones",
    description: "Visualiza las empresas que hacen posible la tecnología que amas.",
    url: "https://wikiwallet.com",
    siteName: "WikiWallet",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
