import { db } from "@/firebase/firebaseAdmin";
import { verifyFirebaseToken } from "@/lib/verify-token";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET() {
  const snapshot = await db
    .collection("categories")
    .orderBy("createdAt", "desc")
    .get();
  const categories = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const user = await verifyFirebaseToken();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const categoriesRef = await db.collection("categories");

  const data = {
    ...body,
    id: v4(),
    videoCount: 0,
    totalViews: 0,
    createdAt: new Date(),
  };
  await categoriesRef.doc(data.id).set(data);
  return NextResponse.json(
    { message: "Category created successfully", data },
    { status: 201 }
  );
}
