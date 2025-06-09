import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { QueryProvider } from "@/components/Provider/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'block', // Prevents FOIT (Flash of Invisible Text)
  variable: '--font-body',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif']
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
    <ClerkProvider>
      <ViewTransitions>
        <html lang="en" className={inter.variable}>
          <body className={cn(
            'antialiased hydration-stable',
            inter.variable
          )}>
            <QueryProvider>
              <Navbar />
              <main className="min-h-screen flex flex-col">
                {children}
              </main>
              <Footer />
            </QueryProvider>
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}