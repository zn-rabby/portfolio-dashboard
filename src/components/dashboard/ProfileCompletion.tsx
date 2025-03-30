import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Folder, FileText } from "lucide-react";
import CustomProgress from "./CustomProgress";

export default function ProfileCompletion({
  stats,
  skillsCount,
  projectsCount,
  blogsCount,
}: {
  stats: { completionRate: number };
  skillsCount: number;
  projectsCount: number;
  blogsCount: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{stats.completionRate}%</span>
          <span className="text-sm text-gray-500">Complete</span>
        </div>
        <CustomProgress value={stats.completionRate} />
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Code className="h-5 w-5 text-[#39CCB5]" />
            </div>
            <div className="text-sm text-gray-500">Skills</div>
            <CustomProgress
              value={Math.min(100, Math.floor((skillsCount / 10) * 100))}
            />
            <div className="text-xs text-gray-400 mt-1">
              {skillsCount} skills
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Folder className="h-5 w-5 text-[#39CCB5]" />
            </div>
            <div className="text-sm text-gray-500">Projects</div>
            <CustomProgress
              value={Math.min(100, Math.floor((projectsCount / 5) * 100))}
            />
            <div className="text-xs text-gray-400 mt-1">
              {projectsCount} projects
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-[#39CCB5]" />
            </div>
            <div className="text-sm text-gray-500">Blogs</div>
            <CustomProgress
              value={Math.min(100, Math.floor((blogsCount / 5) * 100))}
            />
            <div className="text-xs text-gray-400 mt-1">
              {blogsCount} articles
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
