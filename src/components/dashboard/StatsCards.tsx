/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, FileText, Mail, Code } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  //   Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#39CCB5", "#4FD1C5", "#63E3D7", "#81E6D9", "#A7F3D0"];

export default function StatsCards({
  stats,
  projectsData,
  //   messageData,
  skillsData,
  loading,
}: {
  stats: {
    projects: number;
    blogs: number;
    messages: number;
    skills: number;
  };
  projectsData: any[];
  messageData: any[];
  skillsData: any[];
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
          <div className="h-[120px] mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
              </div>
            ) : projectsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
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
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No project data available
              </div>
            )}
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
          {!loading && (
            <p className="text-xs text-gray-500 mt-1">
              {stats.blogs > 0
                ? `${stats.blogs} published articles`
                : "No blogs yet"}
            </p>
          )}
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
          <div className="text-2xl font-bold">{stats.messages}</div>
          {!loading && (
            <p className="text-xs text-gray-500 mt-1">
              {stats.messages > 0
                ? `${stats.messages} received`
                : "No messages yet"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Skills
          </CardTitle>
          <Code className="h-5 w-5 text-[#39CCB5]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.skills}</div>
          <div className="h-[120px] mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
              </div>
            ) : skillsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "6px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No skills data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
