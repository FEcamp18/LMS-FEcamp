"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(6, {
    message: "Password Must be longer than 6 characters",
  }),
})

export default function ProfileForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [wait, setWait] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setWait(true)
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        console.error("Login error:", result.error)
        toast.error(result.error || "Login failed")
        return
      }
      setWait(false)

      // Show success message
      toast.success("เข้าสู่ระบบสำเร็จ")
      // Add a small delay to ensure toast is visible
      await new Promise((resolve) => setTimeout(resolve, 300))

      router.push("/board")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during login")
    }
  }

  return (
    <main className="flex h-screen flex-1 flex-col items-center justify-center bg-[url('/image/background/placeholder-background.webp')] bg-cover bg-center px-5">
      {/*Login Form Container*/}
      <div className="flex w-full flex-col items-center justify-center gap-y-7 rounded-2xl bg-gradient-to-b from-white to-cream px-8 pb-5 pt-3 md:max-w-md">
        <div className="flex flex-col items-center">
          {/* case sensitive */}
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
          <p className="mt-1 font-prompt text-base text-dark-gray md:text-lg">
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
                    href="/resetpassnotice"
                    className="mt-2 w-full text-right font-prompt text-sm text-brown"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-500 py-3 hover:bg-gray-600"
              >
                {wait ? "loading" : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
