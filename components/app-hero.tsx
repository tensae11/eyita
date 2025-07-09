import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import useAds from "@/hooks/use-ads";
import Link from "next/link";

export default function HeroSection() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const { ads } = useAds();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  return (
    <div className="px-2 mb-8">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
        >
          {ads.map((ad, index) => (
            <Link
              href={ad.targetUrl}
              key={ad.id}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-full"
            >
              <Card className="p-0 overflow-hidden">
                <div className="h-28 rounded-t-xl relative overflow-hidden">
                  <Image
                    src={ad.image || "/placeholder.svg"}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1">
                    <span className="text-white text-xs font-medium">
                      {index + 1}/{ads.length}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAdIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAdIndex
                  ? "bg-yellow-400 w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
