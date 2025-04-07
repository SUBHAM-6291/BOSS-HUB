import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

const employeeData = [
  { name: 'Week 1', employees: 65, you: 78 },
  { name: 'Week 2', employees: 72, you: 85 },
  { name: 'Week 3', employees: 68, you: 82 },
  { name: 'Week 4', employees: 70, you: 88 },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-black border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-8 w-64 bg-black border-gray-800 text-white placeholder-gray-500" 
                placeholder="Search..."
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Bell className="h-6 w-6" />
          </Button>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Employee Performance Card */}
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Employee Performance</CardTitle>
                <CardDescription className="text-gray-500">Average team performance this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">68.75%</div>
              </CardContent>
            </Card>

            {/* Your Performance Card */}
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Performance</CardTitle>
                <CardDescription className="text-gray-500">Your performance this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">83.25%</div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="md:col-span-2 bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Comparison</CardTitle>
                <CardDescription className="text-gray-500">Weekly performance metrics for March</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="name" stroke="#666666" />
                      <YAxis stroke="#666666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: 'none',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="employees" fill="#60a5fa" name="Team Average" />
                      <Bar dataKey="you" fill="#34d399" name="Your Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;