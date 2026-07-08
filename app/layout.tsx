import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

/* ============================================================
   Typography — Editorial Premium
   Playfair Display: headlines bold, editorial, modern serif
   Inter: body text, ultra-clean, highly legible on mobile
   ============================================================ */

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vita Studio · Estética & Spa | Maracaibo",
  description:
    "Estética avanzada, masajes terapéuticos, bioestimuladores, bótox y depilación láser en Maracaibo, Venezuela.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vita Studio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#c2b280",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      className={`${playfair.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('clinic-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-charcoal antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
