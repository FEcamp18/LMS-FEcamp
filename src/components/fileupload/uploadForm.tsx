"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import UploadFile from "./serverUploadFile";

const formSchema = z.object({
  file: z
    .any()
    .refine((file: FileList) => file?.length === 1, "File is required"),
  fileName: z.string().min(1, "File name is required"),
  fileDescription: z.string().min(1, "File description is required"),
  fileSubject: z.string(),
});

export default function UploadForm() {
  const params = useParams();
  const slug = params.subjectName as string;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      fileName: "",
      fileDescription: "",
      fileSubject: slug,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //sent file data
    console.log(values);
    const file = values.file[0];
    const fileName = values.fileName;
    const fileSubject = values.fileSubject;

    if (!file) {
      console.log("No file uploaded");

      return;
    }
    UploadFile({ file, fileName, fileSubject });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>
              <FormControl>
                <Input placeholder="File name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File description</FormLabel>
              <FormControl>
                <Input placeholder="File description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
