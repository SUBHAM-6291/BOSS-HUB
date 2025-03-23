import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Bell } from "lucide-react"

const Alerts = () => {
  return (
    <div className="bg-black min-h-screen p-6 flex items-center justify-center">
      <Card className="bg-black border-white/10 max-w-md w-full">
        <CardHeader>
          <h1 className="text-3xl font-bold text-white text-center">Alerts</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Bell className="w-16 h-16 text-white/70" />
          <p className="text-white/90 text-lg font-semibold">Coming Soon</p>
          <p className="text-white/70 text-center">
            Stay informed with alerts sent directly by your manager. This feature is in development—check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Alerts