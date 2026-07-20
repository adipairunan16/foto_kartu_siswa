import { NextResponse } from "next/server";
import { uploadStudentPhoto } from "@/lib/googleDrive";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nama,
      nis,
      kelas,
      photo,
    } = body;

    if (!nama || !kelas || !photo) {
      return NextResponse.json(
        {
          success: false,
          message: "Data belum lengkap",
        },
        {
          status: 400,
        }
      );
    }

    // Hilangkan header Base64
    const base64 = photo.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64, "base64");

    const fileName = `${nis}_${nama}.jpg`;

    const fileId = await uploadStudentPhoto({
      kelas,
      fileName,
      buffer,
    });

    return NextResponse.json({
      success: true,
      fileId,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}