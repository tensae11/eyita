"use client";

import { MultipleCategory } from "@/components/app-category-multiple";
import Header from "@/components/app-header";
import { MultipleTags } from "@/components/app-tags-multiple";
import { Button } from "@/components/ui/button";
import VideoGrid from "@/components/video/app-video-grid";
import useMovieApi from "@/hooks/use-movie-api";
import { MovieInterface } from "@/lib/interface";
import { categoryFiltered } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export default function Category() {
  const { selectedCategories, setSelectedCategories, categories, movies } =
    useMovieApi();
  const [initialCategories, setInitialCategories] = useState<MovieInterface[]>(
    []
  );

  const { tags, setTags } = useMovieApi();

  const handleCategoryLoad = () => {
    setInitialCategories(
      categoryFiltered(
        movies,
        selectedCategories,
        tags.map((v) => v.value)
      )
    );
  };
  return (
    <div>
      <Header />

      <div className="flex items-start  p-4 space-x-4">
        {selectedCategories.length > 0 && (
          <Button variant="ghost" onClick={() => setSelectedCategories([])}>
            Clear Filter <X />
          </Button>
        )}
        <MultipleCategory
          categoryList={categories}
          category={selectedCategories}
          onClick={(v) =>
            setSelectedCategories((prev) =>
              prev.includes(v) ? prev.filter((c) => c !== v) : [...prev, v]
            )
          }
        />
      </div>
      <div className="flex items-start  p-4 space-x-4">
        {tags.length > 0 && (
          <Button variant="ghost" onClick={() => setTags([])}>
            Clear Filter <X />
          </Button>
        )}
        <MultipleTags
          tag={tags.map((t) => t.value)}
          onClick={(v) => {
            setTags((prev) =>
              prev.map((t) => t.value).includes(v)
                ? prev.filter((t) => t.value !== v)
                : [...prev, { value: v, label: v }]
            );
          }}
        />
      </div>
      <div className="mt-auto m-6">
        <Button
          onClick={handleCategoryLoad}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 dark:text-white cursor-pointer text-black font-bold text-lg rounded-2xl border-0"
        >
          Next
        </Button>
      </div>

      {initialCategories.length > 0 && <VideoGrid movies={initialCategories} />}
    </div>
  );
}
