import { useState } from "react";
import { MovieInterface } from "@/lib/interface";
import MovieCard from "../app-movie-card";
import { Button } from "../ui/button";

const ITEMS_PER_PAGE = 8;

export default function VideoGrid({ movies }: { movies: MovieInterface[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {paginatedMovies.map((item, i) => (
          <MovieCard key={i} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={goToPrev}
            disabled={currentPage === 1}
            className="bg-gray-200 cursor-pointer dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2"
          >
            Prev
          </Button>
          <span className="font-semibold text-sm dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="bg-gray-200 cursor-pointer dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
