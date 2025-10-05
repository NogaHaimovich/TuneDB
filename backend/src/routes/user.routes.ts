import { Router } from "express";
import { signinUser, signupUser } from "../services/user.service.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { token, user } = await signupUser(username, email, password);

    return res.status(201).json({ token, user });
  } catch (err: any) {
    console.error("Signup error:", err);
    if (err.message === "Email already registered") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async(req, res)=>{
  try {
    const {email, password } = req.body;
    const { token, user } = await signinUser(email, password);

    return res.status(200).json({token, user})
  } catch (err:any){
    console.error("Signin error: ", err)
    return res.status(400).json({message: err.message})
  }
})

export default router;
