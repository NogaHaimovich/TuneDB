import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters"),
    email: z
      .string()
      .email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
  }),
});

export const signinSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required"),
  }),
});

