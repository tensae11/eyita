import { BannerAd } from "@/lib/interface";
import adsService from "@/lib/service/ads-service";
import { useEffect, useState } from "react";

export default function useAds() {
  const [ads, setAds] = useState<BannerAd[]>([]);

  useEffect(() => {
    const { cancel, request } = adsService.getAll();
    request
      .then(({ data }) => {
        setAds(data as BannerAd[]);
      })
      .catch((error) => {
        console.error("Error fetching ads:", error);
      });
    return () => cancel();
  }, []);

  return {
    ads,
    setAds,
  };
}
