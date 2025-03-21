"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Fragment, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TProject } from "@/types/user";
import { updateProjectById } from "@/service/Project";

export default function UpdateProjectForm({ project }: { project: TProject }) {
  const router = useRouter();
  const [imageLinks, setImageLinks] = useState<string[]>(project?.image || []);

  const technologies = [
    "javascript",
    "typescript",
    "mongodb",
    "mongoose",
    "tailwindCss",
    "shadcnUi",
    "antDesign",
    "materialUi",
    "jwt",
    "other",
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "onHold", label: "On Hold" },
  ];

  const form = useForm({
    defaultValues: {
      name: project?.name || "",
      category: project?.category || "",
      title: project?.title || "",
      description: project?.description || "",
      image: project?.image || [],
      technologies: project?.technologies || [],
      keyFeatures: project?.keyFeatures || [],
      status: project?.status || "ongoing",
      liveDemoLink: project?.liveDemoLink || "",
      repoLinkClient: project?.repoLinkClient || "",
      repoLinkServer: project?.repoLinkServer || "",
      projectGoals: project?.projectGoals || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleImageLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const links = e.target.value.split(",").map((link) => link.trim());
    setImageLinks(links);
    form.setValue("image", links);
  };

  const handleKeyFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split("\n").map((feature) => feature.trim());
    form.setValue("keyFeatures", features);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateProjectById(project?._id, data);
      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response?.error?.[0]?.message || "Error updating project");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error)
    }
  };

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="Project name" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Category */}
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="Project category" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Title */}
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="Project title" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Image Links */}
          <FormItem>
            <FormLabel>Image Links (comma-separated)</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter image links"
                value={imageLinks.join(",")}
                onChange={handleImageLinksChange}
              />
            </FormControl>
          </FormItem>

          {/* Description */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-52"
                  placeholder="Enter project description"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Technologies Used */}
          <FormField control={form.control} name="technologies" render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies Used <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <select
                  multiple
                  value={field.value}
                  onChange={(e) => field.onChange([...e.target.selectedOptions].map((o) => o.value))}
                  className="w-full min-h-36 border-2 border-gray-300"
                  required
                >
                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Key Features */}
          <FormField control={form.control} name="keyFeatures" render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter key features (one per line)"
                  value={field.value.join("\n")}
                  onChange={handleKeyFeaturesChange}
                  className="min-h-36"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Status */}
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Live Demo Link */}
          <FormField control={form.control} name="liveDemoLink" render={({ field }) => (
            <FormItem>
              <FormLabel>Live Demo Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter live demo link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Repository Link (Client) */}
          <FormField control={form.control} name="repoLinkClient" render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link (Client)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter client repository link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Repository Link (Server) */}
          <FormField control={form.control} name="repoLinkServer" render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link (Server)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter server repository link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Project Goals */}
          <FormField control={form.control} name="projectGoals" render={({ field }) => (
            <FormItem>
              <FormLabel>Project Goals</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter project goals"
                  className="min-h-36"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </Form>
    </Fragment>
  );
}