import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    featured: z.boolean().default(false),
    projectType: z.string().default("Selected work"),
    technologies: z.array(z.string()),
    links: z
      .array(z.object({ label: z.string(), href: z.string().min(1) }))
      .default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, writing };
