import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      {/* Nav user */}
      <Navbar />

      {/* Page Content */}
      <div className="mt-[56px] min-h-[70vh]">{children}</div>
      {/* footer */}
      <Footer />
    </>
  );
}
