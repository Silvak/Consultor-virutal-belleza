import Navbar from "@/components/navigation/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      {/* Nav user */}
      <Navbar />

      {/* Page Content */}
      <div className="mt-[56px]">{children}</div>
    </>
  );
}
