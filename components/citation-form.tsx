import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);

const formSchema = z.object({
  format: z.enum(["website", "book"]),
  style: citationStyles,
  query: z.string(),
});

export function CitationForm() {
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       format: "website",
  //       style: "mla9",
  //       query: "",
  //     },
  //   });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <TabsContent value="website"></TabsContent>
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
