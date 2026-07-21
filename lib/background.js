import { removeBackground } from "@imgly/background-removal";

export async function processImage(imageSrc) {
  const blob = await removeBackground(imageSrc);

  const img = await createImageBitmap(blob);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");

  // Background merah
  ctx.fillStyle = "#d60000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gambar hasil tanpa background
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL("image/jpeg", 0.95);
}