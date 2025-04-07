import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

const Dashboard = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Basic PDF Content
    doc.setFontSize(16);
    doc.text("Employee Dashboard Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Date: March 24, 2025", 20, 30);

    // Company Metrics
    doc.setFontSize(14);
    doc.text("Company Metrics", 20, 50);
    doc.setFontSize(12);
    doc.text("Total Employees: 150", 20, 60);
    doc.text("Average Salary: $65,000", 20, 70);

    // Your Salary & Growth
    doc.setFontSize(14);
    doc.text("Your Salary & Growth", 20, 90);
    doc.setFontSize(12);
    doc.text("Current Salary: $70,000", 20, 100);
    doc.text("Last Raise: $5,000 (2024-12-01)", 20, 110);
    doc.text("Growth (1 Year): +7.7%", 20, 120);

    // Summary
    doc.setFontSize(12);
    doc.text(
      "Summary: Overview of company metrics and your personal salary growth.",
      20,
      140,
      { maxWidth: 170 }
    );

    // Save the PDF
    doc.save("employee-dashboard-report.pdf");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <p className="text-gray-400">Your personal and company stats</p>
      </header>

      {/* Company Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">150</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$65,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Salary & Growth Section */}
      <div className="mt-6">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Your Salary & Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-400">
              <p>
                <span className="text-white font-semibold">Current Salary:</span> $70,000
              </p>
              <p>
                <span className="text-white font-semibold">Last Raise:</span> $5,000 (2024-12-01)
              </p>
              <p>
                <span className="text-white font-semibold">Growth (1 Year):</span> +7.7%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button with PDF Generation */}
      <div className="mt-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={generatePDF}
        >
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;