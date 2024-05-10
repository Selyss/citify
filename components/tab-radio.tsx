import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabRadio() {
  return (
    <Tabs defaultValue="mla9">
      <TabsList>
        <TabsTrigger value="mla9">MLA 9</TabsTrigger>
        <TabsTrigger value="mla7">MLA 7</TabsTrigger>
        <TabsTrigger value="chicago">Chicago</TabsTrigger>
        <TabsTrigger value="apa7">APA 7</TabsTrigger>
      </TabsList>
      <TabsContent value="mla9"></TabsContent>
      <TabsContent value="mla7"></TabsContent>
      <TabsContent value="chicago"></TabsContent>
      <TabsContent value="apa7"></TabsContent>
    </Tabs>
  );
}
