import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";

const OvertimeRequests = () => {
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!email || !hours || Number(hours) <= 0) {
      toast.error("Please provide a valid email and positive number of hours.");
    } else {
      toast.success(
        `Overtime request for ${hours} hours submitted for ${email}.`
      );
      setEmail("");
      setHours("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {}
      <Toaster position="top-right" richColors />

      <header className="mb-6">
        <h1 className="text-3xl font-bold">Overtime Requests</h1>
        <p className="text-gray-400">Submit your overtime request for today</p>
      </header>

      <Card className="bg-black border-gray-800 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-white">Request Overtime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-700 text-white focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="text-gray-400">
                Overtime Hours Today
              </Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours"
                className="bg-gray-900 border-gray-700 text-white focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-400">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message (optional)"
                className="bg-gray-900 border-gray-700 text-white focus:ring-blue-600"
                rows={3}
              />
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OvertimeRequests;