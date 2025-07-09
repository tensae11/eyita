"use client";

import Header from "@/components/app-header";
import VideoGrid from "@/components/video/app-video-grid";
import SearchBox from "@/components/app-search";
import { filter } from "@/lib/utils";
import useMovieApi from "@/hooks/use-movie-api";
import CategoryTabs from "@/components/app-category-selector";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Home() {
  const {
    movies,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    homeCategory,
  } = useMovieApi();

  const filteredMovies = filter(movies, selectedCategory, searchTerm);

  return (
    <div className="min-h-screen w-full">
      <Header />

      {/* Top Controls */}
      <div className="flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between mb-6">
        {/* Left: Category + Clear Filter */}
        <div className="flex flex-col gap-2 w-full md:flex-row md:items-center">
          {selectedCategory && (
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
              className="w-fit"
            >
              Clear Filter <X className="ml-1" />
            </Button>
          )}

          <CategoryTabs
            category={homeCategory}
            onSelect={setSelectedCategory}
            selected={selectedCategory}
          />
        </div>

        {/* Right: Search */}
        <div className="w-full md:w-auto">
          <SearchBox
            className="w-full md:w-72"
            onChange={(e) => setSearchTerm(e.target.value)}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      {/* Videos */}
      <VideoGrid movies={filteredMovies} />
    </div>
  );
}
