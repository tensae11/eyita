import { Video } from "lucide-react";
import { ModeToggle } from "./ui/theme-toggler";
import { Separator } from "./ui/separator";

export default function Header({ title = "Movie Stream" }: { title?: string }) {
  return (
    <>
      <header className="flex flex-row md:flex-row justify-between items-center p-6 gap-4 md:gap-0 dark:bg-black/80 backdrop-blur-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex gap-2 items-center text-2xl font-semibold text-yellow-400">
            <Video className="h-6 w-6" />
            <h1 className="text-lg sm:text-xl">{title}</h1>
          </div>
        </div>

        <ModeToggle />
      </header>
      <Separator className="border-white/10" />
    </>
  );
}
