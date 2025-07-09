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
import { DataProps } from "@/lib/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditDialog({
  id,
  name,
  onUpdate,
}: {
  id: string;
  name: string;
  onUpdate: (data: DataProps) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<DataProps>({
    defaultValues: {
      id,
      name,
    },
  });
  useEffect(() => {
    if (open) {
      reset({
        name,
        id,
      });
    }
  }, [open, reset, id, name]);
  const handleFormSubmit = ({ id, name }: DataProps) => {
    onUpdate({ id, name });
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
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            {name} - {id}
          </DialogDescription>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Category" {...register("name")} />

            <Button type="submit">Update</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
