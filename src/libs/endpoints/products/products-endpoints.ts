import { makeApi, Zodios } from "@zodios/core";
import { z } from "zod";

import { ZodiosHooks } from "@zodios/react";
import { apiInstance } from "../../api-instance";
import { BASE_API_URL } from "../../../config";
import { ProductSchema } from "./products-schemas";

const endpoints = makeApi([
  {
    method: "get",
    path: "/products",
    alias: "queryProducts",

    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "sort",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response: z.array(ProductSchema),
  },
  {
    method: "get",
    path: "/products/:id",
    alias: "queryProductById",

    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Body",
        schema: z.string(),
      },
    ],
    response: ProductSchema,
  },
  {
    method: "get",
    path: "/products/categories",
    alias: "queryCategories",
    requestFormat: "json",
    response: z.array(z.string()),
  },
]);

const client = new Zodios(BASE_API_URL, endpoints, {
  axiosInstance: apiInstance,
});

export const productHooks = new ZodiosHooks("products", client);
