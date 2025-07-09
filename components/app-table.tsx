import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdItem, MovieInterface } from "@/lib/interface";
import { ChartArea, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AppTable({
  movies,
}: {
  movies: (MovieInterface | AdItem)[];
}) {
  return (
    <Table>
      <TableCaption>Weekly top viewed Content</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Views</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies
          .filter((item): item is MovieInterface => item.type === "video")
          .map((movieItem, index) => (
            <TableRow key={movieItem.id} className="cursor-pointer">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={movieItem.thumbnail}
                  alt={movieItem.title}
                  width={100}
                  height={60}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{movieItem.title}</TableCell>
              <TableCell>{movieItem.views}</TableCell>
              <TableCell className="flex items-center space-x-2 justify-between content-centers h-[60px]">
                <Link
                  href={`/admin/analytics/${movieItem.id}`}
                  className="text-blue-500 hover:underline"
                >
                  <ChartArea />
                </Link>
                <Link href={`/video/${movieItem.id}`}>
                  <Play />
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
