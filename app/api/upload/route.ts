import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.file)
    return NextResponse.json({ error: "File not found" }, { status: 404 });

  try {
    const uploadRes = await cloudinary.uploader.upload(body.file, {
      folder: "ad_poster",
    });
    return NextResponse.json({ url: uploadRes.secure_url }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
