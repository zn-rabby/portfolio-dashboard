
import ProjectDetails from "@/components/modules/Projects/ProjectDetails";
import { getProjectById } from "@/service/Project";
import { Fragment } from "react";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: project } = await getProjectById(id);
  return (
    <Fragment>
      <h2>Project Details</h2>
      <ProjectDetails project={project} />
    </Fragment>
  );
}