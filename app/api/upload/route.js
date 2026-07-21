import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getDrive,
  uploadStudentPhoto,
} from "@/lib/googleDrive";

export async function POST(req) {
  try {
    // Ambil session login
    const session = await getServerSession(authOptions);
console.log(session);
    if (!session?.accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Belum login Google",
        },
        {
          status: 401,
        }
      );
    }

    // Buat Google Drive client dari access token
    const drive = getDrive(session.accessToken);

    const body = await req.json();

    const {
      nama,
      
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

    const base64 = photo.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64, "base64");

   
    const fileName = `${nama}.jpg`;

    const result = await uploadStudentPhoto({
      drive,
      kelas,
      fileName,
      buffer,
    replace: body.replace || false,
});

return NextResponse.json({
  success: true,
  ...result,
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