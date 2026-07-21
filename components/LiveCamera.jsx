"use client";

import { useEffect, useRef, useState } from "react";


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

  async function startCamera() {
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
      console.error(err);
      alert("Kamera tidak dapat dibuka");
    }
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject;

    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());

    videoRef.current.srcObject = null;
    setCameraOn(false);
  }

  function switchCamera() {
    stopCamera();

    setFacingMode((prev) =>
      prev === "user" ? "environment" : "user"
    );
  }

  async function takePhoto() {
    try {
      setLoading(true);

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0);

     const image = canvas.toDataURL("image/jpeg", 0.95);

setStudent((prev) => ({
  ...prev,
  photo: image,
}));

    } catch (err) {
      console.error(err);
      alert("Gagal memproses foto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <div className="rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-3">

        <button
          onClick={takePhoto}
          disabled={loading}
          className="bg-red-600 text-white rounded-xl py-3 font-bold"
        >
          {loading ? "Memproses..." : "📸 Foto"}
        </button>

        <button
          onClick={switchCamera}
          className="bg-blue-600 text-white rounded-xl py-3 font-bold"
        >
          🔄 Kamera
        </button>

        <button
          onClick={cameraOn ? stopCamera : startCamera}
          className={`rounded-xl py-3 font-bold text-white ${
            cameraOn ? "bg-gray-700" : "bg-green-600"
          }`}
        >
          {cameraOn ? "Stop" : "Start"}
        </button>

      </div>

    </div>
  );
}