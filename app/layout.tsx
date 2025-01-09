import type { Metadata } from "next";
import { Bricolage_Grotesque, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkfolio",
  description: "Your portfolio on web light and powerful",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${rubik.variable} antialiased`}>
        <Toaster  richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
