import type { Metadata } from "next";
import { Playfair, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Wendi's Worminghall Whimsies",
  description: "Sharing my thoughts and experiences with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${playfair_display.variable}`}
    >
      <body className="flex flex-col items-center justify-center m min-h-screen bg-primary mobile:mx-2 mobile:mt-4 md:mx-8 md:mt-8">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
