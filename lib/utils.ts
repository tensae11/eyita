import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BannerAd, MovieInterface, VideosType } from "./interface";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function insertAdIntoList(
  list: MovieInterface[],
  ad: BannerAd,
  index: number
): VideosType[] {
  return [...list.slice(0, index), ad, ...list.slice(index)];
}

export const filter = (
  movies: MovieInterface[],
  selectedCategory: string | null,
  searchTerm: string
) =>
  movies
    .filter((item) => {
      return selectedCategory ? item.category === selectedCategory : true;
    })
    .filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

export const search = (movieList: MovieInterface[], searchTerm: string) =>
  movieList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

export const categoryFiltered = (
  movies: MovieInterface[],
  selectedCategories: string[],
  selectedTags: string[]
): MovieInterface[] => {
  const hasCategoryFilter = selectedCategories.length > 0;
  const hasTagFilter = selectedTags.length > 0;

  return movies.filter((movie) => {
    const matchCategory = hasCategoryFilter
      ? selectedCategories.includes(movie.category)
      : true;

    const matchTag = hasTagFilter
      ? movie.tags?.some((tag) => selectedTags.includes(tag))
      : true;

    return matchCategory && matchTag;
  });
};

export const handleError =
  (message: string, fallback: () => void) => (error: unknown) => {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    toast.error(`❌ ${message}: ${errorMessage}`);
    fallback();
  };

export function getMovieUrl(videoId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}/video/${videoId}`;
}

function isFirestoreTimestamp(val: unknown): val is { toDate(): Date } {
  return (
    typeof val === "object" &&
    val !== null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (val as any).toDate === "function"
  );
}

export function calculateMetrics(list: MovieInterface[]) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const day = now.getDay(); // Sunday = 0
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // set to Monday
  const startOfWeek = new Date(now.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let views = 0,
    today = 0,
    week = 0,
    month = 0;
  const daily: Record<string, number> = {};

  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    daily[d.toISOString().split("T")[0]] = 0;
  }

  for (const movie of list) {
    const raw = movie.createdAt;
    const createdAt =
      raw instanceof Date
        ? raw
        : isFirestoreTimestamp(raw)
        ? raw.toDate()
        : typeof raw === "string"
        ? new Date(raw)
        : new Date(0);

    if (createdAt >= startOfToday) today++;
    if (createdAt >= startOfWeek) week++;
    if (createdAt >= startOfMonth) month++;

    views += movie.views || 0;

    const key = createdAt.toISOString().split("T")[0];
    if (daily[key] !== undefined) daily[key]++;
  }

  const dailyUploads = Object.entries(daily).map(([date, count]) => ({
    date,
    count,
  }));
  const topVideos = [...list]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return {
    totalVideos: list.length,
    totalViews: views,
    uploadsToday: today,
    uploadsThisWeek: week,
    uploadsThisMonth: month,
    dailyUploads,
    topVideos,
  };
}

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
