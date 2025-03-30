import AddBlogForm from "@/components/modules/Blog/AddBlog";
import { Fragment } from "react";

export default function CreateBlogPage() {
  return (
    <Fragment>
      <div>
        <div className="mt-4">
          <AddBlogForm />
        </div>
      </div>
    </Fragment>
  );
}
