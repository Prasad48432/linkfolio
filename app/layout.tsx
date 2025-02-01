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
      <head>
        <script
          defer
          data-website-id="679db6c24f53ae869404f8ba"
          data-domain="linkfolio-dev.vercel.app"
          src="https://datafa.st/js/script.js"
        ></script>
      </head>
      <body className={`${bricolage.variable} ${rubik.variable} antialiased`}>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
