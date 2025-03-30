import AddSkillForm from "@/components/modules/Skill/AddSkill";
import { Fragment } from "react";

export default function CreateSkillPage() {
  return (
    <Fragment>
      <div>
        <div className="mt-4">
          <AddSkillForm />
        </div>
      </div>
    </Fragment>
  );
}
