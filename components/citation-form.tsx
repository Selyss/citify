"use client";

import qs from "qs";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CopyButton } from "./copy-button";

const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);

const bookSchema = z.object({
  style: citationStyles,
  query: z.string(),
});

const websiteSchema = z.object({
  style: citationStyles,
  query: z.string().url(),
});

const API = "https://api.bibify.org/api";

// FIXME: change console logs to toasts

export function CitationForm() {
  const [generatedCitations, setGeneratedCitations] = useState<any>(null);

  const web_form = useForm<z.infer<typeof websiteSchema>>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      style: "mla9",
      query: "",
    },
  });

  async function onSubmit(data: z.infer<typeof websiteSchema>) {
    const links = data.query.split("\n").filter((link) => link.trim() !== "");

    // Promise.all to do api calls in parallel
    const apiCalls = links.map((link) => {
      return fetch(API + `/website?url=${encodeURIComponent(link)}`)
        .then((res) => res.json())
        .catch((err) => {
          console.log(`Error occurred while fetching data for ${link}: ${err}`);
          return null;
        });
    });

    Promise.all(apiCalls).then((responses) => {
      const citations: string[] = [];
      for (const response of responses) {
        if (response) {
          const citeFields = {
            style: "modern-language-association.csl",
            type: "webpage",
            format: "RFC3986",
          };
          const citeObject = { ...response, ...citeFields };
          // should citations maintain order they are entered? :FIXME
          fetch(API + `/cite?` + qs.stringify(citeObject))
            .then((res) => res.json())
            .then((data) => {
              setGeneratedCitations((prevCitations: any) => [
                ...prevCitations,
                data,
              ]);
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Error occurred while fetching data.");
        }
      }
      setGeneratedCitations(citations);
    });
  }
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Citation Generator</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate properly formatted citations in APA, MLA, or Chicago style
          for websites.
        </p>
      </div>
      <Form {...web_form}>
        <form onSubmit={web_form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={web_form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
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
                <FormControl>
                  <div className="grid w-full">
                    <div className="grid w-full gap-1.5">
                      <Textarea
                        placeholder="Enter a website"
                        {...field}
                        id="message"
                        rows={4}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Generate Citation
          </Button>
        </form>
      </Form>
      <div className="space-y-2 pt-6 text-center">
        <h2 className="text-2xl font-bold">Citation Preview</h2>
        <div className="space-y-4">
          {generatedCitations &&
            generatedCitations.map(
              (citation: string, index: Key | null | undefined) => (
                <div key={index}>
                  <CopyButton value={citation} />
                  <div className="rounded-lg border bg-gray-50 p-4 text-left dark:bg-gray-900 dark:border-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: citation }} />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
