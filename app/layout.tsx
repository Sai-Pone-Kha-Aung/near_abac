import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { QueryProvider } from "@/components/Provider/QueryProvider";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  ssr: false,
})
const Navbar = dynamic(() => import('@/components/Navbar/Navbar'), {
  ssr: false,
})

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
            'antialiased min-h-screen flex flex-col',
            inter.variable
          )}>
            <QueryProvider>
              <Navbar />
              {children}
              <Footer />
            </QueryProvider>
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}