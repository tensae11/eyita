import { CreateTagForm } from "@/lib/interface";
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

export default function CreateTagDialog({
  onCreate,
}: {
  onCreate: (data: CreateTagForm) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<CreateTagForm>();

  const handleFormSubmit = (data: CreateTagForm) => {
    onCreate(data);
    setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-amber-500 cursor-pointer text-white px-4 py-2 rounded">
        Create Tag
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Tag" {...register("value")} />

            <Button type="submit">Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
