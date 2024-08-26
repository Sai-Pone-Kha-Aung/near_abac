import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
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
    <html lang="en">
      <body className={cn(
        'antialiased',
          fontHeading.variable,
          fontBody.variable
      )}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
        >
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
