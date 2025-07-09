"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { socialPlatforms } from "@/lib/data"

interface ShareModalProps {
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

export default function ShareModal({ movie, onClose }: ShareModalProps) {
  const shareToSocialMedia = (platform: string) => {
    const movieUrl = `https://movestream.app/movie/${movie.id}`
    const shareText = `Check out "${movie.title}" (${movie.year}) - ${movie.description.substring(0, 100)}...`

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}&quote=${encodeURIComponent(shareText)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(movieUrl)}&hashtags=MoveStream,Movies,${movie.genre}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${movieUrl}`)}`
        break
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(movieUrl)}&text=${encodeURIComponent(shareText)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(movieUrl)}`
        break
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(movieUrl)}&title=${encodeURIComponent(shareText)}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
    onClose()
  }

  const copyToClipboard = async () => {
    const movieUrl = `https://movestream.app/movie/${movie.id}`
    try {
      await navigator.clipboard.writeText(movieUrl)
      alert("Link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl font-bold">Share "{movie.title}"</h3>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Social Media Platforms */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.id}
              onClick={() => shareToSocialMedia(platform.id)}
              className={`${platform.color} hover:opacity-80 text-white font-medium h-12 rounded-xl border-0`}
            >
              <span className="mr-2 text-lg">{platform.icon}</span>
              {platform.name}
            </Button>
          ))}
        </div>

        {/* Copy Link */}
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl backdrop-blur-lg font-medium"
        >
          📋 Copy Link
        </Button>
      </div>
    </div>
  )
}
