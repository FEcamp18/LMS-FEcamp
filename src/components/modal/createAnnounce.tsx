"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  announceName: z.string().min(1, "Announcement name is required"),
  announceDescription: z
    .string()
    .min(1, "Announcement description is required"),
});

export default function CreateAnnounce() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      announceName: "",
      announceDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //api handling
    console.log(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-[40px] w-[158px] bg-light-gray text-white hover:bg-opacity-50">
          เพิ่มประกาศ
        </button>
      </DialogTrigger>
      <DialogContent className="h-auto w-[312px] rounded-none border-none bg-[url('/image/modal/background.webp')] p-0 text-base">
        <Image
          src="/image/modal/zigzag-top.svg"
          alt="top-edge"
          width={312}
          height={6}
          className="absolute -top-[5px] left-0 w-full"
        />
        <Image
          src={"/image/modal/upload-top.webp"}
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
            เพิ่มประกาศ
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-auto flex flex-col"
          >
            <FormField
              control={form.control}
              name="announceName"
              render={({ field }) => (
                <FormItem>
                  <div className="h-auto rounded-none border-t border-dark-brown align-text-top">
                    <FormControl>
                      <Input
                        placeholder="หัวข้อ"
                        {...field}
                        className="placeholder:bg-dark-gray"
                      />
                    </FormControl>
                    <FormMessage className="p-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="announceDescription"
              render={({ field }) => (
                <FormItem>
                  <div className="h-auto rounded-none border-t border-dark-brown align-text-top">
                    <FormControl>
                      <Input
                        placeholder="ข้อความประกาศ"
                        {...field}
                        className="placeholder:bg-dark-gray"
                      />
                    </FormControl>
                    <FormMessage className="p-2" />
                  </div>
                </FormItem>
              )}
            />
            <div className="mt-auto flex w-full p-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
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
      </DialogContent>
    </Dialog>
  );
}
