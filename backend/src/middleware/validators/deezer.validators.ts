import { z } from "zod";

export const searchSchema = z.object({
  query: z.object({
    q: z
      .string()
      .min(1, "Search query is required"),
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a number")
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a number")
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 25)),
  }),
});

export const suggestionsSchema = z.object({
  query: z.object({
    q: z
      .string()
      .min(1, "Search query is required"),
  }),
});

export const recordDetailsSchema = z.object({
  query: z.object({
    id: z
      .string()
      .min(1, "Record ID is required"),
    full: z
      .string()
      .optional(),
  }),
});

export const artistDetailsSchema = z.object({
  query: z.object({
    id: z
      .string()
      .min(1, "Artist ID is required"),
  }),
});

export const albumDetailsSchema = z.object({
  query: z.object({
    id: z
      .string()
      .min(1, "Album ID is required"),
  }),
});

export const limitSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a number")
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 5)),
  }),
});

