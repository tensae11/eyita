"use client";

import VideoModal from "../app-video-component";

export default function VideoModalWrapper({
  videoId,
  onClose,
  onView,
}: {
  videoId: string | null | undefined;
  onClose: () => void;
  onView: () => void;
}) {
  if (!videoId) return null;

  return <VideoModal videoId={videoId} onClose={onClose} onView={onView} />;
}
