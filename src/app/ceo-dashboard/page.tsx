"use client";

import React, { useState } from "react";
import {
  Calendar,
  Home,
  Users,
  BarChart,
  DollarSign,
  CheckCircle,
  MessageCircle,
  Bell,
  FileText,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Guage from "@/app/Components/Ceo-/Guage";
import Managers from "@/app/Components/Ceo-/Managers";
import Attendence from "@/app/Components/Ceo-/Attendence"; // Fixed spelling in import

const sidebarItems = [
  {
    category: "Management & Monitoring",
    items: [
      { title: "Dashboard", url: "#", icon: Home },
      { title: "Managers", url: "#", icon: Users },
      { title: "Attendance", url: "#", icon: Calendar },
      { title: "Performance", url: "#", icon: BarChart },
    ],
  },
  {
    category: "Financials & Approvals",
    items: [
      { title: "Budgets & Expenses", url: "#", icon: DollarSign },
      { title: "Payroll Forecast", url: "#", icon: BarChart },
      { title: "Approvals", url: "#", icon: CheckCircle },
    ],
  },
  {
    category: "Communication & Alerts",
    items: [
      { title: "Messaging", url: "#", icon: MessageCircle },
      { title: "Alerts", url: "#", icon: Bell },
    ],
  },
  {
    category: "Reports & Analytics",
    items: [
      { title: "Reports", url: "#", icon: FileText },
      { title: "Company Overview", url: "#", icon: BarChart },
    ],
  },
  {
    category: "Admin & Settings",
    items: [
      { title: "User Management", url: "#", icon: Users },
      { title: "Settings", url: "#", icon: Settings },
    ],
  },
];

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-auto" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppSidebar({ 
  toggleGauge, 
  toggleManagers,
  toggleAttendance // Added new prop
}: { 
  toggleGauge: () => void;
  toggleManagers: () => void;
  toggleAttendance: () => void; // Added new prop type
}) {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-white" : "text-gray-700";
  const iconColor = theme === "dark" ? "text-white" : "text-gray-600";
  const headingColor = theme === "dark" ? "text-white" : "text-gray-800";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  return (
    <div>
      <Sidebar className={`w-64 h-screen ${bgColor} border-r`}>
        <SidebarContent className="p-4">
          {sidebarItems.map((group) => (
            <SidebarGroup key={group.category}>
              <SidebarGroupLabel
                className={`text-lg font-semibold ${headingColor} mb-3`}
              >
                {group.category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-1">
                      <SidebarMenuButton
                        asChild
                        className={`w-full flex items-center p-2 rounded-lg ${textColor} ${hoverBgColor} transition-all`}
                        onClick={
                          item.title === "Dashboard" 
                            ? toggleGauge 
                            : item.title === "Managers" 
                            ? toggleManagers 
                            : item.title === "Attendance"
                            ? toggleAttendance // Added attendance toggle
                            : undefined
                        }
                      >
                        <a href={item.url} className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 ${iconColor}`} />
                          <span className={`font-medium ${textColor}`}>
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default function Page() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const [showGauge, setShowGauge] = useState(true);
  const [showManagers, setShowManagers] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); // Fixed naming

  const toggleGauge = () => {
    setShowGauge(!showGauge);
    setShowManagers(false);
    setShowAttendance(false); // Fixed naming
  };

  const toggleManagers = () => {
    setShowManagers(!showManagers);
    setShowGauge(false);
    setShowAttendance(false); // Fixed naming
  };

  const toggleAttendance = () => { // Fixed naming and spelling
    setShowAttendance(!showAttendance);
    setShowManagers(false);
    setShowGauge(false);
  };

  return (
    <div className="">
      <AppSidebar 
        toggleGauge={toggleGauge} 
        toggleManagers={toggleManagers}
        toggleAttendance={toggleAttendance} // Added new prop
      />
      <main className="">
        <div className="flex justify-end p-3 fixed top-0 right-0">
          <ModeToggle />
        </div>
        <div className="p-6">
          {showGauge && <Guage />}
          {showManagers && <Managers />}
          {showAttendance && <Attendence />} {/* Fixed naming and condition */}
        </div>
      </main>
    </div>
  );
}