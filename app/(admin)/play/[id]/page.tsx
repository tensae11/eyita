"use client";
import { MovieInterface } from "@/lib/interface";
import apiClient from "@/lib/service/api-client";
import videoService from "@/lib/service/video-service";
import { CanceledError } from "axios";
import { use, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Play({ params }: Props) {
  const { id } = use(params);
  const [movie, setMovie] = useState<MovieInterface>();

  useEffect(() => {
    const { request, cancel } = videoService.get<MovieInterface>(id);
    request
      .then(({ data: movie }) => {
        setMovie(movie);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
      });

    return () => cancel();
  }, [id]);

  const handleView = () => {
    let fingerprint = localStorage.getItem("browser_fp");

    if (!fingerprint) {
      fingerprint = crypto.randomUUID();
      localStorage.setItem("browser_fp", fingerprint);
    }
    apiClient.put("/video/" + id + "/views");
  };
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="w-full h-full">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movie?.videoId}`}
          width="100%"
          height="100%"
          playing
          controls
          onPlay={handleView}
          config={{
            youtube: {
              playerVars: { fs: 1, modestbranding: 1 },
            },
          }}
        />
      </div>
    </div>
  );
}
