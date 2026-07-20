"use client";

import { useState } from "react";

import StudentForm from "@/components/StudentForm";
import CameraCard from "@/components/CameraCard";
import PreviewCard from "@/components/PreviewCard";

export default function Dashboard() {
  const [student, setStudent] = useState({
    nama: "",
    nis: "",
    kelas: "",
    photo: null,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <StudentForm
          student={student}
          setStudent={setStudent}
        />

        <CameraCard
          student={student}
          setStudent={setStudent}
        />

        <PreviewCard
          student={student}
        />

      </div>
    </div>
  );
}