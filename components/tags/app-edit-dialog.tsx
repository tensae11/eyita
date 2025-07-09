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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditTagForm } from "@/lib/interface";

export default function EditTagDialog({
  data: { id, value },
  onUpdate,
}: {
  data: EditTagForm;
  onUpdate: (data: EditTagForm) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<EditTagForm>({
    defaultValues: {
      id,
      value,
    },
  });
  useEffect(() => {
    if (open) {
      reset({
        value,
        id,
      });
    }
  }, [open, reset, id, value]);
  const handleFormSubmit = ({ id, value }: EditTagForm) => {
    onUpdate({ id, value });
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
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>
            {value} - {id}
          </DialogDescription>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Tag" {...register("value")} />

            <Button type="submit">Update</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
