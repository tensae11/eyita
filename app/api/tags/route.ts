import { db } from "@/firebase/firebaseAdmin";
import { verifyFirebaseToken } from "@/lib/verify-token";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET() {
  const snapshot = await db
    .collection("tags")
    .orderBy("createdAt", "desc")
    .get();
  const tags = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
  const user = await verifyFirebaseToken();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const tagsRef = await db.collection("tags");

  const data = {
    ...body,
    id: v4(),
    createdAt: new Date(),
  };
  await tagsRef.doc(data.id).set(data);
  return NextResponse.json(
    { message: "Tag created successfully", data },
    { status: 201 }
  );
}
