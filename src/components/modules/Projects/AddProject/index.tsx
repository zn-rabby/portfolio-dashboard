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
import { addProject } from "@/service/Project";
import { IProject } from "@/types/user";
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

export default function AddProjectForm() {
  const router = useRouter();

  const form = useForm<IProject>({
    defaultValues: {
      slug: "",
      category: "",
      title: "",
      description: "",
      image: [],
      technologies: [],
      features: [],
      status: "ongoing",
      liveDemoLink: "",
      repoLinkClient: "",
      repoLinkServer: "",
      projectGoals: "",
      isPublished: false,
    },
  });

  const technologies = [
    // ===== Core Web Technologies =====
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",

    // ===== Frontend Technologies =====
    // Frameworks
    "React",
    "Next.js",
    "Angular",
    "Vue",
    "Svelte",

    // State Management
    "Redux",
    "Context API",
    "Zustand",
    "Recoil",

    // UI Libraries & CSS Frameworks
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Ant Design",
    "Shadcn/UI",

    // ===== Backend Technologies =====
    "Node.js",
    "Express.js",

    // ===== Authentication =====
    "JWT",
    "OAuth",
    "Firebase Auth",

    // ===== Database =====
    // NoSQL
    "MongoDB",
    "Mongoose",
    "Firestore",

    // SQL
    "PostgreSQL",
    "MySQL",
    "Prisma",

    // ===== DevOps & Cloud =====
    "AWS",
    "Google Cloud",
    "Azure",
    "Firebase",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "GitHub Actions",
    "Jenkins",

    // ===== Testing =====
    "Jest",
    "React Testing Library",

    // ===== Other Tools =====
    "GraphQL",
    "REST API",
    "WebSockets",
    "Vite",
    "ESLint",
    "Prettier",
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "maintenance", label: "Maintenance" },
  ];

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
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      const projectData = { ...data, slug };

      const response = await addProject(projectData);
      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response?.error?.[0]?.message || "Error adding project");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Project</CardTitle>
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
                      //   className="bg-muted rounded-md border min-h-[200px]"
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
              render={({}) => (
                <FormItem>
                  <FormLabel>Image Links (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image links separated by commas"
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

              {/* Is Published */}
              {/* <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="isPublished" className="!mt-0">
                        Publish Project
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
                  <FormLabel>
                    Project Goals <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={(value: any) => field.onChange(value)}
                      //   className="bg-muted rounded-md border min-h-[200px]"
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
                  Adding Project...
                </>
              ) : (
                "Add Project"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
