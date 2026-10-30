import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    projectID: z.string(),
    homepage: z.boolean(),
    visible: z.boolean(),
    services: z.string(),
    // slug: z.string(),
  }),
});

export const collections = {
  project: projectCollection,
};
