import { db } from "@/firebase/firebaseAdmin";
import { MovieInterface } from "@/lib/interface";
import { verifyFirebaseToken } from "@/lib/verify-token";
import { Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.YT_API_KEY as string;

export async function GET() {
  const snapshot = await db
    .collection("videos")
    .orderBy("createdAt", "desc")
    .get();
  const videos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await verifyFirebaseToken();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const description =
    body.description ?? (await fetchDescription(body.videoId));
  const data: MovieInterface = {
    ...body,
    description,
    createdAt: Timestamp.now(),
  };

  const docRef = await db.collection("videos").doc(data.id).set(data);
  return NextResponse.json({ data: docRef });
}

const fetchDescription = async (videoId: string): Promise<string | null> => {
  if (!videoId || !apiKey) {
    console.error("Missing video ID or API key");
    return null;
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
      { cache: "force-cache" }
    );

    if (!res.ok) {
      console.error(`YouTube API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    const snippet = data?.items?.[0]?.snippet;

    return snippet?.description ?? null;
  } catch (err) {
    console.error("Failed to fetch YouTube description:", err);
    return null;
  }
};
