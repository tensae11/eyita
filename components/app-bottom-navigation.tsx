"use client";

import Link from "next/link";
import { Home, Search, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Search", icon: Search, href: "/" },
  { name: "Home", icon: Home, href: "/home" },
  { name: "Category", icon: LayoutGrid, href: "/category" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 dark:bg-black/90 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map(({ name, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-1 text-xs font-medium transition-colors px-4 py-2 rounded-lg dark:hover:bg-gray-600 hover:text-black ",
                isActive
                  ? "text-yellow-400 hover:text-yellow-400"
                  : "text-black dark:text-white dark:hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
