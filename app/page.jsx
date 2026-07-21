"use client";

import { useState } from "react";

import StudentForm from "@/components/StudentForm";
import CameraCard from "@/components/CameraCard";
import PreviewCard from "@/components/PreviewCard";
import LoginButton from "@/components/LoginButton";

export default function Dashboard() {
  const [student, setStudent] = useState({
    nama: "",
   
    kelas: "",
    photo: null,
  });

  return (

    
    <div>
      <div className="flex justify-end mb-4">
  <LoginButton />
  </div>
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
          setStudent={setStudent}
        />

      </div>
    </div>
  );
}