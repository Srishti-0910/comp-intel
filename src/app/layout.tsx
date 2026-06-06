import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CompIntel — Compensation Intelligence",
  description: "Real salary data from top tech companies in India",
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