import LiveCamera from "./LiveCamera";

export default function CameraCard({
  student,
  setStudent,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        📷 Kamera
      </h2>

      <LiveCamera
        student={student}
        setStudent={setStudent}
      />

    </div>
  );
}