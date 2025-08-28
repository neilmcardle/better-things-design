import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better Things",
  description: "I build ideas.",
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