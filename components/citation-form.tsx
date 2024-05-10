"use-client";

import { BookForm } from "@/components/book-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CitationForm() {
  return (
    <Tabs defaultValue="website" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="website">Website</TabsTrigger>
        <TabsTrigger value="book">Book</TabsTrigger>
      </TabsList>
      <TabsContent value="website">
        <Card>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter>
            <Button>Generate Citation</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="book">
        <Card>
          <CardContent className="space-y-2">
            <BookForm />
          </CardContent>
          <CardFooter>
            <Button>Generate Citation</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
