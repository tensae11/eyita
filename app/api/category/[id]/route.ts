import { db } from "@/firebase/firebaseAdmin";
import { verifyFirebaseToken } from "@/lib/verify-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = await db.collection("categories").doc(id).get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyFirebaseToken();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const updates = await req.json();
  const docRef = db.collection("categories").doc(id);

  await docRef.update({
    ...updates,
    updatedAt: new Date(),
  });

  const updatedData = await docRef.get();
  return NextResponse.json({
    message: "Updated successfully",
    data: updatedData.data(),
  });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyFirebaseToken();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await db.collection("categories").doc(id).delete();
  return NextResponse.json({ message: "Deleted successfully" });
}
