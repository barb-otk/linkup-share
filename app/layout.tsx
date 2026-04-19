import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const buckinBlack = localFont({
  src: "../public/fonts/Buckin-Black Regular.otf",
  variable: "--font-buckin-black",
});

const volkswagenSerial = localFont({
  src: [
    { path: "../public/fonts/volkswagen_serial-light.otf",       weight: "300", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-lightitalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-regular.otf",     weight: "400", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-italic.otf",      weight: "400", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-medium.otf",      weight: "500", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-mediumitalic.otf",weight: "500", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-bold.otf",        weight: "700", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-bolditalic.otf",  weight: "700", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-xbold.otf",       weight: "800", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-xbolditalic.otf", weight: "800", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-black.otf",       weight: "900", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-blackitalic.otf", weight: "900", style: "italic" },
    { path: "../public/fonts/volkswagen_serial-heavy.otf",       weight: "950", style: "normal" },
    { path: "../public/fonts/volkswagen_serial-heavyitalic.otf", weight: "950", style: "italic" },
  ],
  variable: "--font-volkswagen",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linkupapp.io"),
  title: "Linkup",
  description: "Linkup is the app to meet new people through shared real life experiences happening near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${buckinBlack.variable} ${volkswagenSerial.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
