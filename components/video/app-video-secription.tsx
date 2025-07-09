import { useState } from "react";

export default function MovieDescription({
  description,
}: {
  description?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  if (!description) return null;

  return (
    <div className="space-y-2">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-[1000px]" : "max-h-16"
        }`}
      >
        <p className="text-sm text-white/80 whitespace-pre-wrap">
          {description}
        </p>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-400 underline text-xs"
      >
        {expanded ? "Show less ▲" : "Show more ▼"}
      </button>
    </div>
  );
}
