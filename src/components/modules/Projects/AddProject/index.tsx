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
import { TProject } from "@/types/user";

export default function AddProjectForm() {
  const router = useRouter();
  // const [setImageLinks] = useState<string[]>([]);
  
  const form = useForm<TProject>({
    defaultValues: {
      name: "",
      category: "",
      title: "",
      description: "",
      image: [],
      technologies: [],
      keyFeatures: [],
      status: "ongoing",
      liveDemoLink: "",
      repoLinkClient: "",
      repoLinkServer: "",
      projectGoals: "",
    },
  });

  const technologies = [
    "javascript", "typescript", "mongodb", "mongoose", "tailwindCss", 
    "shadcnUi", "antDesign", "materialUi", "jwt", "other"
  ];

  const {
    formState: { isSubmitting },
  } = form;

  const handleImageLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const links = e.target.value.split(",").map((link) => link.trim());
    // setImageLinks(links);
    form.setValue("image", links);
  };

  const handleKeyFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split("\n").map((feature) => feature.trim());
    form.setValue("keyFeatures", features);
  };

  const onSubmit: SubmitHandler<TProject> = async (data) => {
    try {
      const response = await addProject(data);
      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response?.error?.[0]?.message || "Error adding project");
      }
    } catch (error:any) {
      toast.error("Something went wrong!",error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
            <FormControl><Input {...field} placeholder="Project name" required /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Category */}
        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
            <FormControl><Input {...field} placeholder="Project category" required /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Title */}
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
            <FormControl><Input {...field} placeholder="Project title" required /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Image Links */}
        <FormItem>
          <FormLabel>Image Links (comma-separated)</FormLabel>
          <FormControl>
            <Input placeholder="Enter image links" onChange={handleImageLinksChange} />
          </FormControl>
        </FormItem>

        {/* Description */}
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
            <FormControl><Textarea {...field} className="min-h-52" placeholder="Enter project description" required /></FormControl>
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
                onChange={(e) => field.onChange([...e.target.selectedOptions].map(o => o.value))} 
                className="w-full min-h-36 border-2 border-gray-300"
                required
              >
                {technologies.map(tech => <option key={tech} value={tech}>{tech}</option>)}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Key Features */}
        <FormField control={form.control} name="keyFeatures" render={({  }) => (
          <FormItem>
            <FormLabel>Key Features <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter key features (one per line)"
                onChange={handleKeyFeaturesChange}
                className="min-h-36"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Live Demo Link */}
        <FormField control={form.control} name="liveDemoLink" render={({ field }) => (
          <FormItem>
            <FormLabel>Live Demo Link</FormLabel>
            <FormControl><Input {...field} placeholder="Enter live demo link" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Repository Link (Client) */}
        <FormField control={form.control} name="repoLinkClient" render={({ field }) => (
          <FormItem>
            <FormLabel>Repository Link (Client)</FormLabel>
            <FormControl><Input {...field} placeholder="Enter client repository link" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Repository Link (Server) */}
        <FormField control={form.control} name="repoLinkServer" render={({ field }) => (
          <FormItem>
            <FormLabel>Repository Link (Server)</FormLabel>
            <FormControl><Input {...field} placeholder="Enter server repository link" /></FormControl>
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
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
          Add Project
        </Button>
      </form>
    </Form>
  );
}