import { AdFormProps } from "@/lib/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputFile } from "./app-upload-input";
import { toBase64 } from "@/lib/utils";
import apiClient from "@/lib/service/api-client";

export default function AdCreateDialog({
  onCreate,
}: {
  onCreate: (data: AdFormProps) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reset, register, handleSubmit, setValue, watch } = useForm<AdFormProps>();
    const imageUrl = watch('image');


  const handleFormSubmit = (data: AdFormProps) => {
    onCreate(data);
    setOpen(false);
    reset();
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);

    apiClient
      .post("/upload", { file: base64 })
      .then(({ data }) => setValue("image", data.url));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-amber-400 p-2 rounded-md cursor-pointer text-sm font-medium shadow-xs hover:bg-amber-500 transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Create Ad
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Ad</DialogTitle>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-5  p-10"
          >
            <Input placeholder="Ad Title" {...register("title")} />
            <InputFile onUpload={handleUpload} />
            <Input placeholder="Ad Target URL" {...register("targetUrl")} />
            <Input placeholder="Ad Subtitle" {...register("subtitle")} />

            <Button disabled={!imageUrl} type="submit">
              Create
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
