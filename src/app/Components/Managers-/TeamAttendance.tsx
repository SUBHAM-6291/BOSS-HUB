import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const attendanceData = [
  { name: 'Mon', present: 85, absent: 15 },
  { name: 'Tue', present: 92, absent: 8 },
  { name: 'Wed', present: 78, absent: 22 },
  { name: 'Thu', present: 88, absent: 12 },
  { name: 'Fri', present: 95, absent: 5 },
];

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Developer', attendance: 92, status: 'Present' },
  { id: 2, name: 'Jane Smith', role: 'Designer', attendance: 85, status: 'Absent' },
  { id: 3, name: 'Mike Johnson', role: 'Manager', attendance: 98, status: 'Present' },
  { id: 4, name: 'Sarah Williams', role: 'QA', attendance: 88, status: 'Present' },
];

const chartConfig = {
  present: {
    label: 'Present',
    color: '#22c55e',
  },
  absent: {
    label: 'Absent',
    color: '#ef4444',
  },
};

const TeamAttendance = () => {
  const [weeklyAttendance] = useState(89);

  return (
    <div className="space-y-6 p-4">
      {}
      <Card>
        <CardHeader>
          <CardTitle>Team Attendance Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span>Weekly Attendance</span>
                <span>{weeklyAttendance}%</span>
              </div>
              <Progress value={weeklyAttendance} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="present" fill={chartConfig.present.color} radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill={chartConfig.absent.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={member.attendance} className="w-[100px]" />
                      <span>{member.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.status === 'Present' ? 'default' : 'destructive'}
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAttendance;