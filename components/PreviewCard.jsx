"use client";

import { useState } from "react";

export default function PreviewCard({
  student,
  setStudent,
}) {
  const [uploading, setUploading] = useState(false);

  async function savePhoto() {
    if (!student?.photo) {
      alert("Belum ada foto");
      return;
    }

    try {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      alert("✅ Foto berhasil disimpan ke Google Drive");

      // Kosongkan preview
      setStudent((prev) => ({
        ...prev,
        photo: "",
      }));

    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-6">
        🖼 Preview
      </h2>

      <div className="bg-red-600 rounded-2xl h-[450px] flex items-center justify-center overflow-hidden">

        {student?.photo ? (
          <img
            src={student.photo}
            alt="Preview"
            className="h-full object-contain"
          />
        ) : (
          <p className="text-white text-xl">
            Belum ada foto
          </p>
        )}

      </div>

      <div className="mt-6 space-y-2">

        <p><b>Nama :</b> {student?.nama || "-"}</p>

        <p><b>NIS :</b> {student?.nis || "-"}</p>

        <p><b>Kelas :</b> {student?.kelas || "-"}</p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          onClick={() =>
            setStudent((prev) => ({
              ...prev,
              photo: "",
            }))
          }
          className="border border-red-600 text-red-600 rounded-xl py-3 font-bold"
        >
          Ambil Ulang
        </button>

        <button
          onClick={savePhoto}
          disabled={!student?.photo || uploading}
          className="bg-red-600 disabled:bg-gray-400 text-white rounded-xl py-3 font-bold"
        >
          {uploading ? "Mengupload..." : "💾 Simpan"}
        </button>

      </div>

    </div>
  );
}