import { BannerAd } from "@/lib/interface";
import Image from "next/image";

export default function AdPoster({ image, title }: BannerAd) {
  return (
    <div className="relative w-full h-[350px] border rounded-lg overflow-hidden shadow-md">
      <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded z-10">
        Ad
      </div>

      <Image
        src={image}
        alt="Ad Poster"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm font-medium">
        {title}
      </div>
    </div>
  );
}
