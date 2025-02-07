"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

const formSchema = z.object({
    username: z.string().email({ message: "Invalid email address" 
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function ProfileForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

    }
    
    return (
        <div className='flex flex-col min-h-screen'>

            {/*Login Form Container*/}
            <main className="flex flex-col justify-center items-center flex-1">
                <h2 className="text-4xl mb-6">กรุณาเข้าระบบ</h2>
                <div className="p-5 w-96">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="w-full bg-gray-100"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        className="w-full bg-gray-100"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full bg-gray-500 hover:bg-gray-600">Login</Button>
                        </form>
                    </Form> 
                </div>
            </main>
        </div>
    )
}
