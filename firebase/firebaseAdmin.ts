import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig: ServiceAccount = {
  projectId: process.env.GOOGLE_PROJECT_ID as string,
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL as string,
  privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({
    credential: cert(firebaseAdminConfig),
  });
}

// Export initialized instances
export const adminAuth = getAuth();
export const db = getFirestore();
