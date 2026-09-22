import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clyra - AI Medical Consultation Powered by SEAL Technology",
  description: "Get a trusted second opinion from AI medical specialists who collaborate like real doctors. Powered by SEAL technology, Clyra provides transparent, accurate, and anxiety-reducing healthcare guidance.",
  keywords: ["AI medical consultation", "virtual second opinion", "healthcare AI", "medical diagnosis", "telemedicine", "HIPAA compliant", "medical specialists", "SEAL technology"],
  authors: [{ name: "Clyra Healthcare" }],
  creator: "Clyra Healthcare",
  publisher: "Clyra Healthcare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clyra.health"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clyra.health",
    title: "Clyra - Trusted AI Medical Consultation Powered by SEAL",
    description: "Multiple AI specialists collaborate on your health concerns, providing trusted second opinions and anxiety-reducing healthcare guidance. Powered by SEAL technology.",
    siteName: "Clyra",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Clyra - AI Medical Consultation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clyra - AI Medical Consultation Powered by SEAL Technology",
    description: "Get trusted second opinions from AI medical specialists who collaborate like real doctors. Powered by SEAL technology.",
    images: ["/twitter-image.png"],
    creator: "@clyrahealth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Healthcare-specific meta tags */}
        <meta name="theme-color" content="#2563EB" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Clyra" />
        
        {/* Privacy and medical compliance */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Structured data for healthcare */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Clyra - AI Medical Consultation",
              "description": "AI medical consultation platform with multiple specialist collaboration",
              "url": "https://clyra.health",
              "mainEntity": {
                "@type": "MedicalOrganization",
                "name": "Clyra Healthcare",
                "description": "AI-powered medical consultation platform",
                "url": "https://clyra.health",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "availableLanguage": ["English"]
                }
              },
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Patients seeking medical consultation"
              },
              "medicalAudience": {
                "@type": "MedicalAudience",
                "audienceType": "Patient"
              }
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${pressStart2P.variable} font-sans antialiased min-h-screen bg-white text-foreground`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-medical-blue focus:text-white focus:rounded-md focus:text-sm"
        >
          Skip to main content
        </a>
        
        {/* Live region for screen reader announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="sr-announcements"
        />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
