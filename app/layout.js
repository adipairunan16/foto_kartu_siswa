import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Foto Siswa AI",
  description: "Aplikasi Foto Siswa Background Merah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100">

        <div className="flex">

          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <div className="flex-1 flex flex-col">

            <Navbar />

            <main className="p-8">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}