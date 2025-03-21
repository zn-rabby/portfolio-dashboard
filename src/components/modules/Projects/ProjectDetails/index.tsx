import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TProject } from "@/types/user";

export default function ProjectDetails({ project }: { project: TProject }) {
  return (
    <Fragment>
      <div className="mt-8 space-y-8 bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        {/* Image with Hover Effect */}
        <div className="relative h-[400px] rounded-lg overflow-hidden group">
          <Image
            src={project.image[0]}
            alt="Featured Project"
            fill
            className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#38CBB5] hover:text-[#2BAE9A] transition-colors duration-300">
          {project.title}
        </h2>

        {/* Description */}
        <div>
          <p className="text-lg text-gray-800 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-2xl font-semibold text-[#38CBB5] mb-4">
            Key Features:
          </h3>
          <ul className="space-y-2">
            {project.keyFeatures.map((keyFeature, index) => (
              <li
                key={index}
                className="flex items-center text-gray-800 text-lg"
              >
                <span className="w-2 h-2 bg-[#38CBB5] rounded-full mr-3" />
                {keyFeature}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div>
          <h3 className="text-2xl font-semibold text-[#38CBB5] mb-4">
            Technologies Used:
          </h3>
          <ul className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-[#38CBB5]/10 text-[#38CBB5] rounded-full text-sm font-medium hover:bg-[#38CBB5]/20 transition-colors duration-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button
            asChild
            className="bg-gradient-to-r from-[#38CBB5] to-[#2BAE9A] text-white hover:from-[#2BAE9A] hover:to-[#38CBB5] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href={project.liveDemoLink}>
              Live Demo <PlayCircle size={18} className="ml-2" />
            </Link>
          </Button>

          {project.repoLinkClient && (
            <Button
              asChild
              className="bg-gradient-to-r from-[#38CBB5] to-[#2BAE9A] text-white hover:from-[#2BAE9A] hover:to-[#38CBB5] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link
                href={project.repoLinkClient}
                target="_blank"
                rel="noopener noreferrer"
              >
                Frontend GitHub <FaGithub size={18} className="ml-2" />
              </Link>
            </Button>
          )}

          {project.repoLinkServer && (
            <Button
              asChild
              className="bg-gradient-to-r from-[#38CBB5] to-[#2BAE9A] text-white hover:from-[#2BAE9A] hover:to-[#38CBB5] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link
                href={project.repoLinkServer}
                target="_blank"
                rel="noopener noreferrer"
              >
                Backend GitHub <FaGithub size={18} className="ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
}