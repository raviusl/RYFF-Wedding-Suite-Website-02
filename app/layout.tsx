import type { Metadata, Viewport } from "next";

import { fontSans, fontScript, fontSerif } from "@/app/fonts";
import { site } from "@/content/site";
import { wedding } from "@/content/wedding";

import "./globals.css";

const title = `${wedding.groom} & ${wedding.bride}`;
const description = `${title} · ${wedding.weddingDate} · ${wedding.venue}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_MY",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${title} Wedding Dinner`,
    startDate: wedding.countdownAt,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: wedding.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: wedding.venueAddress,
        addressLocality: wedding.city,
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.company,
    },
  };

  return (
    <html
      lang="en"
      className={`${fontSerif.variable} ${fontScript.variable} ${fontSans.variable}`}
    >
      <body className="bg-bg font-sans text-ivory antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-wine focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
