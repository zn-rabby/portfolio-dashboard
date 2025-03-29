"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  FileText,
  Folder,
  Clock,
  Calendar,
  Cloud,
  Thermometer,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for charts
const projectData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

const messageData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 25 },
  { name: "Thu", value: 45 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 10 },
];

// Custom Progress component to handle indicator color
function CustomProgress({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-[#39CCB5] rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function ProfessionalPortfolioDashboard() {
  // State for real-time data
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 28, condition: "Sunny" });

  // Sample data
  const stats = {
    projects: 24,
    blogs: 15,
    messages: 42,
    completionRate: 78,
  };

  const recentMessages = [
    {
      id: 1,
      name: "John Doe",
      message: "Interested in collaboration",
      time: "2h ago",
    },
    { id: 2, name: "Jane Smith", message: "Project inquiry", time: "1d ago" },
    { id: 3, name: "Acme Inc", message: "Job opportunity", time: "3d ago" },
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate weather changes (in a real app, you'd fetch this from an API)
      setWeather({
        temp: Math.floor(25 + Math.random() * 10),
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-[#39CCB5]">
              Rabby{"'"}s Dashboard
            </h1>
            <p className="text-gray-600">Full Stack Developer | MERN Stack</p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            {/* Real-time Weather */}
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-[#39CCB5]" />
              <span className="font-medium">{weather.temp}°C</span>
              <Cloud className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{weather.condition}</span>
            </div>
            {/* Real-time Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#39CCB5]" />
              <span className="font-medium">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {/* Real-time Clock */}
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#39CCB5]" />
              <span className="font-medium">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>

            <Button
              variant="outline"
              className="border-[#39CCB5] text-[#39CCB5] hover:bg-[#39CCB5]/10 flex items-center gap-2 pl-2 pr-4"
            >
              <div className="flex items-center">
                <Avatar className="h-8 w-8 border border-[#39CCB5]/30">
                  <AvatarImage
                    src="/path-to-your-image.jpg"
                    alt="Zulkar Naeem Rabby"
                  />
                  <AvatarFallback className="bg-[#39CCB5] text-white">
                    ZNR
                  </AvatarFallback>
                </Avatar>
                {/* <User className="ml-2 h-4 w-4" /> */}
              </div>
              <span>Zulkar Naeem Rabby</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Projects
              </CardTitle>
              <Folder className="h-5 w-5 text-[#39CCB5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#39CCB5"
                      strokeWidth={2}
                      dot={{ fill: "#39CCB5", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Blogs
              </CardTitle>
              <FileText className="h-5 w-5 text-[#39CCB5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogs}</div>
              <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Messages
              </CardTitle>
              <Mail className="h-5 w-5 text-[#39CCB5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messages}</div>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#39CCB5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {stats.completionRate}%
                </span>
                <span className="text-sm text-gray-500">Complete</span>
              </div>
              <CustomProgress value={stats.completionRate} />
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Skills</div>
                  <CustomProgress value={85} />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Projects</div>
                  <CustomProgress value={90} />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Experience</div>
                  <CustomProgress value={70} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start pb-4 last:pb-0 border-b last:border-b-0"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#39CCB5]/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#39CCB5]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{msg.name}</h3>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-6 text-center border-t border-gray-200">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Zulkar Naeem Rabby. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
