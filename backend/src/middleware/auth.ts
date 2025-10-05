import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const secret = process.env.JWTSECRET || "defaultsecret";
    const decoded = jwt.verify(token, secret) as { id: string; username: string; email: string };
    
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
