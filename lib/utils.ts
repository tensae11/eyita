import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMovieUrl(movieId: number): string {
  return `https://movestream.app/movie/${movieId}`
}

export function formatShareText(movie: { title: string; year: string; description: string }): string {
  return `Check out "${movie.title}" (${movie.year}) - ${movie.description.substring(0, 100)}...`
}
