import { Router } from "express";
import { signinUser, signupUser } from "../services/user.service.js";
import { getErrorMessage } from "../utils.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { token, user } = await signupUser(username, email, password);

    return res.status(201).json({ token, user });
  } catch (err: unknown) {
    const error_message = getErrorMessage(err)
    console.error("Signup error:", error_message);
    if (error_message === "Email already registered") {
      return res.status(400).json({ message: error_message });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async(req, res)=>{
  try {
    const {email, password } = req.body;
    const { token, user } = await signinUser(email, password);

    return res.status(200).json({token, user})
  } catch (err:unknown){
    console.error("Signin error: ", err)
    return res.status(400).json({error: getErrorMessage(err)})
  }
})

export default router;
