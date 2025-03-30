import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { PlayCircle, GitFork, Star, Code2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IProject } from "@/types/user";

const renderHtml = (html: string | undefined) => {
  if (!html) return null;
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&>strong]:font-bold [&>em]:italic [&>u]:underline [&>a]:text-emerald-600 [&>a]:underline [&>a]:hover:text-emerald-800"
    />
  );
};

export default function ProjectDetails({ project }: { project: IProject }) {
  return (
    <Fragment>
      <div className="max-w-4xl mx-auto mt-10 space-y-10 bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {project.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {project.title}
            </h1>
          </div>
          <Badge
            variant="outline"
            className={`text-xs uppercase tracking-wider ${
              project.status === "completed"
                ? "bg-green-50 text-green-700 border-green-100"
                : project.status === "ongoing"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-gray-50 text-gray-700 border-gray-100"
            }`}
          >
            {project.status}
          </Badge>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden group col-span-2">
            <Image
              src={project.image[0]}
              alt={`${project.title} main image`}
              fill
              className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {project.image.length > 1 && (
            <div className="flex flex-col gap-4">
              {project.image.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={`${project.title} preview ${idx + 1}`}
                    fill
                    className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Meta */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
            <GitFork size={14} />
            <span>{project.technologies.length} Technologies</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
            <Code2 size={14} />
            <span>{project.category}</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {renderHtml(project.description)}
          </p>
        </div>

        {/* Project Goals */}
        {project.projectGoals && (
          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              <Star size={18} className="text-emerald-600" />
              Project Goals
            </h3>
            <p className="text-emerald-700/90">
              {renderHtml(project.projectGoals)}
            </p>
          </div>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <Star size={14} className="text-emerald-600" />
              </div>
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-emerald-100 transition-colors"
                >
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-white" />
                  </span>
                  <span className="text-gray-700">{renderHtml(feature)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Code2 size={14} className="text-emerald-600" />
            </div>
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1.5 text-emerald-600 bg-white hover:bg-emerald-50 border-emerald-200 rounded-lg"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow hover:shadow-md rounded-lg px-6"
          >
            <Link
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 font-medium"
            >
              <PlayCircle size={18} />
              Live Demo
              <ExternalLink size={16} />
            </Link>
          </Button>

          {project.repoLinkClient && (
            <Button
              asChild
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 gap-2 rounded-lg px-6 font-medium"
            >
              <Link
                href={project.repoLinkClient}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={18} />
                Client Code
              </Link>
            </Button>
          )}

          {project.repoLinkServer && (
            <Button
              asChild
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 gap-2 rounded-lg px-6 font-medium"
            >
              <Link
                href={project.repoLinkServer}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={18} />
                Server Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
