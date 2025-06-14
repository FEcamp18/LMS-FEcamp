"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"

const formSchema = z.object({
  noteDescription: z.string().min(1, "Description is required"),
})

export default function CreateNote({
  camperId,
  staffId,
}: {
  camperId: string
  staffId: string
}) {
  const [open, setOpen] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/staff/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "staff-id": staffId,
        },
        body: JSON.stringify({
          camperId: camperId,
          content: values.noteDescription,
          type: "NORMAL",
        }),
      })

      const data = (await response.json()) as {
        message: string
        error?: string
      }

      if (response.ok && data.message === "success") {
        toast.success("หมายเหตุเพิ่มสำเร็จ! กรุณารีเฟรชหน้าจอ")
        form.reset()
        setOpen(false)
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาดในการเพิ่มหมายเหตุ")
      }
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error("เกิดข้อผิดพลาดในการเพิ่มหมายเหตุ")
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noteDescription: "",
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="text-base">
        <Toaster />
      </div>

      <DialogTrigger asChild>
        <button className="h-[40px] w-[158px] bg-light-gray text-base text-white hover:bg-opacity-50">
          + โน๊ต
        </button>
      </DialogTrigger>
      <DialogContent className="h-[332px] w-[312px] rounded-none border-none bg-[url('/image/modal/background.webp')] p-0 text-base">
        <Image
          src="/image/modal/zigzag-top.svg"
          alt="top-edge"
          width={312}
          height={6}
          className="absolute -top-[5px] left-0 w-full"
        />
        <Image
          src={"/image/modal/note-top.webp"}
          alt="upload-top"
          width={312}
          height={100}
          className="absolute -top-12 left-0"
        />
        <Image
          src="/image/modal/zigzag-cream.svg"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] left-0"
        />
        <Image
          src="/image/modal/zigzag-gray.svg"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] right-0"
        />
        <DialogHeader>
          <DialogTitle className="mt-16 text-center text-2xl">
            เพิ่มหมายเหตุให้น้อง
          </DialogTitle>
        </DialogHeader>
        <div className="px-2 text-center text-sm">
          คุณสามารถเพิ่มหมายเหตุให้กับน้องได้ในสถานะ staff
          เพื่อความปลอดภัยของน้อง ๆ ค่าย
        </div>
        <div className="mt-auto flex flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-auto flex flex-col"
            >
              <FormField
                control={form.control}
                name="noteDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="รายละเอียด"
                        {...field} // Use react-hook-form's field object
                        className="h-auto rounded-none border-t border-dark-brown align-text-top placeholder:bg-dark-gray"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="noteDescription"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="รายละเอียด"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-auto rounded-none border-t border-dark-brown align-text-top placeholder:bg-dark-gray"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              /> */}
              <div className="flex w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-transparent"
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-dark-gray shadow-none"
                >
                  เพิ่ม
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
