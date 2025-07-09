import { adminAuth } from "@/firebase/firebaseAdmin";

export async function verifyToken(token: string) {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    return null;
  }
}
