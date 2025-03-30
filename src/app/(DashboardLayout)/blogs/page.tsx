export const dynamic = "force-dynamic";
import ManageBlogs from "@/components/modules/Blog";
import { getAllBlogs } from "@/service/Blog";

export default async function BlogsPage() {
  const { data } = await getAllBlogs();
  const blogs = data ?? [];

  return (
    <div className="w-full">
      <h2>Blogs</h2>
      <ManageBlogs blogs={blogs} />
    </div>
  );
}
