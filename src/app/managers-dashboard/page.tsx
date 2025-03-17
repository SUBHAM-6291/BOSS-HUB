"use client";

import React, { useState } from "react";
import {
  Calendar,
  Home,
  Clock,
  CheckSquare,
  DollarSign,
  CheckCircle,
  MessageCircle,
  Bell,
  RefreshCw,
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
import Dashboard from "@/app/Components/Managers-/Dashboard";
import TeamAttendance from "@/app/Components/Managers-/TeamAttendance";
import HoursManagement from "@/app/Components/Managers-/HoursManagement";
import TaskManagement from "@/app/Components/Managers-/TaskManagement";
import BudgetTracking from "@/app/Components/Managers-/BudgetTracking";
import RequestBudgetIncreases from "@/app/Components/Managers-/RequestBudgetIncreases";
import ApproveHours from "@/app/Components/Managers-/ApproveHours";
import Messaging from "@/app/Components/Managers-/Messaging";
import NotifyEmployees from "@/app/Components/Managers-/NotifyEmployees";
import Schedules from "@/app/Components/Managers-/Schedules";
import ShiftOptimization from "@/app/Components/Managers-/ShiftOptimization";
import SettingsComponent from "@/app/Components/Managers-/SettingsComponent";

interface AppSidebarProps {
  toggleDashboard: () => void;
  toggleTeamAttendance: () => void;
  toggleHoursManagement: () => void;
  toggleTaskManagement: () => void;
  toggleBudgetTracking: () => void;
  toggleRequestBudgetIncreases: () => void;
  toggleApproveHours: () => void;
  toggleMessaging: () => void;
  toggleNotifyEmployees: () => void;
  toggleSchedules: () => void;
  toggleShiftOptimization: () => void;
  toggleSettings: () => void;
}

const sidebarItems = (props: AppSidebarProps) => [
  {
    category: "Management & Monitoring",
    items: [
      { title: "Dashboard", url: "#", icon: Home, onClick: props.toggleDashboard },
      { title: "Team Attendance", url: "#", icon: Calendar, onClick: props.toggleTeamAttendance },
      { title: "Hours Management", url: "#", icon: Clock, onClick: props.toggleHoursManagement },
      { title: "Task Management", url: "#", icon: CheckSquare, onClick: props.toggleTaskManagement },
    ],
  },
  {
    category: "Financials & Approvals",
    items: [
      { title: "Budget Tracking", url: "#", icon: DollarSign, onClick: props.toggleBudgetTracking },
      { title: "Request Budget Increases", url: "#", icon: CheckCircle, onClick: props.toggleRequestBudgetIncreases },
      { title: "Approve Hours", url: "#", icon: CheckCircle, onClick: props.toggleApproveHours },
    ],
  },
  {
    category: "Communication & Alerts",
    items: [
      { title: "Messages", url: "#", icon: MessageCircle, onClick: props.toggleMessaging },
      { title: "Notify Employees", url: "#", icon: Bell, onClick: props.toggleNotifyEmployees },
    ],
  },
  {
    category: "Schedules & Planning",
    items: [
      { title: "Schedules", url: "#", icon: Calendar, onClick: props.toggleSchedules },
      { title: "Shift Optimization", url: "#", icon: RefreshCw, onClick: props.toggleShiftOptimization },
    ],
  },
  {
    category: "Settings",
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
  const [showTeamAttendance, setShowTeamAttendance] = useState(false);
  const [showHoursManagement, setShowHoursManagement] = useState(false);
  const [showTaskManagement, setShowTaskManagement] = useState(false);
  const [showBudgetTracking, setShowBudgetTracking] = useState(false);
  const [showRequestBudgetIncreases, setShowRequestBudgetIncreases] = useState(false);
  const [showApproveHours, setShowApproveHours] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showNotifyEmployees, setShowNotifyEmployees] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);
  const [showShiftOptimization, setShowShiftOptimization] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleTeamAttendance = () => {
    setShowTeamAttendance(!showTeamAttendance);
    setShowDashboard(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleHoursManagement = () => {
    setShowHoursManagement(!showHoursManagement);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleTaskManagement = () => {
    setShowTaskManagement(!showTaskManagement);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleBudgetTracking = () => {
    setShowBudgetTracking(!showBudgetTracking);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleRequestBudgetIncreases = () => {
    setShowRequestBudgetIncreases(!showRequestBudgetIncreases);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleApproveHours = () => {
    setShowApproveHours(!showApproveHours);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleMessaging = () => {
    setShowMessaging(!showMessaging);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleNotifyEmployees = () => {
    setShowNotifyEmployees(!showNotifyEmployees);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleSchedules = () => {
    setShowSchedules(!showSchedules);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowShiftOptimization(false);
    setShowSettings(false);
  };

  const toggleShiftOptimization = () => {
    setShowShiftOptimization(!showShiftOptimization);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowDashboard(false);
    setShowTeamAttendance(false);
    setShowHoursManagement(false);
    setShowTaskManagement(false);
    setShowBudgetTracking(false);
    setShowRequestBudgetIncreases(false);
    setShowApproveHours(false);
    setShowMessaging(false);
    setShowNotifyEmployees(false);
    setShowSchedules(false);
    setShowShiftOptimization(false);
  };

  return (
    <div className="">
      <AppSidebar
        toggleDashboard={toggleDashboard}
        toggleTeamAttendance={toggleTeamAttendance}
        toggleHoursManagement={toggleHoursManagement}
        toggleTaskManagement={toggleTaskManagement}
        toggleBudgetTracking={toggleBudgetTracking}
        toggleRequestBudgetIncreases={toggleRequestBudgetIncreases}
        toggleApproveHours={toggleApproveHours}
        toggleMessaging={toggleMessaging}
        toggleNotifyEmployees={toggleNotifyEmployees}
        toggleSchedules={toggleSchedules}
        toggleShiftOptimization={toggleShiftOptimization}
        toggleSettings={toggleSettings}
      />
      <main className="flex-1">
        <div className="flex justify-end p-3 fixed top-0 right-0">
          <ModeToggle />
        </div>
        <div className="pt-16">
          {showDashboard && <Dashboard />}
          {showTeamAttendance && <TeamAttendance />}
          {showHoursManagement && <HoursManagement />}
          {showTaskManagement && <TaskManagement />}
          {showBudgetTracking && <BudgetTracking />}
          {showRequestBudgetIncreases && <RequestBudgetIncreases />}
          {showApproveHours && <ApproveHours />}
          {showMessaging && <Messaging />}
          {showNotifyEmployees && <NotifyEmployees />}
          {showSchedules && <Schedules />}
          {showShiftOptimization && <ShiftOptimization />}
          {showSettings && <SettingsComponent />}
        </div>
      </main>
    </div>
  );
}