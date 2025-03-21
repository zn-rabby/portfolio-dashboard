

import AddProjectForm from "@/components/modules/Projects/AddProject";
import { Fragment } from "react";

export default function CreateProjectPage() {
  return (
    <Fragment>
      <div>
     <h2>Create project</h2>
        <div className="mt-4">
          <AddProjectForm />
        </div>
      </div>
    </Fragment>
  );
}