import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FraudSense.ai | Fraud Analyst Dashboard",
  description:
    "A bank fraud analyst dashboard for current-day transaction risk review.",
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
