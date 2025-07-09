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
import { Trash } from "lucide-react";
import { CreateTagForm, EditTagForm } from "@/lib/interface";
import useMovieApi from "@/hooks/use-movie-api";
import { handleError } from "@/lib/utils";
import CreateTagDialog from "@/components/tags/app-create-dialog";
import EditTagDialog from "@/components/tags/app-edit-dialog";
import tagService from "@/lib/service/tag-service";

export default function Category() {
  const { tags, setTags } = useMovieApi();

  const handleEdit = ({ value, id }: EditTagForm) => {
    if (id === undefined) return;
    const oldTags = [...tags];
    setTags((old) =>
      old.map((v) =>
        v.id === id ? { ...v, value: value, label: value.toLowerCase() } : v
      )
    );
    const data = {
      id,
      value,
      label: value,
    };
    tagService
      .update(data)
      .catch(handleError("Error updating tag", () => setTags(oldTags)));
  };
  const handleDelete = (id?: string) => {
    if (id === undefined) return;
    const oldTags = [...tags];
    setTags((prev) => prev.filter((category) => category.id !== id));
    tagService
      .delete(id)
      .catch(handleError("Error deleting tag", () => setTags(oldTags)));
  };

  const handleCreate = ({ value }: CreateTagForm) => {
    const oldTags = [...tags];

    const newTag = {
      value,
      label: value.toLowerCase(),
    };
    setTags((old) => [...old, { ...newTag }]);
    tagService
      .create<CreateTagForm>(newTag)
      .catch(handleError("Error creating tag", () => setTags(oldTags)));
  };

  return (
    <div className="p-6 space-y-3">
      <CreateTagDialog onCreate={handleCreate} />
      <Table className="rounded-3xl">
        <TableCaption>Saved Tags</TableCaption>
        <TableHeader className="bg-gray-600">
          <TableRow>
            <TableHead className="w-[80px]">Id</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-center" colSpan={2}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id} className="cursor-pointer">
              <TableCell className="w-[50px]">{tag.id}</TableCell>
              <TableCell>{tag.value}</TableCell>
              <TableCell
                className="text-center flex justify-around"
                colSpan={2}
              >
                <EditTagDialog
                  data={{
                    id: tag.id,
                    value: tag.value,
                  }}
                  onUpdate={handleEdit}
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(tag.id)}
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
