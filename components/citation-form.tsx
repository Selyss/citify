"use-client";

import { Search } from "@/components/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);

const websiteSchema = z.object({
  style: citationStyles,
  query: z.string().url(),
});

const bookSchema = z.object({
  style: citationStyles,
  query: z.string(),
});

export function WebsiteCitationForm() {
  const form = useForm<z.infer<typeof websiteSchema>>({
    resolver: zodResolver(websiteSchema),
  });
  return (
    <div className="">
      <Search />
    </div>
  );
}
