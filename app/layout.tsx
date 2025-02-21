import type { Metadata } from "next";
import { Bricolage_Grotesque, Rubik, Lexend } from "next/font/google";
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

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Linkfolio",
  description: "Your portfolio on web light and powerful",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicons/darkfav.ico',
        href: '/favicons/darkfav.ico',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicons/lightfav.ico',
        href: '/favicons/lightfav.ico',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light dark:dark" lang="en">
      <head>
      </head>
      <body className={`${bricolage.variable} ${rubik.variable} ${lexend.variable} antialiased lexend`}>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
