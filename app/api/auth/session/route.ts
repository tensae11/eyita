import { adminAuth } from "@/firebase/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    await adminAuth.verifyIdToken(token);

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: "Session created" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
