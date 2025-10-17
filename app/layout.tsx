import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better Things Design | Christian Design Studio | Book Covers, Event Flyers & Sermon Graphics",
  description: "Professional Christian design studio specializing in book cover design, event flyers, and sermon graphics. Creating impactful visual communications for churches, ministries, and Christian publishers.",
  keywords: "Christian design studio, book cover design, church design, sermon graphics, event flyers, ministry design, religious book covers, Christian graphic design",
  authors: [{ name: "Neil McArdle", url: "https://neilmcardle.com" }],
  creator: "Neil McArdle",
  publisher: "Better Things Design",
  robots: "index, follow",
  openGraph: {
    title: "Better Things Design | Christian Design Studio",
    description: "Professional Christian design studio creating impactful book covers, event flyers, and sermon graphics for churches and ministries.",
    url: "https://betterthings.design",
    siteName: "Better Things Design",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // You'll want to create this
        width: 1200,
        height: 630,
        alt: "Better Things Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Things Design | Christian Design Studio",
    description: "Professional Christian design studio creating impactful visual communications for churches and ministries.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}