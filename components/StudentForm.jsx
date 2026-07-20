"use client";

export default function StudentForm({ student, setStudent }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">
        📋 Input Data Siswa
      </h2>

      {/* Nama */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">
          Nama Siswa
        </label>

        <input
          type="text"
          value={student.nama}
          onChange={(e) =>
            setStudent({
              ...student,
              nama: e.target.value,
            })
          }
          placeholder="Masukkan nama siswa"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* NIS */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">
          NIS
        </label>

        <input
          type="text"
          value={student.nis}
          onChange={(e) =>
            setStudent({
              ...student,
              nis: e.target.value,
            })
          }
          placeholder="Nomor Induk Siswa"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Kelas */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">
          Kelas
        </label>

        <select
          value={student.kelas}
          onChange={(e) =>
            setStudent({
              ...student,
              kelas: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Pilih Kelas</option>
          <option value="X TKJ">X TKJ</option>
          <option value="XI TKJ">XI TKJ</option>
          <option value="XII TKJ">XII TKJ</option>
        </select>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <p className="text-gray-500 text-sm">
          Folder Google Drive
        </p>

        <p className="font-bold mt-1">
          Foto Siswa / {student.kelas || "-"}
        </p>
      </div>
    </div>
  );
}