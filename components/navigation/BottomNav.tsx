"use client"

import { Search, Home, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "search", icon: Search, label: "Search" },
    { id: "home", icon: Home, label: "Home" },
    { id: "category", icon: Grid, label: "Category" },
  ]

  const handleNavClick = (pageId: string) => {
    console.log(`Navigating to: ${pageId}`)
    onNavigate(pageId)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 z-30">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <Button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 transition-colors ${
                isActive ? "text-yellow-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
