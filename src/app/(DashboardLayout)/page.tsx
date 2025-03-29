"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllContacts } from "@/service/Contacts";
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
  Cell,
} from "recharts";

// Define types
type MessageData = {
  name: string;
  value: number;
  fullDate: string;
};

type RecentMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
};

type Weather = {
  temp: number;
  condition: string;
};

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

// Custom color palette
const COLORS = ["#39CCB5", "#4FD1C5", "#63E3D7", "#81E6D9", "#A7F3D0"];

// Sample data for projects chart
const projectData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

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
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<Weather>({
    temp: 28,
    condition: "Sunny",
  });
  const [messageCount, setMessageCount] = useState<number>(0);
  const [messageData, setMessageData] = useState<MessageData[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllContacts();
        if (response && response.data) {
          // Set total message count
          setMessageCount(response.data.length);

          // Process message data by date
          const messagesByDate = processMessagesByDate(response.data);
          setMessageData(messagesByDate);

          // Get 3 most recent messages
          const sortedMessages = [...response.data]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3);

          setRecentMessages(
            sortedMessages.map((msg) => ({
              id: msg._id,
              name: msg.name,
              email: msg.email,
              message: msg.message,
              date: formatDate(new Date(msg.createdAt)),
              time: formatTimeAgo(new Date(msg.createdAt)),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Update time and weather every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setWeather({
        temp: Math.floor(25 + Math.random() * 10),
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Process messages to group by date
  function processMessagesByDate(messages: Contact[]): MessageData[] {
    const dateMap: Record<string, number> = {};

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    return Object.entries(dateMap)
      .map(([name, value]) => ({
        name,
        value,
        fullDate: new Date(name).toISOString(),
      }))
      .sort(
        (a, b) =>
          new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
      );
  }

  // Format date as "MMM DD, YYYY"
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Format time ago
  function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit} ago`
          : `${interval} ${unit}s ago`;
      }
    }
    return "Just now";
  }

  const stats = {
    projects: 24,
    blogs: 15,
    messages: messageCount,
    completionRate: 78,
  };

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
            {/* Weather */}
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-[#39CCB5]" />
              <span className="font-medium">{weather.temp}°C</span>
              <Cloud className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{weather.condition}</span>
            </div>

            {/* Date */}
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

            {/* Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#39CCB5]" />
              <span className="font-medium">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* User Profile */}
            <Button
              variant="outline"
              className="border-[#39CCB5] text-[#39CCB5] hover:bg-[#39CCB5]/10 flex items-center gap-2 pl-2 pr-4"
            >
              <Avatar className="h-8 w-8 border border-[#39CCB5]/30">
                <AvatarImage
                  src="/path-to-your-image.jpg"
                  alt="Zulkar Naeem Rabby"
                />
                <AvatarFallback className="bg-[#39CCB5] text-white">
                  ZNR
                </AvatarFallback>
              </Avatar>
              <span>Zulkar Naeem Rabby</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Projects Card */}
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
                    <XAxis
                      dataKey="name"
                      stroke="#888"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#888" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        border: "none",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#39CCB5"
                      strokeWidth={2}
                      dot={{ fill: "#39CCB5", r: 4 }}
                      activeDot={{ r: 6, stroke: "#39CCB5", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Blogs Card */}
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

          {/* Messages Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Messages
              </CardTitle>
              <Mail className="h-5 w-5 text-[#39CCB5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messageCount}</div>
              <div className="h-[200px] mt-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
                  </div>
                ) : messageData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={messageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#888"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke="#888" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          border: "none",
                        }}
                        formatter={(value: number) => [
                          `${value} messages`,
                          "Count",
                        ]}
                        labelFormatter={(label: string) => `Date: ${label}`}
                      />
                      <Bar
                        dataKey="value"
                        name="Messages"
                        radius={[4, 4, 0, 0]}
                      >
                        {messageData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No message data available
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Total messages received: {messageCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile Completion */}
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

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
                </div>
              ) : recentMessages.length > 0 ? (
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
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{msg.name}</h3>
                          <div className="text-xs text-gray-400">
                            {msg.date}
                          </div>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {msg.email}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                          {msg.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 text-gray-500">
                  No recent messages
                </div>
              )}
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
