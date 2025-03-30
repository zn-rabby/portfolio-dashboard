import SkillDetails from "@/components/modules/Skill/SkillDetails";
import { getSkillById } from "@/service/skill";
import { Fragment } from "react";

export default async function SkillDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: skill } = await getSkillById(id);
  return (
    <Fragment>
      <h2>Skills Details</h2>
      <SkillDetails skill={skill} />
    </Fragment>
  );
}
