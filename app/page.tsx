"use client"

import { useState } from "react"
import SearchPage from "@/components/pages/SearchPage"
import HomePage from "@/components/pages/HomePage"
import CategoryPage from "@/components/pages/CategoryPage"
import MoviePage from "@/components/pages/MoviePage"

const moviePosters = [
  { id: 1, title: "CHERRY", image: "/images/cherry.png", position: "top-10 left-5 rotate-12" },
  { id: 2, title: "TRIGGERED", image: "/images/triggered.png", position: "top-20 right-8 -rotate-6" },
  { id: 3, title: "OBLIVION", image: "/images/oblivion.png", position: "top-32 left-1/4 rotate-3" },
  {
    id: 4,
    title: "THE FANATIC",
    image: "/images/fanatic.png",
    position: "top-40 right-1/4 -rotate-12",
  },
  { id: 5, title: "THE MARTIAN", image: "/images/martian.png", position: "top-52 left-12 rotate-6" },
  {
    id: 6,
    title: "POPEYE",
    image: "/images/popeye.png",
    position: "top-64 right-16 -rotate-3",
  },
]

const ads = [
  {
    id: 1,
    title: "Marvel's New Universe",
    subtitle: "Experience the future of entertainment",
    image: "/images/cherry.png",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "Sci-Fi Collection",
    subtitle: "Journey beyond imagination",
    image: "/images/oblivion.png",
    gradient: "from-cyan-500 to-purple-600",
  },
  {
    id: 3,
    title: "Action Blockbusters",
    subtitle: "Adrenaline-pumping adventures",
    image: "/images/triggered.png",
    gradient: "from-orange-500 to-red-600",
  },
]

const categories = [
  { id: "romance", name: "Romance", highlighted: false },
  { id: "action", name: "Action", highlighted: true },
  { id: "scifi", name: "Science fiction", highlighted: true },
  { id: "comedy", name: "Comedy", highlighted: false },
  { id: "drama", name: "Drama", highlighted: false },
  { id: "fantasy", name: "Fantasy", highlighted: false },
  { id: "western", name: "Western", highlighted: false },
  { id: "horror", name: "Horror", highlighted: false },
  { id: "mystery", name: "Mystery", highlighted: false },
  { id: "thriller", name: "Thriller", highlighted: true },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState("search")

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  switch (currentPage) {
    case "home":
      return <HomePage onNavigate={handleNavigation} />
    case "movie":
      return <MoviePage onNavigate={handleNavigation} />
    case "category":
      return <CategoryPage onNavigate={handleNavigation} />
    default:
      return <SearchPage onNavigate={handleNavigation} />
  }
}
