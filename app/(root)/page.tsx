"use client";

import HeroSection from "@/components/app-hero";
import SearchBox from "@/components/app-search";
import { Button } from "@/components/ui/button";
import VideoGrid from "@/components/video/app-video-grid";
import useMovieApi from "@/hooks/use-movie-api";
import { MovieInterface } from "@/lib/interface";
import { search } from "@/lib/utils";
import { useState } from "react";

export default function Video() {
  const { setSearchTerm, searchTerm, movies } = useMovieApi();
  const [searchedMovies, setSearchedMovies] = useState<MovieInterface[]>([]);
  const handleSearch = () => {
    setSearchedMovies(search(movies, searchTerm));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="p-4 sm:p-6 pt-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
          Move Stream
        </h1>
        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-black dark:text-gray-300">LIVE</span>
        </div>
      </div>

      <HeroSection />

      <div className="text-center sm:mb-8 sm:pt-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-white mb-2 leading-tight">
          What are you interested in?
        </h2>
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
          Select some topics to personalize your experience.
        </p>
      </div>

      <div className="flex-1 flex flex-col px-4 sm:px-6">
        <SearchBox
          className="relative w-full"
          searchTerm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suggestions={movies.map((movie) => movie.title)}
          maxSuggestions={5}
        />
      </div>

      <div className="mx-4 sm:mx-6 my-6">
        <Button
          onClick={handleSearch}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-2xl"
        >
          Search
        </Button>
      </div>

      <div className="px-4 sm:px-6">
        {searchTerm && <VideoGrid movies={searchedMovies} />}
      </div>
    </div>
  );
}
