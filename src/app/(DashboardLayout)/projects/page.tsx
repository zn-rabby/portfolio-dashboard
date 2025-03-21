// import { getAllProjects } from "@/app/services/Project";
// import ManageProject from "@/components/modules/Projects";
export const dynamic = "force-dynamic";
import ManageProject from "@/components/modules/Projects";
import { getAllProjects } from "@/service/Project";

export default async function ProjectsPage() {
  const { data } = await getAllProjects();
  const projects = data ?? [];
  console.log(44,projects)

  return (
    <div className="w-full">
      <h2>Projects</h2>
      <ManageProject projects={projects} />
    </div>
  );
}