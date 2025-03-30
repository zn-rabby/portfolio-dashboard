/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function RecentMessages({
  recentMessages,
  loading,
}: {
  recentMessages: any[];
  loading: boolean;
}) {
  return (
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
                    <div className="text-xs text-gray-400">{msg.date}</div>
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {msg.email}
                  </a>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
  );
}
