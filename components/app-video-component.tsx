"use client";

import { X, Play } from "lucide-react";
import { useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { toast } from "sonner";

export default function VideoModal({
  videoId,
  onClose,
  onView,
}: {
  videoId: string;
  onClose: (videoId: string) => void;
  onView: (videoId: string) => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(videoId);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, videoId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width="100%"
          height="100%"
          playing
          
          controls
          onStart={() => toast.info("Video is playing")}
          onEnded={() => onView(videoId)}
          playIcon={
            <div className="bg-black/60 p-4 rounded-full">
              <Play className="text-white w-12 h-12" />
            </div>
          }
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
        <button
          onClick={() => onClose(videoId)}
          className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <X className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
