import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { twMerge } from "tailwind-merge";
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
  title: "csgo-stats",
  description: "Statistics for a pre-recorded CS:GO match between NaVi and Vitality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(geistSans.variable, geistMono.variable, "antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
