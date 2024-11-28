import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
  weight: ["400", "700"],
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
      className={`${playfair_display.variable} ${lato.variable} h-full scroll-smooth`}
    >
      <body className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="w-full flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
