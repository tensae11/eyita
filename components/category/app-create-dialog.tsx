import { CreateFormProps } from "@/lib/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateDialog({
  onCreate,
}: {
  onCreate: (data: CreateFormProps) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<CreateFormProps>();

  const handleFormSubmit = (data: CreateFormProps) => {
    onCreate(data);
    setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-amber-500 cursor-pointer text-white px-4 py-2 rounded">
        Create Category
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Category" {...register("name")} />

            <Button type="submit">Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
