import { CardProps } from "@/lib/interface";
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from "./ui/card";

const colorMap = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  orange:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export default function StatusCard({
  total,
  percent,
  title,
  color = "blue",
}: CardProps) {
  return (
    <Card className="rounded-2xl shadow-md border border-gray-600 bg-white/30 dark:bg-white/5 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-zinc-700 dark:text-zinc-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row  items-center justify-between space-y-2">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          {total}
        </h1>
        {percent && (
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${colorMap[color]}`}
          >
            {percent} ↑
          </span>
        )}
      </CardContent>
    </Card>
  );
}
