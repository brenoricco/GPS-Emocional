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
    "Um GPS pra suas emoções. Localize onde você está, descubra pra onde quer ir, e siga uma rota cuidada — desenvolvida por psicólogo.",
  applicationName: "GPS Emocional",
  authors: [{ name: "Brenno Ricco" }],
  keywords: [
    "saúde mental",
    "ansiedade",
    "autoestima",
    "luto",
    "relacionamento tóxico",
    "traição",
    "timidez",
    "TCC",
    "ACT",
  ],
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
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
  themeColor: "#F4F8FA",
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <RegistradorServiceWorker />
        <BannerInstalar />
      </body>
    </html>
  );
}
