"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { User, Lock, Eye, EyeOff } from "lucide-react";
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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().email({ message: "Username Not Found" }),
  password: z.string().min(6, {
    message: "Incorrect Password",
  }),
});

export default function ProfileForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-[url('/image/background/placeholder-background.webp')] bg-cover bg-center px-5 h-screen">
      {/*Login Form Container*/}
      <div className="flex flex-col justify-center items-center gap-y-7 bg-gradient-to-b from-white to-cream px-8 pt-3 pb-5 rounded-2xl w-full md:max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="FE Camp"
            width={109}
            height={62}
            className="scale-90 md:scale-100"
          />
          <h2 className="font-inknut text-4xl md:text-5xl lg:text-6xl">
            Welcome!
          </h2>
          <p className="mt-1 font-prompt text-dark-gray text-base md:text-lg">
            ล็อกอินเข้าสู่ระบบ
          </p>
        </div>
        <div className="flex flex-col w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <div className="space-y-9">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Username</FormLabel>
                      <FormControl>
                        <Input
                          iconFront={
                            <User size={24} className="text-dark-brown" />
                          }
                          type="text"
                          placeholder="Username"
                          className={cn(
                            "w-fulls text-sm md:text-base",
                            form.formState.errors.username &&
                            "border-2 border-error",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="hidden">Password</FormLabel>
                        <FormControl>
                          <Input
                            iconFront={
                              <Lock size={24} className="text-dark-brown" />
                            }
                            iconBack={
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {!showPassword ? (
                                  <EyeOff
                                    size={20}
                                    className="text-dark-brown"
                                  />
                                ) : (
                                  <Eye size={20} className="text-dark-brown" />
                                )}
                              </button>
                            }
                            type={!showPassword ? "password" : "text"}
                            placeholder="Password"
                            className={cn(
                              "w-full text-sm md:text-base",
                              form.formState.errors.password &&
                              "border-2 border-error",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href="/forgot-password"
                    className="mt-2 w-full font-prompt text-brown text-sm text-right"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 w-full"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
