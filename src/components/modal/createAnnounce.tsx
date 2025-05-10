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
  announceName: z.string(),
  announceDescription: z.string(),
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
      <DialogContent className="h-[340px] w-[312px] rounded-none border-none bg-[url('/image/modal/background.png')] p-0 text-base">
        <Image
          src="/image/modal/zigzag-top.png"
          alt="top-edge"
          width={312}
          height={6}
          className="absolute -top-[5px] left-0 w-full"
        />
        <Image
          src={"/image/modal/upload-top.png"}
          alt="upload-top"
          width={312}
          height={100}
          className="absolute -top-12 left-0"
        />
        <Image
          src="/image/modal/zigzag-cream.png"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] left-0"
        />
        <Image
          src="/image/modal/zigzag-gray.png"
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
                  <FormControl>
                    <Input
                      placeholder="หัวข้อ"
                      {...field}
                      className="h-[56px] rounded-none border-t border-dark-brown placeholder:bg-dark-gray"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="announceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ข้อความประกาศ"
                      {...field}
                      className="h-[104px] rounded-none border-t border-dark-brown align-text-top placeholder:bg-dark-gray"
                    />
                  </FormControl>
                  <FormMessage />
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
