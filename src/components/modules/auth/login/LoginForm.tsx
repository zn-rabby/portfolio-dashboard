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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useRouter } from "next/navigation";
import { loginUser } from "@/service/AuthService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLoginPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side - Illustration */}
      <div
        className="
          hidden lg:flex flex-col justify-center items-center w-1/2 p-12
          bg-gradient-to-br from-[#39CCB5] to-[#2DA897]
        "
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome Back!</h1>
        <p className="text-gray-800 text-xl text-center">
          Access your professional portfolio dashboard and manage your projects with ease.
        </p>
        <div className="mt-8">
          <img
            src="/dashboard-illustration.png" // Replace with your modern illustration
            alt="Dashboard Illustration"
            className="w-96"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        className="
          flex flex-col justify-center items-center w-full lg:w-1/2 p-8
        "
      >
        <Card className="w-full max-w-md bg-gray-800 border border-gray-700">
          <CardHeader className="flex flex-col items-center space-y-2">
            <CardTitle className="text-4xl font-bold text-[#39CCB5]">Dashboard Login</CardTitle>
            <CardDescription className="text-gray-400">Access your professional dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#39CCB5]">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          value={field.value || ""}
                          className="
                            focus:ring-[#39CCB5] focus:border-[#39CCB5]
                            bg-gray-700 text-white transition-all duration-300
                            placeholder-gray-400
                          "
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#39CCB5]">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          value={field.value || ""}
                          className="
                            focus:ring-[#39CCB5] focus:border-[#39CCB5]
                            bg-gray-700 text-white transition-all duration-300
                            placeholder-gray-400
                          "
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  className="
                    w-full bg-gradient-to-r from-[#39CCB5] to-[#2DA897]
                    hover:from-[#2DA897] hover:to-[#39CCB5]
                    text-gray-900 py-3 rounded-lg transition-all duration-300
                    font-semibold shadow-lg hover:shadow-xl
                  "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}