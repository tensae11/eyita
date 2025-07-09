"use client";

import AppTable from "@/components/app-table";
import useMovieApi from "@/hooks/use-movie-api";
import Image from "next/image";

export default function Page() {
  const {
    movies,
    metrics: { topVideos },
  } = useMovieApi();
  return (
    <div className="flex flex-col p-5 space-y-6">
      {topVideos && topVideos.length > 0 && (
        <div className="flex items-center gap-4 p-4 dark:bg-gray-900/90 rounded-lg shadow">
          <Image
            src={topVideos[0].thumbnail}
            alt={topVideos[0].title}
            width={120}
            height={70}
            className="rounded-md"
          />
          <div>
            <h2 className="text-xl font-semibold">Most Viewed</h2>
            <p className="text-lg">{topVideos[0].title}</p>
            <p className="text-sm text-gray-600">{topVideos[0].views} views</p>
          </div>
        </div>
      )}

      <AppTable movies={movies.sort((a, b) => b.views - a.views)} />
    </div>
  );
}
