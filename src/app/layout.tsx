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
  metadataBase: new URL("https://sgcc-songs.netlify.app"),
  title: {
    default: "SGCC Collection of Songs",
    template: "%s | SGCC Collection of Songs",
  },
  description:
    "A collection of hymns from Sovereign Grace Community Church, Abuja.",
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
        url: "/cover.jpeg",
        width: 500,
        height: 500,
      },
    ],
  },
  keywords: [
    "hymns",
    "songs",
    "worship",
    "SGCC",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
