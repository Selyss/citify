import { z } from "zod";

export const citationStyles = z.enum(["mla9", "mla7", "chicago", "apa7"]);
export const websiteSchema = z.object({
  style: citationStyles,
  query: z.string().url(),
});

export const bookSchema = z.object({
  style: citationStyles,
  query: z.string(),
});
