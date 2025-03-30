import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ISkill } from "@/types/type";

const renderHtml = (html: string | undefined) => {
  if (!html) return null;
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&>strong]:font-bold [&>em]:italic [&>u]:underline [&>a]:text-emerald-600 [&>a]:underline [&>a]:hover:text-emerald-800"
    />
  );
};

export default function SkillDetails({ skill }: { skill: ISkill }) {
  const categoryColors = {
    frontend: "bg-blue-100 text-blue-800",
    backend: "bg-green-100 text-green-800",
    devops: "bg-purple-100 text-purple-800",
    tools: "bg-amber-100 text-amber-800",
    softSkills: "bg-pink-100 text-pink-800",
    others: "bg-gray-100 text-gray-800",
  };

  // Check if icon is a valid URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="max-w-4xl mx-auto mt-10 space-y-6 bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
        {/* Skill Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {skill?.icon && isValidUrl(skill.icon) ? (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={skill.icon}
                  width={64}
                  height={64}
                  alt={`${skill.name} icon`}
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                <Code2 size={24} />
              </div>
            )}
            <div>
              <Badge
                className={`text-xs capitalize mb-2 ${
                  categoryColors[
                    skill.category as keyof typeof categoryColors
                  ] || categoryColors.others
                }`}
              >
                {skill?.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {skill?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none mt-6">
          <div className="text-gray-700 leading-relaxed">
            {renderHtml(skill?.description)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-6">
          <Button
            asChild
            variant="outline"
            className="border-emerald-200 hover:bg-emerald-50 gap-2"
          >
            <Link
              href={`/skill/update-skill/${skill._id}`}
              className="font-medium"
            >
              <Code2 size={16} />
              Edit Skill
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-gray-200 hover:bg-gray-50 gap-2"
          >
            <Link href="/skill" className="font-medium">
              <ExternalLink size={16} />
              Back to Skills
            </Link>
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
