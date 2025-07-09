"use client";

import ShareModal from "@/components/app-share-modal";
import VideoGrid from "@/components/video/app-video-grid";
import MovieDescription from "@/components/video/app-video-secription";
import useMovieApi from "@/hooks/use-movie-api";
import { MovieInterface } from "@/lib/interface";
import videoService from "@/lib/service/video-service";
import { CanceledError } from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  params: Promise<{ Id: string }>;
}

export default function MovieDetailPage({ params }: Props) {
  const [movie, setMovie] = useState<MovieInterface>();
  const [open, setOpen] = useState(false);
  const { setSelectedCategory, selectedCategory, movies } = useMovieApi();
  const { Id } = use(params);

  useEffect(() => {
    const { request, cancel } = videoService.get<MovieInterface>(Id);
    request
      .then(({ data: movie }) => {
        setMovie(movie);
        setSelectedCategory(movie.category);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        toast.error("Something error happened try again later");
      });

    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

  const relatedMovies = movies
    .filter((item) => item.category === selectedCategory)
    .filter((item) => item.id !== Id);

  return (
    <div className="space-y-6">
      <div
        className="relative min-h-screen text-white bg-black"
        style={{
          backgroundImage: `url(${movie?.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 px-6 pt-20 pb-32 min-h-screen w-full bg-gradient-to-t from-black/90 to-black/40">
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-bold">{movie?.title}</h1>

            <div className="flex items-center gap-3 text-sm text-yellow-400">
              <span>⭐ {movie?.rating}</span>
              <span className="text-white/70">| {movie?.year}</span>
              <span className="text-blue-400">| {movie?.genre}</span>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Link
                href={`/play/${movie?.id}`}
                prefetch
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md"
              >
                Watch Now
              </Link>
            </div>

            <button
              className="mt-2 w-full bg-white/10 hover:bg-white/20 py-2 text-sm rounded-md"
              onClick={() => setOpen(true)}
            >
              🔗 Share Movie
            </button>

            <MovieDescription description={movie?.description} />
          </div>
        </div>
      </div>

      <h1 className="text-2xl mx-4">Related Movies</h1>
      <VideoGrid movies={relatedMovies} />
      <ShareModal movie={movie} open={open} onOpenChange={setOpen} />
    </div>
  );
}
