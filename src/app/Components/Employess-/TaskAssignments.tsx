import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TaskAssignments = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Project Alpha", description: "Complete frontend design" },
    { id: 2, title: "Project Beta", description: "Setup backend API" },
    { id: 3, title: "Project Gamma", description: "Database optimization" },
    { id: 4, title: "Project Delta", description: "Write documentation" },
    { id: 5, title: "Project Epsilon", description: "Test deployment" },
  ]);

  interface Task {
    id: number;
    title: string;
    description: string;
  }

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== taskId));
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Task Assignments</h1>
        <p className="text-gray-400">Pending tasks for today</p>
      </header>

      {tasks.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {tasks.map((task) => (
            <Card key={task.id} className="bg-black border-gray-800">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-white">{task.title}</CardTitle>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-red-500 hover:bg-gray-900"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  X
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{task.description}</p>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleClearTasks}
          >
            OK
          </Button>
        </div>
      ) : (
        <div className="text-center text-gray-400 max-w-md mx-auto">
          <p>No pending tasks available.</p>
        </div>
      )}
    </div>
  );
};

export default TaskAssignments;