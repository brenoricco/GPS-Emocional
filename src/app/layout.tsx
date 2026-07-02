import type { Metadata, Viewport } from "next";

import { BannerInstalar } from "@/componentes/pwa/banner-instalar";
import { RegistradorServiceWorker } from "@/componentes/pwa/registrador-sw";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GPS Emocional",
    template: "%s · GPS Emocional",
  },
  description:
    "Um espaço seguro para respirar, se acolher e recalcular a rota. Técnicas de hipnoterapia guiadas por psicólogas para mulheres em momentos difíceis.",
  applicationName: "GPS Emocional",
  authors: [{ name: "Brenno Ricco" }],
  keywords: [
    "saúde mental",
    "ansiedade",
    "autoestima",
    "hipnoterapia",
    "acolhimento",
    "relacionamento tóxico",
    "depressão",
    "mulheres",
  ],
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GPS Emocional",
  },
  icons: {
    icon: [
      { url: "/icone-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icone-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icone-512.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B132B",
  viewportFit: "cover",
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="bg-noite text-bruma">
        {children}
        <RegistradorServiceWorker />
        <BannerInstalar />
      </body>
    </html>
  );
}
