import type { Metadata } from "next";
import { Public_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ien2RN | Connecting Internationally Educated Nurses to Canadian Healthcare Careers",
  description:
    "ien2RN is a premium healthcare recruitment company placing internationally educated nurses into meaningful careers across Canada. Find your next chapter in Canadian healthcare.",
  keywords: ["healthcare recruitment", "nurses Canada", "IEN", "internationally educated nurses", "nursing jobs Canada"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${publicSans.variable} ${poppins.variable} font-body antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
