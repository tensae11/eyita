import { db } from "@/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await params;

    const data = await getViewCounts(videoId);

    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 View count error:", err);
    return NextResponse.json(
      { error: "Failed to update view" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: videoId } = await params;
  const { ip, viewerHash, userAgent, rawSignature } = view_signature(req);

  try {
    const videoRef = db.collection("videos").doc(videoId);
    const viewDocRef = db
      .collection("views")
      .doc(videoId)
      .collection("viewers")
      .doc(viewerHash);

    const existingViewSnap = await viewDocRef.get();
    const now = Timestamp.now();
    const nowDate = now.toDate();

    if (existingViewSnap.exists) {
      const lastViewedAt = existingViewSnap.data()?.viewedAt?.toDate();
      if (lastViewedAt) {
        const diffInHours =
          (nowDate.getTime() - lastViewedAt.getTime()) / (1000 * 60 * 60);
        if (diffInHours < 24) {
          return NextResponse.json(
            { message: "View already counted within the last 24 hours" },
            { status: 200 }
          );
        }
      }
    }

    const viewInfo = {
      ip,
      viewerHash,
      userAgent,
      rawSignature,
      viewedAt: now,
    };

    await db.runTransaction(async (tx) => {
      const videoSnap = await tx.get(videoRef);
      if (!videoSnap.exists) throw new Error("Video not found");

      const videoData = videoSnap.data();
      const currentViews = videoData?.views || 0;
      const categoryId = videoData?.category;

      let categoryRef,
        categoryViews = 0;

      if (categoryId) {
        categoryRef = db.collection("categories").doc(categoryId);
        const categorySnap = await tx.get(categoryRef);
        categoryViews = categorySnap.exists
          ? categorySnap.data()?.totalViews || 0
          : 0;
      }

      tx.update(videoRef, { views: currentViews + 1 });
      tx.set(viewDocRef, viewInfo);
      if (categoryRef) {
        tx.update(categoryRef, { totalViews: categoryViews + 1 });
      }
    });

    return NextResponse.json({ message: "View counted", viewInfo });
  } catch (err) {
    console.error("🔥 View count error:", err);
    return NextResponse.json(
      { error: "Failed to update view" },
      { status: 500 }
    );
  }
}

function view_signature(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown-ip";
  const userAgent = req.headers.get("user-agent") || "unknown-agent";
  const rawSignature = `${ip}-${userAgent}`;

  const viewerHash = crypto
    .createHash("sha256")
    .update(rawSignature)
    .digest("hex");

  return { ip, viewerHash, userAgent, rawSignature };
}

function getRangeTimestamps() {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday start
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    today: Timestamp.fromDate(startOfToday),
    week: Timestamp.fromDate(startOfWeek),
    month: Timestamp.fromDate(startOfMonth),
  };
}

async function getViewCounts(videoId: string) {
  const { today, week, month } = getRangeTimestamps();

  const viewsRef = db.collection("views").doc(videoId).collection("viewers");

  const [todaySnap, weekSnap, monthSnap, allSnap] = await Promise.all([
    viewsRef.where("viewedAt", ">=", today).get(),
    viewsRef.where("viewedAt", ">=", week).get(),
    viewsRef.where("viewedAt", ">=", month).get(),
    viewsRef.get(),
  ]);

  return {
    videoId,
    today: todaySnap.size,
    week: weekSnap.size,
    month: monthSnap.size,
    total: allSnap.size,
  };
}
