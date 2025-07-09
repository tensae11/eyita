"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  movie: {
    id: number
    title: string
    year: string
    rating: string
    image: string
    genre: string
    description: string
  }
  onClose: () => void
}

export default function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const youtubeVideoId = "dQw4w9WgXcQ" // Sample YouTube video ID

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-bold">{movie.title}</h3>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
            title={movie.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
