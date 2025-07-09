import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BannerAd, BannerAdEditProps } from "@/lib/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AdEditDialog({
  data: { id, title, subtitle, image, targetUrl },
  onUpdate,
}: BannerAdEditProps) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<BannerAd>({
    defaultValues: {
      id,
      title,
      subtitle,
      image,
      targetUrl,
    },
  });
  useEffect(() => {
    if (open) {
      reset({
        id,
        title,
        subtitle,
        image,
        targetUrl,
      });
    }
  }, [open, id, title, subtitle, image, targetUrl, reset]);
  const handleFormSubmit = (data: BannerAd) => {
    onUpdate(data);
    setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="size-9 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium shadow-xs bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Pen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ad</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Ad Title" {...register("title")} />
            <Input placeholder="Ad Image URL" {...register("image")} />
            <Input placeholder="Ad Target URL" {...register("targetUrl")} />
            <Input placeholder="Ad Subtitle" {...register("subtitle")} />

            <Button type="submit">Update</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
