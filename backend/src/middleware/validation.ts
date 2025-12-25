import type { Request, Response, NextFunction } from "express";
import type { ZodSchema, ZodObject } from "zod";
import { ZodError } from "zod";
import { AppError } from "./errorHandler.js";

type ValidationTarget = "body" | "query" | "params";

export const validate = (
  schema: ZodSchema,
  target: ValidationTarget = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[target];
      const validatedData = schema.parse(data);
      
      req[target] = validatedData as any;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        
        return res.status(400).json({
          error: "Validation Error",
          details: errorMessages,
        });
      }
      
      next(error);
    }
  };
};

export const validateRequest = (schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      if (result.body) req.body = result.body;
      if (result.query) req.query = result.query as any;
      if (result.params) req.params = result.params as any;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => {
          const path = err.path.join(".");
          return {
            field: path,
            message: err.message,
          };
        });
        
        return res.status(400).json({
          error: "Validation Error",
          details: errorMessages,
        });
      }
      
      next(error);
    }
  };
};

