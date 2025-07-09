import { Option } from "@/components/ui/multiple-selector";
import { CategoryType, MovieInterface } from "@/lib/interface";
import categoryService from "@/lib/service/category-service";
import tagService from "@/lib/service/tag-service";
import videoService from "@/lib/service/video-service";
import { calculateMetrics, handleError } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useMovieApi() {
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [homeCategory, setHomeCategory] = useState<CategoryType[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<
    string | null | undefined
  >(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [metrics, setMetrics] = useState({
    totalVideos: 0,
    totalCumulativeViews: 0,
    videosUploadedToday: 0,
    videosUploadedThisWeek: 0,
    videosUploadedThisMonth: 0,
    dailyUploadCounts: [] as { date: string; count: number }[],
    topVideos: [] as MovieInterface[],
  });

  useEffect(() => {
    const { request, cancel } = categoryService.getAll<CategoryType>();
    request
      .then(({ data }) => {
        setCategories(data);
        setHomeCategory(data.filter((d) => d.home === true));
      })
      .catch(
        handleError("Error can't load Categories", () => setCategories([]))
      );
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = tagService.getAll<Option>();

    request
      .then(({ data }) => {
        setTags(data as Option[]);
      })
      .catch(handleError("Error loading tags", () => setTags([])));
    return () => cancel();
  }, []);

  useEffect(() => {
    videoService
      .getAll()
      .request.then(({ data }) => {
        const list = data as MovieInterface[];
        setMovies(list);
        const {
          totalVideos,
          totalViews,
          uploadsToday,
          uploadsThisWeek,
          uploadsThisMonth,
          dailyUploads,
          topVideos,
        } = calculateMetrics(list);
        setMetrics({
          totalVideos,
          totalCumulativeViews: totalViews,
          videosUploadedToday: uploadsToday,
          videosUploadedThisWeek: uploadsThisWeek,
          videosUploadedThisMonth: uploadsThisMonth,
          dailyUploadCounts: dailyUploads,
          topVideos,
        });
      })
      .catch(handleError("Failed to load videos", () => setMovies([])));
  }, []);

  return {
    movies,
    setMovies,
    error,
    setError,
    isLoading,
    setLoading,
    setSearchTerm,
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    setSelectedVideoId,
    selectedVideoId,
    selectedCategories,
    setSelectedCategories,
    categories,
    setCategories,
    metrics,
    homeCategory,
    tags,
    setTags,
  };
}
