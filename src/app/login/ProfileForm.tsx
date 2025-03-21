"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
    <main className="flex h-screen flex-1 flex-col items-center justify-center bg-[url('/image/background/placeholder-background.png')] bg-cover bg-center px-5">
      {/*Login Form Container*/}
      <div className="flex w-full flex-col items-center justify-center gap-y-7 rounded-2xl bg-gradient-to-b from-white to-cream px-8 pb-5 pt-3 md:max-w-md">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="FE Camp" width={109} height={62} />
          <h2 className="font-inknut text-[54px]">Welcome!</h2>
          <p className="font-inknut text-lg text-dark-gray">
            ล็อกอินเข้าสู่ระบบ
          </p>
        </div>
        <div className="flex w-full flex-col">
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
                          type="email"
                          placeholder="Username"
                          className={cn(
                            "w-full font-prompt",
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
                              "w-full font-prompt",
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
                    className="w-full text-right font-prompt text-sm text-brown"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-500 hover:bg-gray-600"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
