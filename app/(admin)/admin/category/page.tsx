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
import { CategoryType, CreateFormProps, DataProps } from "@/lib/interface";
import useMovieApi from "@/hooks/use-movie-api";
import categoryService from "@/lib/service/category-service";
import { handleError } from "@/lib/utils";
import CreateDialog from "@/components/category/app-create-dialog";
import EditDialog from "@/components/category/app-edit-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Category() {
  const { categories, setCategories } = useMovieApi();

  const handleEdit = (data: DataProps) => {
    const oldCategory = [...categories];
    setCategories((old) =>
      old.map((v) => (v.id === data.id ? { ...v, category: data.name } : v))
    );
    categoryService
      .update(data)
      .catch(
        handleError("Error updating category", () => setCategories(oldCategory))
      );
  };
  const handleDelete = (id: string) => {
    const oldCategory = [...categories];
    setCategories((prev) => prev.filter((category) => category.id !== id));
    categoryService
      .delete(id)
      .catch(
        handleError("Error deleting category", () => setCategories(oldCategory))
      );
  };
  const handleCreate = ({ name, home = false }: CreateFormProps) => {
    const oldCategory = [...categories];

    const newCategory = {
      name,
      home,
    };
    setCategories((old) => [
      ...old,
      { ...newCategory, videoCount: 0, totalViews: 0, id: "0" },
    ]);
    categoryService
      .create<CreateFormProps>(newCategory)
      .catch(
        handleError("Error creating category", () => setCategories(oldCategory))
      );
  };

  const handleCheck = (data: CategoryType) => {
    const oldCategory = [...categories];
    const updatedCategory = { ...data, home: !(data.home ?? false) };
    setCategories((old) =>
      old.map((v) => (v.id === data.id ? updatedCategory : v))
    );
    categoryService
      .update(updatedCategory)
      .catch(
        handleError("Error updating category", () => setCategories(oldCategory))
      );
  };
  return (
    <div className="p-6 space-y-3">
      <CreateDialog onCreate={handleCreate} />
      <Table className="rounded-3xl">
        <TableCaption>Saved Categories</TableCaption>
        <TableHeader className="bg-gray-600">
          <TableRow>
            <TableHead className="w-[80px]">Id</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Video Count</TableHead>
            <TableHead>Total Views</TableHead>
            <TableHead>Set to Home</TableHead>
            <TableHead className="text-center" colSpan={2}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="cursor-pointer">
              <TableCell className="w-[50px]">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.videoCount}</TableCell>
              <TableCell>{category.totalViews}</TableCell>
              <TableCell className="m-auto">
                <Checkbox
                  checked={category.home}
                  onCheckedChange={() => handleCheck(category)}
                />
              </TableCell>
              <TableCell
                className="text-center flex justify-around"
                colSpan={2}
              >
                <EditDialog
                  id={category.id}
                  name={category.name}
                  onUpdate={handleEdit}
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
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
