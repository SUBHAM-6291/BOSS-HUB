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
import { FaRobot } from "react-icons/fa";
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
import AiSuggestion from "../Components/Ceo-/AiSuggestion";

interface AppSidebarProps {
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
}

const sidebarItems = (props: AppSidebarProps) => [
  {
    category: "Management & Monitoring",
    items: [
      { title: "Dashboard", url: "#", icon: Home, onClick: props.toggleGauge },
      { title: "Managers", url: "#", icon: Users, onClick: props.toggleManagers },
      { title: "Attendance", url: "#", icon: Calendar, onClick: props.toggleAttendance },
      { title: "Performance", url: "#", icon: BarChart, onClick: props.togglePerformance },
    ],
  },
  {
    category: "Financials & Approvals",
    items: [
      { title: "Budgets & Expenses", url: "#", icon: DollarSign, onClick: props.toggleBudgetsExpenses },
      { title: "AI Insights", url: "#", icon: FaRobot, onClick: props.togglePayrollForecast },
      { title: "Approvals", url: "#", icon: CheckCircle, onClick: props.toggleApprovals },
    ],
  },
  {
    category: "Communication & Alerts",
    items: [
      { title: "Messaging", url: "#", icon: MessageCircle, onClick: props.toggleMessaging },
      { title: "Alerts", url: "#", icon: Bell, onClick: props.toggleAlerts },
    ],
  },
  {
    category: "Reports & Analytics",
    items: [
      { title: "Reports", url: "#", icon: FileText, onClick: props.toggleReports },
      { title: "Company Overview", url: "#", icon: BarChart, onClick: props.toggleCompanyOverview },
    ],
  },
  {
    category: "Admin & Settings",
    items: [
      { title: "User Management", url: "#", icon: Users, onClick: props.toggleUserManagement },
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
      <main className="flex-1">
        <div className="flex justify-end p-3 fixed top-0 right-0">
          <ModeToggle />
        </div>
        <div className="pt-16">
          {showGauge && <Guage />}
          {showManagers && <Managers />}
          {showAttendance && <Attendence />}
          {showPerformance && <Performance />}
          {showBudgetsExpenses && <BudgetsExpenses />}
          {showPayrollForecast && <AiSuggestion />}
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