import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

export function InputFile({
  onUpload,
}: {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid w-full items-center gap-3">
      <Input
        id="picture"
        type="file"
        onChange={onUpload}
        className="w-full"
        accept="image/*"
      />
    </div>
  );
}
