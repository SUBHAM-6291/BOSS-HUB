"use client";

import React, { useState } from "react";
import {
  Home,
  Clock,
  DollarSign,
  MessageCircle,
  Bell,
  Phone,
  FileText,
  CheckSquare,
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
import Dashboard from "@/app/Components/Employess-/Dashboard";
import OvertimeRequests from "@/app/Components/Employess-/OvertimeRequests";
import SalaryCheck from "@/app/Components/Employess-/SalaryCheck";
import BudgetRequests from "@/app/Components/Employess-/BudgetRequests";
import Messaging from "@/app/Components/Employess-/Messaging"
import Alerts from "@/app/Components/Employess-/Alerts";
import CEODirectLine from "@/app/Components/Employess-/CEODirectLine";
import PerformanceReports from "@/app/Components/Employess-/PerformanceReports";
import TaskAssignments from "@/app/Components/Employess-/TaskAssignments";
import SettingsComponent from "@/app/Components/Employess-/SettingsComponent";

interface AppSidebarProps {
  toggleDashboard: () => void;
  toggleOvertimeRequests: () => void;
  toggleSalaryCheck: () => void;
  toggleBudgetRequests: () => void;
  toggleMessaging: () => void;
  toggleAlerts: () => void;
  toggleCEODirectLine: () => void;
  togglePerformanceReports: () => void;
  toggleTaskAssignments: () => void;
  toggleSettings: () => void;
}

const sidebarItems = (props: AppSidebarProps) => [
  {
    category: "Daily Check",
    items: [
      { title: "Dashboard", url: "#", icon: Home, onClick: props.toggleDashboard },
      { title: "Overtime Requests", url: "#", icon: Clock, onClick: props.toggleOvertimeRequests },
      { title: "Salary Check", url: "#", icon: DollarSign, onClick: props.toggleSalaryCheck },
    ],
  },
  {
    category: "Money Needs",
    items: [
      { title: "Budget Requests", url: "#", icon: DollarSign, onClick: props.toggleBudgetRequests },
    ],
  },
  {
    category: "Stay in Touch",
    items: [
      { title: "Messages", url: "#", icon: MessageCircle, onClick: props.toggleMessaging },
      { title: "Alerts", url: "#", icon: Bell, onClick: props.toggleAlerts },
      { title: "CEO Direct Line", url: "#", icon: Phone, onClick: props.toggleCEODirectLine },
    ],
  },
  {
    category: "Team Results",
    items: [
      { title: "Performance Reports", url: "#", icon: FileText, onClick: props.togglePerformanceReports },
    ],
  },
  {
    category: "Work Flow",
    items: [
      { title: "Task Assignments", url: "#", icon: CheckSquare, onClick: props.toggleTaskAssignments },
    ],
  },
  {
    category: "My Options",
    items: [
      { title: "Settings", url: "#", icon: Settings, onClick: props.toggleSettings },
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
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppSidebar(props: AppSidebarProps) {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-white" : "text-gray-700";
  const iconColor = theme === "dark" ? "text-white" : "text-gray-600";
  const headingColor = theme === "dark" ? "text-white" : "text-gray-800";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  const items = sidebarItems(props);

  return (
    <div>
      <Sidebar className={`w-64 h-screen ${bgColor} border-r`}>
        <SidebarContent className="p-4">
          {items.map((group) => (
            <SidebarGroup key={group.category}>
              <SidebarGroupLabel className={`text-lg font-semibold ${headingColor} mb-3`}>
                {group.category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-1">
                      <SidebarMenuButton
                        asChild
                        className={`w-full flex items-center p-2 rounded-lg ${textColor} ${hoverBgColor} transition-all`}
                        onClick={item.onClick}
                      >
                        <a href={item.url} className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 ${iconColor}`} />
                          <span className={`font-medium ${textColor}`}>{item.title}</span>
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
  const [showDashboard, setShowDashboard] = useState(true);
  const [showOvertimeRequests, setShowOvertimeRequests] = useState(false);
  const [showSalaryCheck, setShowSalaryCheck] = useState(false);
  const [showBudgetRequests, setShowBudgetRequests] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showCEODirectLine, setShowCEODirectLine] = useState(false);
  const [showPerformanceReports, setShowPerformanceReports] = useState(false);
  const [showTaskAssignments, setShowTaskAssignments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleOvertimeRequests = () => {
    setShowOvertimeRequests(!showOvertimeRequests);
    setShowDashboard(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleSalaryCheck = () => {
    setShowSalaryCheck(!showSalaryCheck);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleBudgetRequests = () => {
    setShowBudgetRequests(!showBudgetRequests);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleMessaging = () => {
    setShowMessaging(!showMessaging);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleCEODirectLine = () => {
    setShowCEODirectLine(!showCEODirectLine);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const togglePerformanceReports = () => {
    setShowPerformanceReports(!showPerformanceReports);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowTaskAssignments(false);
    setShowSettings(false);
  };

  const toggleTaskAssignments = () => {
    setShowTaskAssignments(!showTaskAssignments);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowDashboard(false);
    setShowOvertimeRequests(false);
    setShowSalaryCheck(false);
    setShowBudgetRequests(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCEODirectLine(false);
    setShowPerformanceReports(false);
    setShowTaskAssignments(false);
  };

  return (
    <div className="">
      <AppSidebar
        toggleDashboard={toggleDashboard}
        toggleOvertimeRequests={toggleOvertimeRequests}
        toggleSalaryCheck={toggleSalaryCheck}
        toggleBudgetRequests={toggleBudgetRequests}
        toggleMessaging={toggleMessaging}
        toggleAlerts={toggleAlerts}
        toggleCEODirectLine={toggleCEODirectLine}
        togglePerformanceReports={togglePerformanceReports}
        toggleTaskAssignments={toggleTaskAssignments}
        toggleSettings={toggleSettings}
      />
      <main className="flex-1">
        <div className="flex justify-end p-3 fixed top-0 right-0">
          <ModeToggle />
        </div>
        <div className="pt-16">
          {showDashboard && <Dashboard />}
          {showOvertimeRequests && <OvertimeRequests />}
          {showSalaryCheck && <SalaryCheck />}
          {showBudgetRequests && <BudgetRequests />}
          {showMessaging && <Messaging />}
          {showAlerts && <Alerts />}
          {showCEODirectLine && <CEODirectLine />}
          {showPerformanceReports && <PerformanceReports />}
          {showTaskAssignments && <TaskAssignments />}
          {showSettings && <SettingsComponent />}
        </div>
      </main>
    </div>
  );
}