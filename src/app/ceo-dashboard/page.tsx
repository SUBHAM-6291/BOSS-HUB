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
import { FaRobot, FaPaperPlane } from "react-icons/fa";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Guage from "@/app/Components/Ceo-/Guage";
import Managers from "@/app/Components/Ceo-/Managers";
import Attendence from "@/app/Components/Ceo-/Attendence";
import Performance from "@/app/Components/Ceo-/Performance";
import BudgetsExpenses from "@/app/Components/Ceo-/BudgetsExpenses";
import Approvals from "@/app/Components/Ceo-/Approvals";
import Messaging from "@/app/Components/Ceo-/Messaging";
import Alerts from "@/app/Components/Ceo-/Alerts";
import Reports from "@/app/Components/Ceo-/Reports";
import CompanyOverview from "@/app/Components/Ceo-/CompanyOverview";
import UserManagement from "@/app/Components/Ceo-/UserManagement";
import SettingsComponent from "@/app/Components/Ceo-/SettingsComponent";

const AiSuggestion = () => {
  return (
    <div className="p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg flex flex-col">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FaRobot className="text-[#1E90FF]" />
            Chat with AI Insights
          </CardTitle>
          <CardDescription className="text-gray-600">
            Talk to our AI for company suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-4 bg-[#F9FAFB]">
          <div className="text-center text-gray-500">
            Start chatting here...
          </div>
        </CardContent>
        <div className="p-4 border-t flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1 border-gray-300"
          />
          <Button className="bg-[#1E90FF] hover:bg-[#1C86EE] text-white">
            <FaPaperPlane />
          </Button>
        </div>
      </Card>
    </div>
  );
};

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
      { title: "AI Insights", url: "#", icon: FaRobot },
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
  toggleAttendance,
  togglePerformance,
  toggleBudgetsExpenses,
  togglePayrollForecast,
  toggleApprovals,
  toggleMessaging,
  toggleAlerts,
  toggleReports,
  toggleCompanyOverview,
  toggleUserManagement,
  toggleSettings,
}: {
  toggleGauge: () => void;
  toggleManagers: () => void;
  toggleAttendance: () => void;
  togglePerformance: () => void;
  toggleBudgetsExpenses: () => void;
  togglePayrollForecast: () => void;
  toggleApprovals: () => void;
  toggleMessaging: () => void;
  toggleAlerts: () => void;
  toggleReports: () => void;
  toggleCompanyOverview: () => void;
  toggleUserManagement: () => void;
  toggleSettings: () => void;
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
                            ? toggleAttendance
                            : item.title === "Performance"
                            ? togglePerformance
                            : item.title === "Budgets & Expenses"
                            ? toggleBudgetsExpenses
                            : item.title === "AI Insights"
                            ? togglePayrollForecast
                            : item.title === "Approvals"
                            ? toggleApprovals
                            : item.title === "Messaging"
                            ? toggleMessaging
                            : item.title === "Alerts"
                            ? toggleAlerts
                            : item.title === "Reports"
                            ? toggleReports
                            : item.title === "Company Overview"
                            ? toggleCompanyOverview
                            : item.title === "User Management"
                            ? toggleUserManagement
                            : item.title === "Settings"
                            ? toggleSettings
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
  const [showAttendance, setShowAttendance] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showBudgetsExpenses, setShowBudgetsExpenses] = useState(false);
  const [showPayrollForecast, setShowPayrollForecast] = useState(false);
  const [showApprovals, setShowApprovals] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showCompanyOverview, setShowCompanyOverview] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleGauge = () => {
    setShowGauge(!showGauge);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleManagers = () => {
    setShowManagers(!showManagers);
    setShowGauge(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleAttendance = () => {
    setShowAttendance(!showAttendance);
    setShowGauge(false);
    setShowManagers(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const togglePerformance = () => {
    setShowPerformance(!showPerformance);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleBudgetsExpenses = () => {
    setShowBudgetsExpenses(!showBudgetsExpenses);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const togglePayrollForecast = () => {
    setShowPayrollForecast(!showPayrollForecast);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleApprovals = () => {
    setShowApprovals(!showApprovals);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleMessaging = () => {
    setShowMessaging(!showMessaging);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleReports = () => {
    setShowReports(!showReports);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleCompanyOverview = () => {
    setShowCompanyOverview(!showCompanyOverview);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowUserManagement(false);
    setShowSettings(false);
  };

  const toggleUserManagement = () => {
    setShowUserManagement(!showUserManagement);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowGauge(false);
    setShowManagers(false);
    setShowAttendance(false);
    setShowPerformance(false);
    setShowBudgetsExpenses(false);
    setShowPayrollForecast(false);
    setShowApprovals(false);
    setShowMessaging(false);
    setShowAlerts(false);
    setShowReports(false);
    setShowCompanyOverview(false);
    setShowUserManagement(false);
  };

  return (
    <div className="">
      <AppSidebar
        toggleGauge={toggleGauge}
        toggleManagers={toggleManagers}
        toggleAttendance={toggleAttendance}
        togglePerformance={togglePerformance}
        toggleBudgetsExpenses={toggleBudgetsExpenses}
        togglePayrollForecast={togglePayrollForecast}
        toggleApprovals={toggleApprovals}
        toggleMessaging={toggleMessaging}
        toggleAlerts={toggleAlerts}
        toggleReports={toggleReports}
        toggleCompanyOverview={toggleCompanyOverview}
        toggleUserManagement={toggleUserManagement}
        toggleSettings={toggleSettings}
      />
      <main className="">
        <div className="flex justify-end p-3 fixed top-0 right-0">
          <ModeToggle />
        </div>
        <div className="">
          {showGauge && <Guage />}
          {showManagers && <Managers />}
          {showAttendance && <Attendence />}
          {showPerformance && <Performance />}
          {showBudgetsExpenses && <BudgetsExpenses />}
          {showPayrollForecast && <AiSuggestion />} {}
          {showApprovals && <Approvals />}
          {showMessaging && <Messaging />}
          {showAlerts && <Alerts />}
          {showReports && <Reports />}
          {showCompanyOverview && <CompanyOverview />}
          {showUserManagement && <UserManagement />}
          {showSettings && <SettingsComponent />}
        </div>
      </main>
    </div>
  );
}