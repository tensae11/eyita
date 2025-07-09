import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { CategoryType, VideoFormData } from "@/lib/interface";
import MultipleSelectorDefault from "./video/app-tag-selector";
import { Option } from "./ui/multiple-selector";

interface Props {
  onUpdate: (data: VideoFormData) => void;
  video: VideoFormData;
  categories: CategoryType[];
  tags: Option[];
}

export default function EditDialog({
  tags,
  categories,
  onUpdate,
  video,
}: Props) {
  const { handleSubmit, reset, register, setValue, watch, control } =
    useForm<VideoFormData>({
      defaultValues: video,
    });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      reset({
        ...video,
        tags: video.tags,
      });
    }
  }, [open, video, reset]);

  const handleFormSubmit = (data: VideoFormData) => {
    onUpdate(data);
    setOpen(false);
    reset(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="size-9 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium shadow-xs bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Pen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogDescription>
            {video.title} - {video.videoId}
          </DialogDescription>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Movie Title" {...register("title")} />
            <Select
              onValueChange={(value) => setValue("category", value)}
              value={watch("category")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category, i) => (
                    <SelectItem key={i} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <MultipleSelectorDefault
                  tags={tags}
                  value={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            <Input
              placeholder="Video Id (Eg. 7REO_s4r5MY)"
              {...register("videoId")}
            />

            <Input placeholder="Year" {...register("year")} />
            <Input placeholder="Genre" {...register("genre")} />
            <Input placeholder="Rating" {...register("rating")} />
            <Button type="submit">Update</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
