import { google } from "googleapis";
import { Readable } from "stream";

function normalizeKelas(kelas) {
  if (!kelas) return "";

  // Huruf besar dan hapus spasi, -, _
  const text = kelas
    .toUpperCase()
    .replace(/[\s\-_]/g, "");

  // Cocokkan pola XTKJ1, XTKJ2, dst.
  const match = text.match(/^(X|XI|XII)([A-Z]+)(\d+)$/);

  if (match) {
    const tingkat = match[1];
    const jurusan = match[2];
    const rombel = match[3];

    return `${tingkat} ${jurusan} ${rombel}`;
  }

  return kelas.toUpperCase().trim();
}
export function getDrive(accessToken) {
  const auth = new google.auth.OAuth2();

  auth.setCredentials({
    access_token: accessToken,
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

export async function createFolderIfNotExists(
  drive,
  folderName
) {
  const res = await drive.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents
        and mimeType='application/vnd.google-apps.folder'
        and trashed=false`,
    fields: "files(id,name)",
  });

  const folder = res.data.files.find(
    (f) =>
      f.name.toLowerCase().trim() ===
      folderName.toLowerCase().trim()
  );

  if (folder) {
    return folder.id;
  }

  const created = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    },
    fields: "id",
  });

  console.log("📁 Folder dibuat:", folderName);

  return created.data.id;
}

export async function uploadStudentPhoto({
  drive,
  kelas,
  fileName,
  buffer,
  replace = false,
}) {

 const folderName = normalizeKelas(kelas);

const folderId = await createFolderIfNotExists(
  drive,
  folderName
);

  const existing = await drive.files.list({
    q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
    fields: "files(id,name)",
  });

  const media = {
    mimeType: "image/jpeg",
    body: Readable.from(buffer),
  };

  if (existing.data.files.length > 0) {

  // Belum diizinkan mengganti
  if (!replace) {
    return {
      exists: true,
      fileId: existing.data.files[0].id,
    };
  }

  // Sudah diizinkan mengganti
  await drive.files.update({
    fileId: existing.data.files[0].id,
    media,
  });

  console.log("♻️ Foto diperbarui");

  return {
    updated: true,
    fileId: existing.data.files[0].id,
  };
}

  const uploaded = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media,
    fields: "id",
  });

  console.log("✅ Upload berhasil");

  return {
  uploaded: true,
  fileId: uploaded.data.id,
};
}