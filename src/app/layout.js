import { Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const metadata = {
  title: "Consultor belleza virtual",
  description: "",
};

export default function RootLayout({ children}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex justify-center w-full  mt-[56px]">
          <article className="max-w-[1200px] mx-auto px-4 border-x overflow-hidden">
            {children}
          </article>
        </div>
      </body>
    </html>
  );
}
