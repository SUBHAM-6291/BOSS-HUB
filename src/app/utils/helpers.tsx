"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Navbar from "@/app/Components/Navbar";


export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCeoDashboard = pathname === "/ceo-dashboard";

  return (
    <SidebarProvider>
      {isCeoDashboard && <AppSidebar />}
      <main>
        {!isCeoDashboard && <Navbar />}
        {isCeoDashboard && <SidebarTrigger />}
        {children}
      </main>
    </SidebarProvider>
  );
}