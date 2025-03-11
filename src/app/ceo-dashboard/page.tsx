"use client";

import React from "react";
import { Calendar, Home, Inbox, Search, Settings, Users, BarChart, DollarSign, Bell, FileText, CheckCircle, MessageCircle } from "lucide-react";
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

export function AppSidebar() {
  return (
    <Sidebar className="w-64 h-screen bg-gray-50 border-r">
      <SidebarContent className="p-4">
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.category}>
            <SidebarGroupLabel className="text-lg font-semibold text-gray-800 mb-3">
              {group.category}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-1">
                    <SidebarMenuButton
                      asChild
                      className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <a href={item.url} className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">
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
  );
}

export default function Page() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 p-6"> {/* Placeholder for content */}
        <h1 className="text-xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}
