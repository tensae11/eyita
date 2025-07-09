"use client"

import { useState } from "react"
import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import BottomNav from "@/components/navigation/BottomNav"
import VideoPlayer from "@/components/video/VideoPlayer"
import ShareModal from "@/components/modals/ShareModal"
import { moviePosters, movieData, relatedMovies } from "@/lib/data"

interface MoviePageProps {
  onNavigate: (page: string) => void
}

export default function MoviePage({ onNavigate }: MoviePageProps) {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Movie Posters Background */}
      <div className="absolute inset-0 opacity-10">
        {moviePosters.map((poster) => (
          <div key={poster.id} className={`absolute ${poster.position} w-16 h-24`}>
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
      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 pb-20">
        {/* Hero Section */}
        <div className="relative h-80 overflow-hidden">
          <Image src={movieData.image || "/placeholder.svg"} alt={movieData.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            size="icon"
            className="absolute top-12 left-6 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-6 -mt-20 relative z-10">
          {/* Movie Info */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">{movieData.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-400 font-bold text-lg">★ {movieData.rating}</span>
              <span className="text-gray-300 font-medium">{movieData.year}</span>
              <span className="text-yellow-400 font-medium">{movieData.genre}</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">{movieData.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setShowVideoPlayer(true)}
                className="flex-1 h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg border-0 rounded-xl"
              >
                Watch Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl backdrop-blur-lg"
              >
                ★
              </Button>
            </div>

            {/* Share */}
            <Button
              onClick={() => setShowShareModal(true)}
              variant="outline"
              className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl backdrop-blur-lg font-medium"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Movie
            </Button>
          </div>

          {/* Related Movies */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Related Movies</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedMovies.map((movie) => (
                <Card
                  key={movie.id}
                  className="bg-white/10 border-white/20 backdrop-blur-lg cursor-pointer hover:bg-white/20 transition-all rounded-lg"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-white font-medium truncate">{movie.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showVideoPlayer && <VideoPlayer movie={movieData} onClose={() => setShowVideoPlayer(false)} />}

      {showShareModal && <ShareModal movie={movieData} onClose={() => setShowShareModal(false)} />}

      <BottomNav currentPage="movie" onNavigate={onNavigate} />
    </div>
  )
}
