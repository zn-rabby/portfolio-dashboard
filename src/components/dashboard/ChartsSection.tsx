/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const COLORS = ["#39CCB5", "#4FD1C5", "#63E3D7", "#81E6D9", "#A7F3D0"];

export default function ChartsSection({
  messageData,
  projectsData,
  loading,
}: {
  messageData: any[];
  projectsData: any[];
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Messages Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Messages Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39CCB5]"></div>
              </div>
            ) : messageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageData}>
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
                    formatter={(value: number) => [
                      `${value} messages`,
                      "Count",
                    ]}
                    labelFormatter={(label: string) => `Date: ${label}`}
                  />
                  <Bar dataKey="value" name="Messages" radius={[4, 4, 0, 0]}>
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
        </CardContent>
      </Card>

      {/* Projects Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
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
    </div>
  );
}
