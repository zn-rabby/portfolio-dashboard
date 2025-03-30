import AddProjectForm from "@/components/modules/Projects/AddProject";
import { Fragment } from "react";

export default function CreateProjectPage() {
  return (
    <Fragment>
      <div>
        <div className="mt-4">
          <AddProjectForm />
        </div>
      </div>
    </Fragment>
  );
}
