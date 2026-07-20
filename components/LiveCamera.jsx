"use client";

import { useEffect, useRef, useState } from "react";
import { processImage } from "@/lib/background";

export default function LiveCamera({
  student,
  setStudent,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
const [facingMode, setFacingMode] = useState("user");


  useEffect(() => {
    startCamera();

    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
        },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);

    } catch (err) {
      console.log(err);
      alert("Kamera tidak bisa dibuka");
    }
  };

  const switchCamera = async () => {
  stopCamera();

  setFacingMode((prev) =>
    prev === "user" ? "environment" : "user"
  );
};

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());
 videoRef.current.srcObject = null;
  setCameraOn(false);  
};

 const takePhoto = async () => {

  setLoading(true);

  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL("image/png");

  try {

    const result = await processImage(image);

    setStudent((prev) => ({
  ...prev,
  photo: result,
}));

  } catch (err) {

    console.log(err);

    alert("AI gagal memproses gambar");

  }

  setLoading(false);

};

  return (
    <div className="space-y-4">

      <div className="rounded-xl overflow-hidden bg-black">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full"
        />

      </div>
<div className="grid grid-cols-2 gap-3">
      <button
        onClick={takePhoto}
        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
      >
        {loading ? "⏳ Memproses AI..." : "📸 Ambil Foto"}
      </button>
      <button
  onClick={switchCamera}
  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
>
  🔄 Ganti Kamera
</button>
 <button
    onClick={cameraOn ? stopCamera : startCamera}
    className={`py-3 rounded-xl font-bold text-white ${
      cameraOn ? "bg-gray-700" : "bg-green-600"
    }`}
  >
    {cameraOn ? "⏹ Stop Camera" : "▶️ Open Camera  "}
  </button>
      <canvas
        ref={canvasRef}
        className="hidden"
      />
</div>
    </div>
  );
}