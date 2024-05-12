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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);

const bookSchema = z.object({
  style: citationStyles,
  query: z.string(),
});

const websiteSchema = z.object({
  style: citationStyles,
  query: z.string().url(),
});

export function CitationForm() {
  const web_form = useForm<z.infer<typeof websiteSchema>>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      style: "mla9",
      query: "",
    },
  });

  function onSubmit(data: z.infer<typeof websiteSchema>) {
    console.log(data);
  }
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Citation Generator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate properly formatted citations in APA, MLA, or Chicago style
          for books or websites.
        </p>
      </div>
      <Tabs className="w-full" defaultValue="book">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="book">Book</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>
        <TabsContent value="book"></TabsContent>
        <TabsContent value="website">
          <Form {...web_form}>
            <form
              onSubmit={web_form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={web_form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select citation style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mla9">MLA 9</SelectItem>
                        <SelectItem value="mla7">MLA 7</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                        <SelectItem value="apa7">APA 7</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={web_form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Generate Citation</Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Citation Preview</h2>
        <div className="rounded-lg border bg-gray-50 p-4 text-left dark:bg-gray-900 dark:border-gray-800">
          <p>
            Author, A. A. (Year).
            <em>Title of work</em>. Publisher.{"\n              "}
          </p>
        </div>
      </div>
    </div>
  );
}
