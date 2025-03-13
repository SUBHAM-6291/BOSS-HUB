"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { useState,useMemo } from "react";

const managers = [
    {
      name: "John Smith",
      salary: 120000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 245,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Sarah Johnson",
      salary: 85000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 230,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Michael Brown",
      salary: 125000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 240,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Emily Davis",
      salary: 88000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 235,
      image: "https://images.unsplash.com/photo-1487412723647-8dcaf443e851"
    },
    {
      name: "David Wilson",
      salary: 122000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 248,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Lisa Anderson",
      salary: 86000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 225,
      image: "https://images.unsplash.com/photo-1517841902196-6c0ebfcdd114"
    },
    {
      name: "Robert Taylor",
      salary: 128000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 252,
      image: "https://images.unsplash.com/photo-1522529599102-1a6c08f8e4a4"
    },
    {
      name: "Jennifer Martinez",
      salary: 87000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 228,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Thomas Lee",
      salary: 130000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 246,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3"
    },
    {
      name: "Rachel White",
      salary: 89000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 233,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
    },
    {
      name: "James Carter",
      salary: 124000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 241,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Kelly Green",
      salary: 84000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 227,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    },
    {
      name: "Peter Adams",
      salary: 127000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 249,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
    },
    {
      name: "Laura Bennett",
      salary: 86000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 231,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Mark Evans",
      salary: 123000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 244,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Sophie Clark",
      salary: 88000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 236,
      image: "https://images.unsplash.com/photo-1487412723647-8dcaf443e851"
    },
    {
      name: "Henry Moore",
      salary: 129000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 247,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Olivia Turner",
      salary: 87000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 229,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Daniel King",
      salary: 126000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 251,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3"
    },
    {
      name: "Grace Hall",
      salary: 85000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 234,
      image: "https://images.unsplash.com/photo-1517841902196-6c0ebfcdd114"
    },
    {
      name: "Ethan Brooks",
      salary: 125000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 243,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Chloe Wright",
      salary: 86000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 232,
      image: "https://images.unsplash.com/photo-1522529599102-1a6c08f8e4a4"
    },
    {
      name: "Liam Scott",
      salary: 128000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 250,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Ava Phillips",
      salary: 88000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 237,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Noah Reed",
      salary: 124000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 245,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Mia Collins",
      salary: 87000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 230,
      image: "https://images.unsplash.com/photo-1487412723647-8dcaf443e851"
    },
    {
      name: "Lucas Gray",
      salary: 127000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 248,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Isabella Cook",
      salary: 86000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 233,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Mason Perry",
      salary: 129000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 246,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3"
    },
    {
      name: "Harper Ross",
      salary: 88000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 231,
      image: "https://images.unsplash.com/photo-1517841902196-6c0ebfcdd114"
    },
    {
      name: "Logan Ward",
      salary: 126000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 249,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Ella Hughes",
      salary: 85000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 228,
      image: "https://images.unsplash.com/photo-1522529599102-1a6c08f8e4a4"
    },
    {
      name: "Jack Morgan",
      salary: 130000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 252,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Lily Price",
      salary: 87000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 234,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Owen Bailey",
      salary: 125000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 247,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Zoe Foster",
      salary: 88000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 229,
      image: "https://images.unsplash.com/photo-1487412723647-8dcaf443e851"
    },
    {
      name: "Caleb Stone",
      salary: 127000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 251,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Scarlett Long",
      salary: 86000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 232,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Elijah Cole",
      salary: 128000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 248,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3"
    },
    {
      name: "Aria Hayes",
      salary: 87000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 235,
      image: "https://images.unsplash.com/photo-1517841902196-6c0ebfcdd114"
    },
    {
      name: "Gabriel Ford",
      salary: 126000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 244,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Lila Bryant",
      salary: 88000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 230,
      image: "https://images.unsplash.com/photo-1522529599102-1a6c08f8e4a4"
    },
    {
      name: "Samuel Hart",
      salary: 129000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 250,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Violet Dunn",
      salary: 86000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 233,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Isaac Wells",
      salary: 125000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 246,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Ruby Fox",
      salary: 87000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 231,
      image: "https://images.unsplash.com/photo-1487412723647-8dcaf443e851"
    },
    {
      name: "Julian Lane",
      salary: 127000,
      lastMonthPresent: 20,
      totalWorkingDaysPresent: 249,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      name: "Stella Kim",
      salary: 88000,
      lastMonthPresent: 21,
      totalWorkingDaysPresent: 234,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Miles Grant",
      salary: 126000,
      lastMonthPresent: 22,
      totalWorkingDaysPresent: 247,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3"
    }
  ];
  const Managers = () => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredManagers = useMemo(() => {
      return managers.filter((managers) =>
        managers.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [searchTerm]);
  
    return (
      <div className="p-6">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search workers by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
  
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
              <Card key={manager.name} className="flex flex-col items-center">
                <CardHeader className="text-center">
                  <CardTitle>{manager.name}</CardTitle>
                  <CardDescription>Salary: ${manager.salary.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <img
                    src={manager.image}
                    alt={manager.name}
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                  />
                  <p className="mb-2">
                    Last Month Attendance: {manager.lastMonthPresent}/22 days
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Working Days: {manager.totalWorkingDaysPresent}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => toast("MESSAGE SENT SUCCESSFULLY.")}
                  >
                    Send Message
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No managers found matching your search.
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default Managers;