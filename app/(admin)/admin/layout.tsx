import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/app-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { verifyToken } from "@/lib/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) redirect("/login");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Toaster />

      <AppSidebar
        variant="inset"
        user={{
          avatar:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740",
          email: user?.email,
          name: "Admin",
        }}
      />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
