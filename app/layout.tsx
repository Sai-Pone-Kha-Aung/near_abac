import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ViewTransitions } from "next-view-transitions";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
          <head>
            {/* Preload critical resources */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            {/* Prevent layout shift from external scripts */}
            <style dangerouslySetInnerHTML={{
              __html: `
                                body { 
                                    font-family: var(--font-body), system-ui, Arial, sans-serif;
                                    visibility: hidden;
                                }
                                .fonts-loaded body { 
                                    visibility: visible; 
                                }
                            `
            }} />
          </head>
          <body className={cn(
            'antialiased min-h-screen flex flex-col',
            inter.variable
          )}>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            {/* Font loading optimization */}
            <script dangerouslySetInnerHTML={{
              __html: `
                                document.fonts.ready.then(() => {
                                    document.documentElement.classList.add('fonts-loaded');
                                });
                            `
            }} />
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}