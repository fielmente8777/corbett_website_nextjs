import type { Metadata } from "next";
import { Aboreto, Montserrat } from "next/font/google";
import "./globals.css";
import "./styles.scss";
import "./editorial.css";
import { pageMetadata, hotelSchema, jsonLd } from "@/lib/seo";
import ContactAnalytics from "@/components/Enquiry/ContactAnalytics";
import { WebProvider } from "@/context-api/WebContext";
import { Footer } from "@/components/footers";
import NavBar from "@/components/navbar/NavBar";
import Script from "next/script";
import Call from "@/components/ContactButton/Call";
import Whatsapp from "@/components/ContactButton/WhatsApp";

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
  ...pageMetadata("Resort in Jim Corbett, Ramnagar | Corbett The Grand", "Discover Corbett The Grand in Ramnagar, with rooms and cottages, resort experiences and destination wedding venues. Enquire about your stay or celebration.", "/"),
  metadataBase: new URL("https://corbettthegrand.com"),
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
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
      <head>
        <Script
          id="google-analytics-loader"
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N9SG9JCZ0C"
        ></Script>
        <Script id="google-tag-manager-script" strategy="afterInteractive">
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-N9SG9JCZ0C');`}
        </Script>

        {/* <!-- Google Tag Manager --> */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KM848WKK');
          `,
          }}
        />
        {/* <!-- End Google Tag Manager - - > */}
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(hotelSchema) }} />
        <ContactAnalytics />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KM848WKK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) - - >  */}
        <WebProvider>
          <NavBar />
          {children}

          <Footer />
          <Call />
          <Whatsapp />
        </WebProvider>
        {/* <!-- Eazbot Script (Next.js) --> */}
        <Script id="chatbot-config" strategy="afterInteractive">
          {`
          window.eazbotConfig = {
            ndid: "a012ef6d-452e-4512-a3f1-ceb87f356bba",
            hid: "26723586",
          };
        `}
        </Script>
        <Script
          src="https://cb-script.dyq28lyxrazm2.amplifyapp.com/widget/lead-chatbot.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
