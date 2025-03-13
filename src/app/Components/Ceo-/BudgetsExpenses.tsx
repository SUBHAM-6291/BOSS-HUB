import React from 'react'
import { FaMoneyBillWave } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"

// Static data for money burn and expenses
const budgetData = [
  { month: "January", burn: 25000, expenses: 18000 },
  { month: "February", burn: 22000, expenses: 19000 },
  { month: "March", burn: 28000, expenses: 20000 },
  { month: "April", burn: 30000, expenses: 17000 },
  { month: "May", burn: 26000, expenses: 21000 },
  { month: "June", burn: 24000, expenses: 19500 },
]

const BudgetsExpenses = () => {
  return (
    <div className="p-6">
      <Card className="w-full max-w-4xl mx-auto h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FaMoneyBillWave className="text-[#FF4500]" />
            Money Burn & Expenses
          </CardTitle>
          <CardDescription>Monthly Overview - January to June 2025</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ChartContainer config={{}}>
            <BarChart data={budgetData}>
              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tickFormatter={(value) => value.slice(0, 3)} 
                stroke="#666" 
              />
              <YAxis stroke="#666" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="burn" 
                fill="#FF4500" // OrangeRed for money burn
                radius={4}
                name="Money Burn"
              >
                <LabelList 
                  dataKey="burn" 
                  position="top" 
                  formatter={(value:any) => `$${value.toLocaleString()}`} 
                  fill="#FF4500"
                />
              </Bar>
              <Bar 
                dataKey="expenses" 
                fill="#4682B4" // SteelBlue for expenses
                radius={4}
                name="Expenses"
              >
                <LabelList 
                  dataKey="expenses" 
                  position="top" 
                  formatter={(value:any) => `$${value.toLocaleString()}`} 
                  fill="#4682B4"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default BudgetsExpenses