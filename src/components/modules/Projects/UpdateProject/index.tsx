/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
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
import { updateProjectById } from "@/service/Project";
import { IProject } from "@/types/type";
import RichTextEditor from "@/components/ui/core/RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function UpdateProjectForm({ project }: { project: IProject }) {
  const router = useRouter();

  const technologies = [
    // ===== Core Web Technologies =====
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",

    // ===== Frontend Technologies =====
    "React",
    "Next.js",
    "Angular",
    "Vue",
    "Svelte",
    "Redux",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Ant Design",
    "Shadcn/UI",

    // ===== Backend Technologies =====
    "Node.js",
    "Express.js",
    "NestJS",

    // ===== Database =====
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "MySQL",
    "Prisma",

    // ===== Other =====
    "GraphQL",
    "REST API",
    "JWT",
    "OAuth",
    "Docker",
    "AWS",
    "Firebase",
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "maintenance", label: "Maintenance" },
  ];

  const form = useForm<IProject>({
    defaultValues: {
      ...project,
      features: project.features || [],
      technologies: project.technologies || [],
      image: project.image || [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleImageLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const links = e.target.value.split(",").map((link) => link.trim());
    form.setValue("image", links);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value
      .split("\n")
      .map((feature) => feature.trim());
    form.setValue("features", features);
  };

  const handleTechnologiesChange = (tech: string) => {
    const currentTechs = form.getValues("technologies") || [];
    const updatedTechs = currentTechs.includes(tech)
      ? currentTechs.filter((t) => t !== tech)
      : [...currentTechs, tech];
    form.setValue("technologies", updatedTechs);
  };

  const onSubmit: SubmitHandler<IProject> = async (data) => {
    try {
      const response = await updateProjectById(project?._id, data);
      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response?.error?.[0]?.message || "Error updating project");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Project title"
                        required
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Project category"
                        required
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={(value: any) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Links */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Links (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image links separated by commas"
                      value={field.value?.join(",") || ""}
                      onChange={handleImageLinksChange}
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies Used */}
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Technologies Used <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant={
                            field.value?.includes(tech) ? "default" : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => handleTechnologiesChange(tech)}
                        >
                          {tech}
                          {field.value?.includes(tech) && (
                            <span className="ml-1">✓</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`• Feature 1\n• Feature 2\n• Feature 3`}
                      onChange={handleFeaturesChange}
                      className="min-h-36 bg-muted"
                      value={field.value?.join("\n") || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-muted">
                          <SelectValue placeholder="Select project status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Live Demo Link */}
              <FormField
                control={form.control}
                name="liveDemoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Repository Link (Client) */}
              <FormField
                control={form.control}
                name="repoLinkClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository Link (Client)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/username/repo-client"
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Repository Link (Server) */}
              <FormField
                control={form.control}
                name="repoLinkServer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository Link (Server)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/username/repo-server"
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Project Goals */}
            <FormField
              control={form.control}
              name="projectGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Goals</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={(value: any) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Project...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
