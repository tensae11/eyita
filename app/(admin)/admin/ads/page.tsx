"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Trash } from "lucide-react";
import { AdFormProps, BannerAd } from "@/lib/interface";
import { v4 } from "uuid";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";
import useAds from "@/hooks/use-ads";
import adsService from "@/lib/service/ads-service";
import AdEditDialog from "@/components/ads/app-edit-dialog";
import AdCreateDialog from "@/components/ads/app-create-dialog";

export default function AdPage() {
  const { ads, setAds } = useAds();

  const handleDelete = async (id: string) => {
    const oldAds = [...ads];

    setAds((prev) => prev.filter((ad) => ad.id !== id));

    adsService
      .delete(id)
      .then(() => toast.success("Ad deleted successfully"))
      .catch(handleError("Failed to delete ad: ", () => setAds(oldAds)));
  };

  const handleUpdate = async (id: string, data: AdFormProps) => {
    const oldAds = [...ads];

    const foundAd = ads.find((v) => v.id === id) as BannerAd;

    setAds((old) =>
      old.map((v) => (v.id === foundAd?.id ? { ...v, ...data } : v))
    );

    adsService
      .update<BannerAd>({ ...foundAd, ...data })
      .then(() => toast.success("Ad updated successfully"))
      .catch(handleError("Failed to update ad: ", () => setAds(oldAds)));
  };

  const createAd = async (data: AdFormProps) => {
    const oldAds = [...ads];

    const newAd: BannerAd = {
      type: "ad",
      ...data,
      id: v4(),
    };
    setAds((old) => [newAd, ...old]);

    adsService
      .create(newAd)
      .then(() => toast.success("Ad Added successfully"))
      .catch(handleError("Failed to add ad", () => setAds(oldAds)));
  };
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <AdCreateDialog onCreate={createAd} />
      <Table className="mt-6 w-full table-fixed">
        <TableCaption>Ads Hosted to our Platform</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((ad, index) => (
            <TableRow key={`${ad.title}-${index}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={ad.image}
                  alt={ad.title}
                  width={100}
                  height={60}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{ad.title}</TableCell>

              <TableCell className="flex items-center justify-center gap-2">
                <AdEditDialog
                  data={ad}
                  onUpdate={(data) => handleUpdate(ad.id, data)}
                />
                <Button
                  onClick={() => handleDelete(ad.id)}
                  variant="destructive"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
