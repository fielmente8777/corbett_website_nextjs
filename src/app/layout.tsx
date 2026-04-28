import type { Metadata } from "next";
import { Aboreto, Montserrat } from "next/font/google";
import "./globals.css";
import "./styles.scss";
import { WebProvider } from "@/context-api/WebContext";
import { Footer } from "@/components/footers";
import NavBar from "@/components/navbar/NavBar";

const aboreto = Aboreto({
  variable: "--font-aboreto",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corbett The Grand",
  description: "Corbett The Grand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${aboreto.variable} ${montserrat.variable} scroll-smooth antialiased`}
      suppressHydrationWarning={true}
    >
      <body>
        <WebProvider>
          <NavBar />
          {children}

          <Footer />
        </WebProvider>
      </body>
    </html>
  );
}
