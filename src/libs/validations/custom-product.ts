import { z } from "zod";

export const CustomProductFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  price: z
    .string()
    .refine(
      (value) => (+value > 0 ? true : false),
      "Price must be valid number."
    ),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(5, "Title must be at least 10 characters long."),
  image: z.string().url("Image is not valid"),
  rate: z
    .string()
    .min(1, "Rate is required")
    .refine(
      (value) => (+value >= 0 && +value <= 5 ? true : false),
      "Rate must be valid number."
    ),
  rateCount: z
    .string()
    .refine(
      (value) => (+value > 0 ? true : false),
      "This field must be valid number."
    ),
});

export type ICustomProductForm = z.infer<typeof CustomProductFormSchema>;
