import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <TabsContent value="book">
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Enter author name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter title" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publication">Publisher</Label>
                  <Input id="publication" placeholder="Enter publisher" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" placeholder="Enter year" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="style">Citation Style</Label>
                <Select defaultValue="apa">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select citation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA</SelectItem>
                    <SelectItem value="mla">MLA</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Generate Citation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="website">
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author/Editor</Label>
                  <Input id="author" placeholder="Enter author/editor name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter title" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publication">Website Name</Label>
                  <Input id="publication" placeholder="Enter website name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Access Date</Label>
                  <Input
                    id="year"
                    placeholder="Enter access date"
                    type="date"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" placeholder="Enter URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style">Citation Style</Label>
                <Select defaultValue="apa">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select citation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA</SelectItem>
                    <SelectItem value="mla">MLA</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Generate Citation
              </Button>
            </CardFooter>
          </Card>
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
