"use client";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/lib/interface";

export default function CategoryTabs({
  selected,
  onSelect,
  category,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  category: CategoryType[];
}) {
  return (
    <div className="my-4 overflow-hidden">
      <div
        className="
          flex items-center gap-3 w-full
          overflow-x-auto
          whitespace-nowrap
          scroll-smooth
          scrollbar-thin scrollbar-thumb-yellow-400
          snap-x snap-mandatory
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {category.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            variant="ghost"
            className={`min-w-fit px-4 py-2 rounded-xl font-medium snap-start ${
              selected === cat.id
                ? "bg-yellow-400 text-black dark:text-white"
                : "bg-black/5 dark:bg-white/10 text-black dark:text-white"
            }`}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
