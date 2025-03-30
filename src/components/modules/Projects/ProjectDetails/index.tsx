import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { PlayCircle, GitFork, Star, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IProject } from "@/types/user";

export default function ProjectDetails({ project }: { project: IProject }) {
  return (
    <Fragment>
      <div className="max-w-6xl mx-auto mt-8 space-y-8 bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        {/* Project Header with Status Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {project.title}
          </h1>
          <Badge
            variant={
              project.status === "completed"
                ? "default"
                : project.status === "ongoing"
                ? "secondary"
                : "outline"
            }
            className={`text-sm uppercase tracking-wider ${
              project.status === "completed"
                ? "bg-green-100 text-green-800"
                : project.status === "ongoing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {project.status}
          </Badge>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden group col-span-1">
            <Image
              src={project.image[0]}
              alt={`${project.title} main image`}
              fill
              className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {project.image.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {project.image.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-32 md:h-48 rounded-xl overflow-hidden group"
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
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Code2 size={16} />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GitFork size={16} />
            <span>{project.technologies.length} Technologies</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Project Goals */}
        {project.projectGoals && (
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Project Goals
            </h3>
            <p className="text-blue-700">{project.projectGoals}</p>
          </div>
        )}

        {/* Key Features - Fixed the undefined check */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-white" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Technologies Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow hover:shadow-md"
          >
            <Link
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <PlayCircle size={18} />
              Live Demo
            </Link>
          </Button>

          {project.repoLinkClient && (
            <Button
              asChild
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 gap-2"
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
              className="border-gray-300 hover:bg-gray-100 gap-2"
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
