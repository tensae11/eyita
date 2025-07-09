import useMovieApi from "@/hooks/use-movie-api";
import { Button } from "./ui/button";

export function MultipleTags({
  tag,
  onClick,
}: {
  tag: string[];
  onClick: (value: string) => void;
}) {
  const { tags } = useMovieApi();
  return (
    <div
      className="flex gap-3 overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-thin scrollbar-thumb-yellow-400"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {tags.map(({ label, value }, i) => {
        const isSelected = tag.includes(value);
        return (
          <Button
            key={i}
            onClick={() => onClick(value)}
            variant={isSelected ? "default" : "outline"}
            className={`rounded-xl font-medium snap-start min-w-max hover:bg-yellow-400 ${
              isSelected
                ? "bg-yellow-400 text-black hover:bg-yellow-500 border-0"
                : "bg-white/10 border-black/20 dark:text-white text-black backdrop-blur-lg"
            }`}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
