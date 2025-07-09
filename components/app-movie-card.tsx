import { MovieInterface } from "@/lib/interface";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({
  title,
  year,
  rating,
  genre,
  thumbnail,
  views,
  id,
}: MovieInterface) {
  return (
    <Link
      prefetch={false}
      href={`/video/${id}`}
      className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-2xl"
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      {/* Top-right Rating */}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-yellow-400 text-xs px-3 py-1 rounded-full font-semibold z-10">
        ★ {rating}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-3 bg-black/40 backdrop-blur-md text-white z-10">
        <div className="flex justify-between items-end">
          <div className="overflow-hidden">
            <h3 className="text-base font-bold leading-tight truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-300">{year}</p>
          </div>
          <p className="text-sm text-orange-400 font-medium truncate">
            {genre}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-300 mt-2">
          <Eye className="w-3 h-3" />
          {views}
        </div>
      </div>
    </Link>
  );
}
