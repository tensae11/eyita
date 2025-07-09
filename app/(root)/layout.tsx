"use client";
import BottomNav from "@/components/app-bottom-navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="min-h-screen pb-24">{children}</div>

      <BottomNav />
    </div>
  );
}
