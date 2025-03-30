import BlogDetails from "@/components/modules/Blog/BlogDetails";
import { getBlogById } from "@/service/Blog";
import { Fragment } from "react";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: blog } = await getBlogById(id);
  return (
    <Fragment>
      <h2>Blog Details</h2>
      <BlogDetails blog={blog} />
    </Fragment>
  );
}
