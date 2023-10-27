"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navigation/Navbar";

//themes
import { ThemeProvider } from "@/components/CustomThemeProvider";
import "./globals.css";
import Providers from "@/app/providers";
import { getServerSession } from "next-auth";
import Navbar from "@/components/navigation/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const metadata = {
  title: "Consultor belleza virtual",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Navbar />
            <div className="flex justify-center w-full mt-[56px]">
              <article className="max-w-[1200px] w-full mx-auto px-4 border-x overflow-hidden ">
                {children}
              </article>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
