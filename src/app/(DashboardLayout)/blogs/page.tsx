export const dynamic = "force-dynamic";
import ManageProject from "@/components/modules/Projects";
import { getAllProjects } from "@/service/Project";

export default async function BlogsPage() {
  const { data } = await getAllProjects();
  const projects = data ?? [];

  return (
    <div className="w-full">
      <h2>Blogs</h2>
      <ManageProject projects={projects} />
    </div>
  );
}
