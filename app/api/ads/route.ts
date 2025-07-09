import { db } from "@/firebase/firebaseAdmin";
import { BannerAd } from "@/lib/interface";
import { verifyFirebaseToken } from "@/lib/verify-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const snapshot = await db
    .collection("ads")
    .orderBy("createdAt", "desc")
    .get();
  const ads = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return NextResponse.json(ads);
}

export async function POST(req: NextRequest) {
  const user = await verifyFirebaseToken();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  const data: BannerAd = {
    ...body,
    createdAt: new Date(),
  };
  const docRef = await db.collection("ads").doc(data.id).set(data);
  return NextResponse.json({ data: docRef });
}
