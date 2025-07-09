"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MovieInterface } from "@/lib/interface";
import { socialPlatforms } from "@/lib/data";
import { getMovieUrl } from "@/lib/utils";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: MovieInterface | undefined;
}


export default function ShareModal({
    movie,
    open,
    onOpenChange,
}: ShareModalProps) {
    const movieUrl = getMovieUrl(movie?.id || "");
    
    const shareToSocialMedia = (platform: string) => {
    const shareText = `Check out "${movie?.title}" (${movie?.year})`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          movieUrl
        )}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(movieUrl)}&hashtags=MoveStream,Movies,${
          movie?.genre
        }`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${shareText} ${movieUrl}`
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          movieUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          movieUrl
        )}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(
          movieUrl
        )}&title=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    onOpenChange(false);
  };

  const copyToClipboard = async () => {
    
    try {
      await navigator.clipboard.writeText(movieUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl p-6 max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            Share &ldquo;{movie?.title}&rdquo;
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 my-6">
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

        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl backdrop-blur-lg font-medium"
        >
          📋 Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
