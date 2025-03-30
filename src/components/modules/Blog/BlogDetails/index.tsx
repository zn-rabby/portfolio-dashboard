import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { CalendarDays, Clock, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IBlog } from "@/types/type";

const renderHtml = (html: string | undefined) => {
  if (!html) return null;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>li]:my-2 [&>strong]:font-bold [&>em]:italic [&>u]:underline [&>a]:text-emerald-600 [&>a]:underline [&>a]:hover:text-emerald-800 [&>img]:rounded-lg [&>img]:my-4 [&>img]:shadow-md"
    />
  );
};

export default function BlogDetails({ blog }: { blog: IBlog }) {
  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Format date (fallback to ObjectId timestamp if no createdAt)
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) {
      // Fallback to ObjectId timestamp
      const timestamp = parseInt(blog._id.substring(0, 8), 16) * 1000;
      return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Fragment>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="px-0 hover:bg-transparent text-emerald-600 hover:text-emerald-800"
          >
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to all blogs
            </Link>
          </Button>
        </div>

        {/* Blog Content Container */}
        <article className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          {/* Category Badge */}
          {blog?.category && (
            <Badge variant="secondary" className="mb-4">
              {blog.category}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {blog?.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span>{blog?.author || "Unknown author"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-500" />
              <span>{formatDate()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span>{calculateReadingTime(blog?.content || "")} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog?.image && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={blog.image}
                alt={`Featured image for ${blog.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
          )}

          {/* Tags */}
          {blog?.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1 text-sm"
                >
                  <Tag size={14} className="text-gray-500" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Introduction */}
          {blog?.introduction && (
            <div className="prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                {blog.introduction}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose max-w-none">{renderHtml(blog?.content)}</div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <Button
              asChild
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 gap-2"
            >
              <Link href="/blogs" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Back to all articles
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </Fragment>
  );
}
