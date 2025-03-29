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
    "Chakra UI",
    "Styled Components",

    // ===== Backend Technologies =====
    "Node.js",
    "Express.js",
    "NestJS",
    "Fastify",

    // ===== Authentication =====
    "JWT",
    "OAuth",
    "Passport.js",
    "Firebase Auth",

    // ===== Database =====
    // NoSQL
    "MongoDB",
    "Mongoose",
    "Firestore",

    // SQL
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Prisma",
    "TypeORM",

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
    "Cypress",
    "Mocha",
    "Chai",

    // ===== Other Tools =====
    "GraphQL",
    "Apollo",
    "REST API",
    "WebSockets",
    "Webpack",
    "Vite",
    "ESLint",
    "Prettier",

    // ===== Other =====
    "Other",
  ];

  const statusOptions = ["ongoing", "completed", "maintenance"];

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

  const handleTechnologiesChange = (selectedTechs: string[]) => {
    form.setValue("technologies", selectedTechs);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Input {...field} placeholder="Project title" required />
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
                <Input {...field} placeholder="Project category" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <Textarea
                  {...field}
                  className="min-h-52"
                  placeholder="Enter project description"
                  required
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {technologies.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={tech}
                        value={tech}
                        checked={field.value?.includes(tech)}
                        onChange={(e) => {
                          const selectedTechs = e.target.checked
                            ? [...field.value, tech]
                            : field.value?.filter((t) => t !== tech);
                          handleTechnologiesChange(selectedTechs);
                        }}
                      />
                      <label htmlFor={tech}>{tech}</label>
                    </div>
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
                  placeholder="Enter features (one per line)"
                  onChange={handleFeaturesChange}
                  className="min-h-36"
                  value={field.value?.join("\n") || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select {...field} className="w-full p-2 border rounded">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormControl>
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
                <Input {...field} placeholder="Enter live demo link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Repository Link (Client) */}
        <FormField
          control={form.control}
          name="repoLinkClient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link (Client)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter client repository link" />
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
                <Input {...field} placeholder="Enter server repository link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Goals */}
        <FormField
          control={form.control}
          name="projectGoals"
          render={({ field }) => (
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
          )}
        />

        {/* Is Published */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormLabel>Publish Project</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Project"}
        </Button>
      </form>
    </Form>
  );
}
