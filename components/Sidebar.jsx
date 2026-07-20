"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Dashboard",
      href: "/",
      icon: "🏠",
    },
    {
      title: "Ambil Foto",
      href: "/ambil-foto",
      icon: "📷",
    },
    {
      title: "Riwayat",
      href: "/riwayat",
      icon: "🕘",
    },
    {
      title: "Pengaturan",
      href: "/pengaturan",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-red-600 text-white flex flex-col">

      <div className="p-6 border-b border-red-500">
        <h1 className="text-2xl font-bold">
          Aplikasi PASANGANKU
        </h1>

        <p className="text-sm text-red-100 mt-1">
          Anda Harus Menginstal Aplikasi CINTAKU Terlebih Dahulu
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === menu.href
                ? "bg-white text-red-600 font-semibold"
                : "hover:bg-red-500"
            }`}
          >
            <span className="text-xl">
              {menu.icon}
            </span>

            {menu.title}
          </Link>

        ))}

      </nav>

      <div className="p-4 border-t border-red-500">

        <div className="bg-red-500 rounded-xl p-4">

          <p className="text-sm">
            Google Drive
          </p>

          <p className="font-bold">
            Connected ✅
          </p>

        </div>

      </div>

    </aside>
  );
}