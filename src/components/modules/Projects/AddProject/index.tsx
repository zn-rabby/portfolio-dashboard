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
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addProject } from "@/service/Project";
import { projectSchema } from "./project.validation";

export default function AddProjectForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      description: "",
      projectRole: "",
      technologiesUsed: [],
      challengesFaced: "",
      solution: "",
      keyFeatures: [],
      liveLink: "",
      frontendSourceCode: "",
      backendSourceCode: "",
      apiDocumentation: "",
      projectGoals: "",
      futureImprovements: "",
      securityConsiderations: "",
      projectTimeline: "",
      isFeatured: false,
    },
  });

  const roles = [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Full-Stack Developer" },
    { value: "ui-ux", label: "UI/UX Designer" },
  ];

  const technologies = [
    { value: "javascript", label: "Javascript" },
    { value: "typescript", label: "Typescript" },
    { value: "mongodb", label: "Mongodb" },
    { value: "mongoose", label: "Mongoose" },
    { value: "tailwindCss", label: "Tailwind Css" },
    { value: "shadcnUi", label: "Shadcn/Ui" },
    { value: "antDesign", label: "Ant Design" },
    { value: "materialUi", label: "MaterialUi" },
    { value: "jwt", label: "Json Web Token" },
    { value: "other", label: "other" },
  ];

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addProject(data);

      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* title and thumbnail */}
            <div className="flex flex-col xl:flex-row gap-5">
              {/* title */}
              <div className="flex-1">
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
                          placeholder="Enter your project title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* thumbnail */}
              <div className=" flex-1">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Thumbnail URL <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter thumbnail URL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* description */}
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
                      className="min-h-52"
                      {...field}
                      placeholder="Enter project description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col xl:flex-row gap-5">
              {/* project role */}

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="projectRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Project Role <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* project timeline */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="projectTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Project Timeline <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter project timeline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* technologies used */}

            <div className="space-y-2">
              <Label htmlFor="technologiesUsed" className="text-white">
                Technologies Used<span className="text-red-500 ml-1">*</span>
              </Label>
              <select
                className="w-full min-h-36 border-2 border-[#27272A]"
                name="technologiesUsed"
                multiple
                value={form.watch("technologiesUsed")}
                onChange={(e) =>
                  form.setValue(
                    "technologiesUsed",
                    [...e.target.selectedOptions].map((o) => o.value)
                  )
                }
                required
              >
                {technologies.map((tech) => (
                  <option
                    key={tech.value}
                    value={tech.value}
                    className="text-sm"
                  >
                    {tech.label}
                  </option>
                ))}
              </select>
            </div>

            {/* key features */}
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Key Features <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-20"
                      {...field}
                      placeholder="Enter key features (comma-separated)"
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue(
                          "keyFeatures",
                          value.split(",").map((item) => item.trim())
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col xl:flex-row gap-5">
              {/* live link */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Live Link <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter live project link"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* frontend source code */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="frontendSourceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Frontend Source Code{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter frontend source code URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-5">
              {/* backend source code */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="backendSourceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backend Source Code</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          placeholder="Enter backend source code URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* api documentation */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="apiDocumentation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Documentation</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          placeholder="Enter API documentation URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* project goals */}
            <FormField
              control={form.control}
              name="projectGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-52"
                      {...field}
                      placeholder="Enter project goals"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* challenge faced  */}
            <FormField
              control={form.control}
              name="challengesFaced"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges Faced</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-52"
                      {...field}
                      placeholder="Enter project challenges faced"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* solutions */}
            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-52"
                      {...field}
                      placeholder="Enter solution"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* future improvements */}
            <FormField
              control={form.control}
              name="futureImprovements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Future Improvements</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-52"
                      {...field}
                      placeholder="Enter future improvements"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* security considerations */}
            <FormField
              control={form.control}
              name="securityConsiderations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Considerations</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-52"
                      {...field}
                      placeholder="Enter security considerations"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* featured */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 accent-[#8750F7]"
                  />
                  <FormLabel className="text-sm">Featured Project</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit button */}
            <Button
              type="submit"
              className="w-full bg-[#8750F7] hover:bg-[#733DD6] text-white cursor-pointer"
              disabled={isSubmitting}
            >
              Add Project
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  );
}