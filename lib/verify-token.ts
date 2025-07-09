import { cookies } from "next/headers";
import { adminAuth } from "@/firebase/firebaseAdmin";

export async function verifyFirebaseToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded = await adminAuth.verifyIdToken(token);
  return decoded;
}
