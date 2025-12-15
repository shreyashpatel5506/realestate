import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
});

const inter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
})
export const metadata = {
  title: "Homely",
  description: "RealEstate Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} bg-white antialiased`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
