export const dynamic = "force-dynamic";
import ManageSkills from "@/components/modules/Skill";
import { getAllSkills } from "@/service/skill";

export default async function ProjectsPage() {
  const { data } = await getAllSkills();
  const skills = data ?? [];

  return (
    <div className="w-full">
      <h2>Skills</h2>
      <ManageSkills skills={skills} />
    </div>
  );
}
