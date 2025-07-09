"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
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
import { Controller, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { CategoryType, VideoFormData } from "@/lib/interface";
import MultipleSelectorDefault from "./video/app-tag-selector";
import { Option } from "./ui/multiple-selector";
import { InputFile } from "./ads/app-upload-input";
import apiClient from "@/lib/service/api-client";
import { toBase64 } from "@/lib/utils";

export default function CreateAlertDialog({
  onSubmitForm,
  categories,
  tags,
}: {
  onSubmitForm: (data: VideoFormData) => void;
  categories: CategoryType[];
  tags: Option[];
}) {
  const { register, handleSubmit, setValue, reset, control, watch } =
    useForm<VideoFormData>({
      defaultValues: {
        tags: [],
      },
    });
  const thumbnailUrl = watch("thumbnail");

  const [open, setOpen] = useState(false);

  const handleFormSubmit = (data: VideoFormData) => {
    onSubmitForm(data);
    setOpen(false);
    reset();
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);

    apiClient
      .post("/upload", { file: base64 })
      .then(({ data }) => setValue("thumbnail", data.url));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-yellow-400 px-10 py-3 rounded text-white font-black hover:bg-yellow-500 cursor-pointer shadow">
          Add Movie
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader className="flex justify-between items-center">
          <AlertDialogTitle>Add New Movie</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 pt-4"
        >
          <Input placeholder="Movie Title" {...register("title")} />

          <Select onValueChange={(value) => setValue("category", value)}>
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
          <InputFile onUpload={handleUpload} />

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
            placeholder="Video Id (e.g. 7REO_s4r5MY)"
            {...register("videoId")}
          />
          <Input placeholder="Year" {...register("year")} />
          <Input placeholder="Genre" {...register("genre")} />
          <Input placeholder="Rating" {...register("rating")} />

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={!thumbnailUrl}>
              Submit
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
