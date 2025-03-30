import UpdateProjectForm from "@/components/modules/Projects/UpdateProject";
import { getProjectById } from "@/service/Project";
import { Fragment } from "react";

export default async function UpdateProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: project } = await getProjectById(id);

  return (
    <Fragment>
      <UpdateProjectForm project={project} />
    </Fragment>
  );
}
