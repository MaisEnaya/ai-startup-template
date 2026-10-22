import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const arabicFont = localFont({
  src: "../../node_modules/@fontsource-variable/noto-sans-arabic/files/noto-sans-arabic-arabic-wght-normal.woff2",
  variable: "--font-noto-arabic",
  display: "swap",
  weight: "100 900",
  preload: false,
});

export const metadata: Metadata = {
  title: "AI Startup Template | BeGeniusTech",
  description:
    "Saudi-born engineering for digital products, cloud, cyber defense, and governed AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={arabicFont.variable}>{children}</body>
    </html>
  );
}
