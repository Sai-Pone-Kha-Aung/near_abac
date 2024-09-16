import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "NEAR ABAC",
  description: "Explore near Assumption University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}>
            <Navbar/>
            {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
