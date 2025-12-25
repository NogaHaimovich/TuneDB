import { Router } from "express";
import { signIn, signUp } from "./user.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { signupSchema, signinSchema } from "../middleware/validators/user.validators.js";

const router = Router();

router.post("/signin", validateRequest(signinSchema), signIn);
router.post("/signup", validateRequest(signupSchema), signUp);

export default router;