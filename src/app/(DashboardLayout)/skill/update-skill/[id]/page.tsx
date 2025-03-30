import UpdateSkillForm from "@/components/modules/Skill/UpdateSkill";
import { getSkillById } from "@/service/skill";
import { Fragment } from "react";

export default async function UpdateSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: skill } = await getSkillById(id);

  return (
    <Fragment>
      <UpdateSkillForm skill={skill} />
    </Fragment>
  );
}
