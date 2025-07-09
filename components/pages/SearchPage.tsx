"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import BottomNav from "@/components/navigation/BottomNav"
import { moviePosters, ads } from "@/lib/data"

interface SearchPageProps {
  onNavigate: (page: string) => void
}

export default function SearchPage({ onNavigate }: SearchPageProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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
        {/* Header */}
        <div className="p-6 pt-12">
          <div className="flex justify-center mb-2">
            <h1 className="text-2xl font-bold text-white">Move Stream</h1>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-300">LIVE</span>
          </div>
        </div>

        {/* Auto-scrollable Advertisement Card */}
        <div className="px-6 mb-8">
          <div className="relative overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
            >
              {ads.map((ad, index) => (
                <Card
                  key={ad.id}
                  className="min-w-full bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-lg"
                >
                  <CardContent className="p-0">
                    <div className={`h-40 bg-gradient-to-r ${ad.gradient} rounded-t-xl relative overflow-hidden`}>
                      <Image
                        src={ad.image || "/placeholder.svg"}
                        alt={ad.title}
                        fill
                        className="object-cover mix-blend-overlay"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white text-xs font-medium">
                          {index + 1}/{ads.length}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-lg">{ad.title}</h3>
                      <p className="text-sm text-gray-300 mt-1 mb-3">{ad.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentAdIndex ? "bg-yellow-400 w-6" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col px-6 pb-32">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">What are you Interested in ?</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Select some topics to follow to personalize your experience.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search Here"
              className="pl-12 bg-white text-black placeholder:text-gray-500 border-0 h-14 rounded-2xl text-lg font-medium"
            />
          </div>

          {/* Home Button */}
          <div className="mt-auto">
            <Button
              onClick={() => onNavigate("home")}
              className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-2xl border-0"
            >
              Home
            </Button>
          </div>
        </div>
      </div>

      <BottomNav currentPage="search" onNavigate={onNavigate} />
    </div>
  )
}
