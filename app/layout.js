import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Foto Siswa AI",
  description: "Aplikasi Foto Siswa AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}