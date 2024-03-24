import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const runtime = 'edge';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "筑波大学医学水泳部HP",
  description: "筑波大学医学水泳部のホームページです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
