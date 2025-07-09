import { Option } from "@/components/ui/multiple-selector";
import { CategoryType } from "./interface";

export const categories: CategoryType[] = [
  { id: "romance", name: "Romance", videoCount: 0, totalViews: 0 },
  { id: "action", name: "Action", videoCount: 0, totalViews: 0 },
  { id: "scifi", name: "Science fiction", videoCount: 0, totalViews: 0 },
  { id: "comedy", name: "Comedy", videoCount: 0, totalViews: 0 },
  { id: "drama", name: "Drama", videoCount: 0, totalViews: 0 },
  { id: "fantasy", name: "Fantasy", videoCount: 0, totalViews: 0 },
  { id: "western", name: "Western", videoCount: 0, totalViews: 0 },
  { id: "horror", name: "Horror", videoCount: 0, totalViews: 0 },
  { id: "mystery", name: "Mystery", videoCount: 0, totalViews: 0 },
  { id: "thriller", name: "Thriller", videoCount: 0, totalViews: 0 },
  { id: "movie", name: "Movies", videoCount: 0, totalViews: 0 },
  { id: "tv", name: "TV Shows", videoCount: 0, totalViews: 0 },
  { id: "sport", name: "Sports", videoCount: 0, totalViews: 0 },
  {
    id: "documentary",
    name: "Documentaries",
    videoCount: 0,
    totalViews: 0,
  },
];

export const tags: Option[] = [
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "Animation", value: "animation" },
  { label: "Biography", value: "biography" },
  { label: "Comedy", value: "comedy" },
  { label: "Crime", value: "crime" },
  { label: "Documentary", value: "documentary" },
  { label: "Drama", value: "drama" },
  { label: "Family", value: "family" },
  { label: "Fantasy", value: "fantasy" },
  { label: "History", value: "history" },
  { label: "Horror", value: "horror" },
  { label: "Musical", value: "musical" },
  { label: "Mystery", value: "mystery" },
  { label: "Romance", value: "romance" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Short", value: "short" },
  { label: "Sport", value: "sport" },
  { label: "Superhero", value: "superhero" },
  { label: "Thriller", value: "thriller" },
  { label: "War", value: "war" },
  { label: "Western", value: "western" },
];
export const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: "📘", color: "bg-blue-600" },
  { id: "twitter", name: "Twitter", icon: "🐦", color: "bg-sky-500" },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", color: "bg-green-500" },
  { id: "telegram", name: "Telegram", icon: "✈️", color: "bg-blue-500" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "bg-blue-700" },
  { id: "reddit", name: "Reddit", icon: "🤖", color: "bg-orange-600" },
];
