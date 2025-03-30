/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, FileText, Mail, Code, TrendingUp, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
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
  messageData,
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
  // Calculate percentage change for projects (example)
  const calculateChange = (data: any[]) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    return ((current - previous) / previous) * 100;
  };

  const projectsChange = projectsData ? calculateChange(projectsData) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Projects Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Projects
          </CardTitle>
          <div className="flex items-center gap-1">
            <Folder className="h-5 w-5 text-[#39CCB5]" />
            {projectsChange !== 0 && (
              <span
                className={`text-xs flex items-center ${
                  projectsChange > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {projectsChange > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingUp className="h-3 w-3 transform rotate-180" />
                )}
                {Math.abs(projectsChange).toFixed(1)}%
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.projects}</div>
          <div className="h-[120px] mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
              </div>
            ) : projectsData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#888"
                    tick={{ fontSize: 10 }}
                    interval={
                      projectsData.length > 6
                        ? Math.ceil(projectsData.length / 6)
                        : 0
                    }
                  />
                  <YAxis stroke="#888" tick={{ fontSize: 10 }} />
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
                    dot={{ fill: "#39CCB5", r: 3 }}
                    activeDot={{ r: 5, stroke: "#39CCB5", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
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
          {!loading && stats.blogs > 0 && (
            <div className="mt-2">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
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
          <div className="h-[120px] mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
              </div>
            ) : messageData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#888" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "6px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Bar dataKey="value" fill="#39CCB5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                No message data available
              </div>
            )}
          </div>
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
            ) : skillsData?.length > 0 ? (
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
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {skillsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      value,
                      `${props.payload.name} (${(
                        props.payload.percent * 100
                      ).toFixed(1)}%)`,
                    ]}
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "6px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{
                      paddingTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                No skills data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
