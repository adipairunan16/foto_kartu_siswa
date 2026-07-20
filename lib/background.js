import { removeBackground } from "@imgly/background-removal";

export async function processImage(base64) {
  // Base64 → Blob
  const response = await fetch(base64);
  const blob = await response.blob();

  // Hapus background
  const resultBlob = await removeBackground(blob);

  // Blob → Image
  const imageUrl = URL.createObjectURL(resultBlob);

  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      // Background merah
      ctx.fillStyle = "#C00000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Tempel hasil AI
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/jpeg", 0.95));

      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;
  });
}