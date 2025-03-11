"use client";

import { usePathname } from "next/navigation";

export function useHideNavbar() {
  const pathname = usePathname();
  const hiddenNavRoutes = ["/ceo-dashboard", "/manager-dashboard","employe-dashboard"];

  return hiddenNavRoutes.includes(pathname);
}
 