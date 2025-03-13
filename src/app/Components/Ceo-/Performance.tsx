"use client"

import React from 'react'
import { TrendingUp } from "lucide-react"
import { FaMoneyBillWave, FaUsers, FaBuilding, FaChartPie, FaStar } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList, PieChart, Pie } from "recharts"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  // Static Data Sets with Hardcoded Colors
  const profitLossData = [
    { month: "January", profit: 45000, loss: 12000 },
    { month: "February", profit: 52000, loss: 15000 },
    { month: "March", profit: 38000, loss: 18000 },
    { month: "April", profit: 60000, loss: 10000 },
    { month: "May", profit: 48000, loss: 13000 },
    { month: "June", profit: 55000, loss: 11000 },
  ]

  const activeUsersData = [
    { month: "January", users: 1200 },
    { month: "February", users: 1500 },
    { month: "March", users: 1350 },
    { month: "April", users: 1800 },
    { month: "May", users: 1650 },
    { month: "June", users: 2000 },
  ]

  const revenueSourcesData = [
    { name: "Product Sales", value: 40000, fill: "#8884d8" },
    { name: "Services", value: 30000, fill: "#82ca9d" },
    { name: "Subscriptions", value: 20000, fill: "#ffc658" },
  ]

  const satisfactionData = [
    { month: "January", rating: 4.2 },
    { month: "February", rating: 4.3 },
    { month: "March", rating: 4.1 },
    { month: "April", rating: 4.5 },
    { month: "May", rating: 4.4 },
    { month: "June", rating: 4.6 },
  ]

  const teamPerformanceData = [
    { team: "Sales", performance: 85 },
    { team: "Support", performance: 92 },
    { team: "Development", performance: 78 },
    { team: "Marketing", performance: 88 },
  ]

  const dummyPurchases = [
    { id: 1, name: "Jane Doe", avatar: "/avatars/jane.jpg", purchaseDate: "2025-03-10", amount: "$49.99" },
    { id: 2, name: "John Smith", avatar: "/avatars/john.jpg", purchaseDate: "2025-03-11", amount: "$49.99" },
    { id: 3, name: "Alice Johnson", avatar: "/avatars/alice.jpg", purchaseDate: "2025-03-12", amount: "$49.99" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Profit/Loss Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMoneyBillWave className="text-[#00FF00]" />
            Profit & Loss
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <BarChart data={profitLossData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="profit" fill="#00FF00" radius={4} />
              <Bar dataKey="loss" fill="#FF0000" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Profit up by 12% <TrendingUp className="h-4 w-4 text-[#00FF00]" />
          </div>
        </CardFooter>
      </Card>

      {/* Active Users Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaUsers className="text-[#0000FF]" />
            Active Users
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <BarChart data={activeUsersData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="users" fill="#0000FF" radius={4}>
                <LabelList dataKey="users" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Users up by 15% <TrendingUp className="h-4 w-4 text-[#0000FF]" />
          </div>
        </CardFooter>
      </Card>

      {/* Office & Employees Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBuilding className="text-[#808080]" />
            Company Stats
          </CardTitle>
          <CardDescription>As of March 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-10">
          <div className="flex justify-between text-lg">
            <span className="text-[#808080]">Offices:</span>
            <span className="font-bold">5</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-[#808080]">Employees:</span>
            <span className="font-bold">250</span>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-[#808080]">
          Updated: March 13, 2025
        </CardFooter>
      </Card>

      {/* Revenue Sources Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartPie className="text-[#800080]" />
            Revenue Sources
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <PieChart>
              <Pie
                data={revenueSourcesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm text-[#808080]">
          Total Revenue: $90,000
        </CardFooter>
      </Card>

      {/* Customer Satisfaction Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaStar className="text-[#FFFF00]" />
            Customer Satisfaction
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <BarChart data={satisfactionData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis domain={[0, 5]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rating" fill="#FFFF00" radius={4}>
                <LabelList dataKey="rating" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Rating up by 0.4 <TrendingUp className="h-4 w-4 text-[#FFFF00]" />
          </div>
        </CardFooter>
      </Card>

      {/* Team Performance Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaUsers className="text-[#4B0082]" />
            Team Performance
          </CardTitle>
          <CardDescription>Current Quarter 2025</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="team" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="performance" fill="#4B0082" radius={4}>
                <LabelList dataKey="performance" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm text-[#808080]">
          Average Performance: 85%
        </CardFooter>
      </Card>

      {/* Recent Purchases Card */}
      <Card className="w-full h-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMoneyBillWave className="text-[#008080]" />
            Recent Purchases
          </CardTitle>
          <CardDescription>Latest customer transactions</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] overflow-y-auto">
          <div className="space-y-4">
            {dummyPurchases.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-sm text-[#808080]">{user.purchaseDate}</p>
                </div>
                <p className="text-sm font-medium">{user.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}