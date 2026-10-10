import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokémon Checklist - Rastreador de Capturas por Jogo",
  description:
    "Checklist interativo de Pokémon capturáveis por jogo (Gerações 1 a 9). Acompanhe seu progresso, alterne versões Shiny, filtre por tipo e exporte sua Pokédex para PDF.",
  keywords: [
    "pokemon",
    "checklist",
    "pokedex",
    "shiny",
    "tracker",
    "kanto",
    "johto",
    "hoenn",
    "sinnoh",
    "paldea",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='%23EE1515'/><path d='M2 12h20' stroke='%23222224' stroke-width='2'/><path d='M2 12a10 10 0 0 0 20 0' fill='%23F0F0F0'/><circle cx='12' cy='12' r='3' fill='%23F0F0F0' stroke='%23222224' stroke-width='2'/></svg>" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors`}>
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
