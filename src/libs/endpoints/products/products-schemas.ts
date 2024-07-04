import { z } from "zod";

const ProductRatingSchema = z.object({
  rate: z.number(),
  count: z.number().int()
});

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  image: z.string().url(),
  rating: ProductRatingSchema
});

export type IProduct = z.infer<typeof ProductSchema>;
