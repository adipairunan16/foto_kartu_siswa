"use client";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm h-16 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Selamat datang di Foto Siswa AI,
          Kapan kalian Foto Berdua??wkwkwkwk
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          🟢 Google Drive Connected
        </div>

        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
          A
        </div>

      </div>

    </header>
  );
}