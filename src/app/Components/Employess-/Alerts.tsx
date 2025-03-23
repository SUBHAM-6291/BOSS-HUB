import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Alerts = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Card className="bg-gray-900 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl text-white text-center">Alerts Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-gray-400 text-center">
            We're working on something awesome. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;