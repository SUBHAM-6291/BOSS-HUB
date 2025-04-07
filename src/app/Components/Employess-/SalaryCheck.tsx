import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SalaryCheck = () => {
  const bankDetails = {
    accountNumber: "1234-5678-9012",
    balance: "$5,432.78",
    bankName: "Example Bank",
  };

  const handleBankRedirect = () => {
    window.open("https://www.example.com/bank", "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Salary Check</h1>
        <p className="text-gray-400">View your bank account details</p>
      </header>

      {}
      <Card className="bg-black border-gray-800 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-white">Your Bank Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-gray-400">
            <p>
              <span className="text-white font-semibold">Bank Name:</span> {bankDetails.bankName}
            </p>
            <p>
              <span className="text-white font-semibold">Account Number:</span> {bankDetails.accountNumber}
            </p>
            <p>
              <span className="text-white font-semibold">Balance:</span> {bankDetails.balance}
            </p>
          </div>
          <Button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={handleBankRedirect}
          >
            Go to Bank
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryCheck;