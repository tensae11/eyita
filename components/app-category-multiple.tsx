import { CategoryType } from "@/lib/interface";
import { Button } from "./ui/button";

export function MultipleCategory({
  category,
  categoryList,
  onClick,
}: {
  category: string[];
  categoryList: CategoryType[];
  onClick: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-3 overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-thin scrollbar-thumb-yellow-400"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {categoryList.map(({ id, name }) => {
        const isSelected = category.includes(id);
        return (
          <Button
            key={id}
            onClick={() => onClick(id)}
            variant={isSelected ? "default" : "outline"}
            className={`rounded-xl font-medium snap-start min-w-max hover:bg-yellow-400 ${
              isSelected
                ? "bg-yellow-400 text-black hover:bg-yellow-500 border-0"
                : "bg-white/10 border-black/20 dark:text-white text-black backdrop-blur-lg"
            }`}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}
