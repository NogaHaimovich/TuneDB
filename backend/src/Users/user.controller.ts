import type { Request, Response } from "express";
import { signinUser, signupUser } from "./user.service.js";
import { getErrorMessage } from "../utils.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const { token, user } = await signupUser(username, email, password);

    return res.status(201).json({ token, user });
  } catch (err: unknown) {
    const error_message = getErrorMessage(err);
    console.error("Signup error:", error_message);
    if (error_message === "Email already registered") {
      return res.status(400).json({ error: error_message });
    }
    return res.status(500).json({ error: "Server error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await signinUser(email, password);

    return res.status(200).json({ token, user });
  } catch (err: unknown) {
    console.error("Signin error: ", err);
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

