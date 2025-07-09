"use client";

import CreateAlertDialog from "@/components/app-drawer";
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
import EditDialog from "@/components/app-dialog";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { MovieInterface, VideoFormData } from "@/lib/interface";
import { v4 } from "uuid";
import useMovieApi from "@/hooks/use-movie-api";
import videoService from "@/lib/service/video-service";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import categoryService from "@/lib/service/category-service";

export default function Video() {
  const { movies, setMovies, categories, tags } = useMovieApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const perPageOptions = [10, 25, 50, 100];
  const videoList = movies.filter(
    (item): item is MovieInterface => item.type === "video"
  );
  const totalPages = Math.ceil(videoList.length / itemsPerPage);
  const paginatedVideos = videoList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const oldVideos = [...movies];

    setMovies((prev) =>
      prev.filter((video) => video.type !== "video" || video.id !== id)
    );

    videoService
      .delete(id)
      .then(() => {
        toast.success("Movie deleted successfully");
        categoryUpdate(0, movies.find((v) => v.id === id)?.category);
      })
      .catch(
        handleError("Failed to delete video: ", () => setMovies(oldVideos))
      );
  };

  const handleUpdate = async (id: string, data: VideoFormData) => {
    const oldVideos = [...movies];

    const foundMovie = movies.find((v) => v.type === "video" && v.id === id) as
      | MovieInterface
      | undefined;

    const updatedVideo: MovieInterface = {
      id,
      ...data,
      tags: data.tags.map((item) => item.value),
      views: foundMovie?.views ?? 0,
      thumbnail:
        foundMovie?.thumbnail ??
        `https://i.ytimg.com/vi/${data.videoId}/maxresdefault.jpg`,
    };

    const oldCategory = foundMovie?.category;
    const newCategory = data.category;

    setMovies((old) =>
      old.map((v) =>
        v.type === "video" && v.id === updatedVideo.id ? updatedVideo : v
      )
    );

    videoService
      .update(updatedVideo)
      .then(() => {
        toast.success("Movie updated successfully");

        if (oldCategory !== newCategory) {
          if (oldCategory) categoryUpdate(0, oldCategory);
          if (newCategory) categoryUpdate(1, newCategory);
        }
      })
      .catch(
        handleError("Failed to update video: ", () => setMovies(oldVideos))
      );
  };

  const addMovie = async (video: VideoFormData) => {
    const oldVideos = [...movies];
    const newTags = video.tags.map((tag) => tag.value);
    const newVideo: MovieInterface = {
      ...video,
      tags: newTags,
      id: v4(),
      views: 0,
      type: "video",
      thumbnail:
        video.thumbnail ??
        `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
    setMovies((old) => [newVideo, ...old]);

    videoService
      .create(newVideo)
      .then(() => {
        toast.success("Movie Added successfully");
        categoryUpdate(1, newVideo.category);
      })
      .catch(handleError("Failed to add movie", () => setMovies(oldVideos)));
  };

  const categoryUpdate = (change: number, name?: string) => {
    if (name === undefined) return;
    const category = categories.find((c) => c.name === name);
    if (!category) return;

    let updatedCount = category.videoCount;
    const id = category.id;

    if (change === 1) {
      updatedCount += 1;
    } else if (change === 0 && updatedCount > 0) {
      updatedCount -= 1;
    }

    categoryService.update({ id, videoCount: updatedCount });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <CreateAlertDialog
        tags={tags}
        onSubmitForm={addMovie}
        categories={categories}
      />

      <div className="overflow-x-auto">
        <Table className="mt-6 w-full table-fixed min-w-[600px]">
          <TableCaption>Videos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Views</TableHead>
              <TableHead className="text-center hidden md:table-cell">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVideos.map((video, idx) => (
              <TableRow key={`${video.title}-${idx}`}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </TableCell>
                <TableCell>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={100}
                    height={60}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <p className="text-wrap">{video.title}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {video.views}
                </TableCell>
                <TableCell className="hidden md:flex items-center justify-center gap-2">
                  <Link
                    href={`/video/${video.id}`}
                    className="size-9 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium shadow-xs bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Eye />
                  </Link>
                  <EditDialog
                    tags={tags}
                    video={{
                      ...video,
                      tags: video.tags.map((tag) => ({
                        value: tag,
                        label: tag,
                      })),
                    }}
                    categories={categories}
                    onUpdate={(data) => handleUpdate(video.id, data)}
                  />
                  <Button
                    onClick={() => handleDelete(video.id)}
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between">
          <div className="flex items-center p-1 space-x-2">
            <p>Select List </p>
            <Select
              onValueChange={(value) => setItemsPerPage(Number(value))}
              defaultValue={String(itemsPerPage)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                {perPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end items-center space-x-2 mt-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
