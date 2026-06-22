import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "study old ads";
const SITE_DESCRIPTION =
  "A curated research gallery of vintage vertical print advertisements — fact-checked notes on the brands, campaigns, and copywriting behind classic ads.";

export const metadata: Metadata = {
  metadataBase: new URL("https://studyoldads.com"),
  title: {
    default: "study old ads — a vintage print advertising archive",
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "vintage print ads",
    "old advertisements",
    "classic advertising",
    "print ad archive",
    "retro ads",
    "advertising history",
    "vintage magazine ads",
    "ad copywriting",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "study old ads — a vintage print advertising archive",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "study old ads — a vintage print advertising archive",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
