import { auth } from "@/firebase/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { email, password } = data;
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
