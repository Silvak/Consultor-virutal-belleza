"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
//cn components
import { Toaster } from "@/components/ui/toaster";

//themes
import { ThemeProvider } from "@/components/CustomThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="Light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {/* Page Content */}
          <div className="flex justify-center w-full  mt-[56px]">
            <article className="max-w-[1200px] mx-auto py-8 border-x border-gray-100 overflow-hidden">
              {children}
            </article>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
