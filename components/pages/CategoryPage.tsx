"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import BottomNav from "@/components/navigation/BottomNav"
import { moviePosters, categories } from "@/lib/data"

interface CategoryPageProps {
  onNavigate: (page: string) => void
}

export default function CategoryPage({ onNavigate }: CategoryPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Movie Posters Background */}
      <div className="absolute inset-0 opacity-30">
        {moviePosters.map((poster) => (
          <div key={poster.id} className={`absolute ${poster.position} w-32 h-48`}>
            <Image
              src={poster.image || "/placeholder.svg"}
              alt={poster.title}
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Center Content */}
        <div className="flex-1 flex flex-col px-6 pb-32">
          <div className="text-center mb-8 pt-12">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">What are you Interested in ?</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Select some topics to follow to personalize your experience.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search Categories"
              className="pl-12 bg-white text-black placeholder:text-gray-500 border-0 h-14 rounded-2xl text-lg font-medium"
            />
          </div>

          {/* Popular Categories */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Popular Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`rounded-xl px-5 py-6 h-auto ${
                    category.highlighted || selectedCategories.includes(category.id)
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                      : "bg-black border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-auto">
            <Button
              onClick={() => onNavigate("home")}
              className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-2xl border-0"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <BottomNav currentPage="category" onNavigate={onNavigate} />
    </div>
  )
}
