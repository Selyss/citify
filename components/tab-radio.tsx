import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabRadio() {
  return (
    <Tabs defaultValue="mla9" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="mla9">MLA 9</TabsTrigger>
        <TabsTrigger value="mla7">MLA 7</TabsTrigger>
        <TabsTrigger value="chicago">Chicago</TabsTrigger>
        <TabsTrigger value="apa7">APA 7</TabsTrigger>
      </TabsList>
      <TabsContent value="mla9">Make changes to your account here.</TabsContent>
      <TabsContent value="mla7">Change your password here.</TabsContent>
      <TabsContent value="chicago">Change your password here.</TabsContent>
      <TabsContent value="apa7">Change your password here.</TabsContent>
    </Tabs>
  );
}
