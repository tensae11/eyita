"use client"

import { useState } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import BottomNav from "@/components/navigation/BottomNav"
import { moviePosters, homeCategories, movies } from "@/lib/data"

interface HomePageProps {
  onNavigate: (page: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("movie")

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Movie Posters Background */}
      <div className="absolute inset-0 opacity-15">
        {moviePosters.map((poster) => (
          <div key={poster.id} className={`absolute ${poster.position} w-20 h-30`}>
            <Image
              src={poster.image || "/placeholder.svg"}
              alt={poster.title}
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Main Content */}
      <div className="relative z-10 pb-20">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-lg z-20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={() => onNavigate("search")}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="flex-1 flex justify-center">
                <h1 className="text-xl font-bold text-white">Move Stream</h1>
              </div>
              <div className="w-10"></div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder="Search movies, shows..."
                className="pl-12 bg-white text-black placeholder:text-gray-500 border-0 h-12 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Content with padding for fixed header */}
        <div className="pt-36 px-6">
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {homeCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`min-w-fit h-12 rounded-xl font-medium ${
                    selectedCategory === category.id
                      ? "bg-yellow-400 text-black hover:bg-yellow-500 border-0"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-lg"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-4">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-white/10 border-white/20 backdrop-blur-lg cursor-pointer hover:bg-white/20 transition-all rounded-xl"
                onClick={() => onNavigate("movie")}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] rounded-t-xl overflow-hidden">
                    <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-yellow-400 text-xs font-semibold">★ {movie.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-300">{movie.year}</span>
                      <span className="text-xs text-yellow-400 font-medium">{movie.genre}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentPage="home" onNavigate={onNavigate} />
    </div>
  )
}
