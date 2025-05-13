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
import { useParams } from "next/navigation";
import UploadFile from "./serverUploadFile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  file: z
    .custom<FileList | null>(
      (value) => value === null || value instanceof FileList,
      {
        message: "Invalid file input",
      },
    )
    .nullable(),
  fileName: z.string().min(1, "File name is required"),
  fileDescription: z.string().min(1, "File description is required"),
  fileSubject: z.string(),
});

export default function UploadForm({
  uploadSuccess,
}: {
  uploadSuccess: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const slug = params.subjectName as string;
  const [isFileUploading, setIsFileUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      fileName: "",
      fileDescription: "",
      fileSubject: slug,
    },
  });

  const handleFileUploading = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: FileList | null) => void },
  ) => {
    if (!e.target.files) return;
    const files = e.target.files;
    if (files?.length) {
      setIsFileUploading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        field.onChange(files);
      } finally {
        setIsFileUploading(false);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const file = values.file?.[0];
      if (!file) {
        toast.error("No file uploaded");
        return;
      }

      // Check file size
      const MAX_FILE_SIZE_MB = 10;
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
        throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
      }

      const result = await UploadFile({
        file: file,
        fileName: values.fileName,
        fileSubject: values.fileSubject,
        fileDescription: values.fileDescription,
      });

      if (result.success) {
        toast.success("Uploaded successfully");
        form.reset();
        setOpen(false);
        if (uploadSuccess) await uploadSuccess();
      }
    } catch {
      toast.error("Upload failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <button className="h-[40px] w-[158px] bg-light-gray text-white hover:bg-opacity-50">
          เพิ่มไฟล์
        </button>
      </DialogTrigger>
      <DialogContent className="min-h-[396px] w-[312px] rounded-none border-none bg-[url('/image/modal/background.webp')] p-0 text-base">
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
            เพิ่มไฟล์
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-auto flex flex-col"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".pdf,.png,.jpg,.pptx"
                        onChange={(e) => handleFileUploading(e, field)}
                        className={`absolute inset-0 w-full cursor-pointer opacity-0 ${
                          field?.value?.[0]?.name || isFileUploading
                            ? "pointer-events-none"
                            : ""
                        }`}
                        id="file-upload"
                        disabled={!!field?.value?.[0]?.name || isFileUploading}
                      />
                      <div
                        className={`flex h-[56px] items-center justify-between gap-2 rounded-none border border-dark-brown px-4 ${
                          field?.value?.[0]?.name || isFileUploading
                            ? "bg-transparent text-black"
                            : "bg-dark-gray text-white"
                        }`}
                      >
                        <div className="grid w-full cursor-pointer grid-cols-5 gap-2 overflow-x-hidden">
                          <Image
                            className="col-span-1 content-center"
                            src={
                              isFileUploading
                                ? "/image/modal/clip-icon.svg"
                                : field?.value?.[0]?.name
                                  ? "/image/modal/clip-icon.svg"
                                  : "/image/modal/file-icon.svg"
                            }
                            alt={
                              isFileUploading
                                ? "uploading"
                                : field?.value?.[0]?.name
                                  ? "file-selected"
                                  : "no-file"
                            }
                            height={
                              field?.value?.[0]?.name || isFileUploading
                                ? 24
                                : 34
                            }
                            width={
                              field?.value?.[0]?.name || isFileUploading
                                ? 24
                                : 34
                            }
                          />
                          <label
                            htmlFor="file-upload"
                            className="col-span-3 cursor-pointer content-center overflow-hidden"
                          >
                            {isFileUploading
                              ? "อัพโหลดไฟล์..."
                              : (field?.value?.[0]?.name ??
                                "กดที่นี่เพื่อเพิ่มไฟล์")}
                          </label>
                          {field?.value?.[0]?.name && !isFileUploading && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                field.onChange(null);
                              }}
                              className="col-span-1 flex content-center items-center justify-center hover:opacity-80"
                              aria-label="clear file selection"
                            >
                              <Image
                                src="/image/modal/cancel-icon.svg"
                                alt="cancel-icon"
                                width={24}
                                height={24}
                              />
                            </button>
                          )}
                        </div>
                        {field.value?.[0]?.name && !isFileUploading && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange(null);
                            }}
                            className="flex items-center justify-center hover:opacity-80"
                            aria-label="clear file selection"
                          >
                            <Image
                              src="/image/modal/cancel-icon.svg"
                              alt="cancel-icon"
                              width={24}
                              height={24}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ชื่อ"
                      {...field}
                      className="h-[56px] placeholder-dark-gray"
                    />
                  </FormControl>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="รายละเอียด"
                      {...field}
                      className="h-[104px] rounded-none border-y-[1px] border-dark-brown align-text-top placeholder:bg-dark-gray"
                    />
                  </FormControl>
                  <FormMessage className="px-4" />
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
                className="h-[58px] flex-1 rounded-none border bg-transparent"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="h-[58px] flex-1 rounded-none border bg-dark-gray shadow-none hover:bg-dark-gray/70"
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
