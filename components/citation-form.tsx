"use client";

import qs from "qs";

import { Textarea } from "@/components/ui/textarea";

import { CopyButton } from "@/components/copy-button";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const citationStyles = z.enum(["mla", "chicago", "apa"]);

const websiteSchema = z.object({
  style: citationStyles,
  query: z.string().url(),
});

const API = "https://api.bibify.org/api";

function getCitationPath(style: string): string {
  switch (style) {
    case "apa":
      return "apa.csl";
    case "chicago":
      return "chicago-fullnote-bibliography.csl";
    default:
      return "modern-language-association.csl";
  }
}

export function CitationForm() {
  const { toast } = useToast();

  const [generatedCitations, setGeneratedCitations] = useState<any>(null);

  const web_form = useForm<z.infer<typeof websiteSchema>>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      style: "mla",
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
          toast({
            title: `Error fetching data from ${link}.`,
            description: `${err}`,
            variant: "destructive",
          });
          return null;
        });
    });

    Promise.all(apiCalls).then((responses) => {
      const citations: string[] = [];
      for (const response of responses) {
        if (response) {
          const citeFields = {
            style: getCitationPath(data.style),
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
            .catch((err) => {
              toast({
                title: `Error occurred while fetching data.`,
                description: `${err}`,
                variant: "destructive",
              });
            });
        } else {
          toast({
            title: `Error occurred while fetching data.`,
            variant: "destructive",
          });
        }
      }
      setGeneratedCitations(citations);
    });
  }
  return (
    <>
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Citation Generator</h1>
          <p className="text-muted-foreground">
            Generate properly formatted citations in APA, MLA, or Chicago style
            for websites.
          </p>
        </div>
        <Form {...web_form}>
          <form
            onSubmit={web_form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
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
                      <SelectItem value="mla">MLA</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="apa">APA</SelectItem>
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
      </div>
      <div className="space-y-2 pt-6 text-center max-w-2xl">
        <h2 className="text-2xl font-bold">Citation List</h2>
        <div className="space-y-4">
          {/* better way to do this? */}
          {generatedCitations &&
            generatedCitations.map((citation: any, index: any) => (
              <div
                className="relative rounded-lg border bg-zinc-300 p-4 text-left dark:bg-zinc-900"
                key={index}
              >
                <CopyButton
                  className="absolute top-2 right-2"
                  value={citation}
                />
                <div className="p-2">
                  <div dangerouslySetInnerHTML={{ __html: citation }} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
