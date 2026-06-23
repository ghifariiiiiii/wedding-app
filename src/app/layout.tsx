import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Wedding of Olivia & Ralph | 18 May 2027",
  description: "You are cordially invited to celebrate the union of Olivia Margaretta & Ralph Alexander. Sunday, 18 May 2027.",
  openGraph: {
    title: "The Wedding of Olivia & Ralph",
    description: "You are cordially invited to celebrate the union of Olivia Margaretta & Ralph Alexander.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="font-poppins text-gray-800 bg-[#F5F8FF] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
