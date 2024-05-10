import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);

const formSchema = z.object({
  format: z.enum(["website", "book"]),
  style: citationStyles,
  query: z.string(),
});

export function CitationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "website",
      style: "mla9",
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <></>
    //   <Tabs defaultValue="website" className="w-[400px]">
    //     <TabsList className="grid w-full grid-cols-2">
    //       <TabsTrigger value="website">Website</TabsTrigger>
    //       <TabsTrigger value="book">Book</TabsTrigger>
    //     </TabsList>
    //     <TabsContent value="website">
    //       <Card>
    //         <CardContent className="space-y-2"></CardContent>
    //         <CardFooter>
    //           <Button>Generate Citation</Button>
    //         </CardFooter>
    //       </Card>
    //     </TabsContent>
    //     <TabsContent value="book">
    //       <Card>
    //         <CardContent className="space-y-2"></CardContent>
    //         <CardFooter>
    //           <Button>Generate Citation</Button>
    //         </CardFooter>
    //       </Card>
    //     </TabsContent>
    //   </Tabs>
  );
}
