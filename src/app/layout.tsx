import type { Metadata } from "next";
import Script from "next/script";
import { Cardo } from "next/font/google";
import "./globals.css";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://songs.sgcc.ng"),
  title: {
    default: "SGCC Collection of Songs",
    template: "%s | SGCC Collection of Songs",
  },
  description:
    "A collection of songs from Sovereign Grace Community Church, Abuja.",
  applicationName: "SGCC Collection of Songs",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "SGCC Collection of Songs",
    statusBarStyle: "black-translucent",
  },
  icons: {
    shortcut: "/fav.svg",
    apple: [
      { url: "/fav.svg" },
      { url: "/pwa/ios/152.png", sizes: "152x152" },
      { url: "/pwa/ios/180.png", sizes: "180x180" },
      { url: "/pwa/ios/167.png", sizes: "167x167" },
    ],
    other: {
      rel: "mask-icon",
      url: "/fav.svg",
      color: "#722b41",
    },
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sgccabuja",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://songs.sgcc.ng",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "hymns",
    "songs",
    "worship",
    "SGCC",
    "SGCC Abuja",
    "Sovereign Grace Community Church",
    "Reformed Baptist Church",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cardo.className}>
        {children}

        {/* Google Analytics Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-QZZ04ZGDJ7`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QZZ04ZGDJ7');
          `}
        </Script>
      </body>
    </html>
  );
}
