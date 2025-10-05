import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signupUser = async (username: string, email: string, password: string) => {
  let existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    playlists: [{
      name: "favorite",
      tracks: []
    }]
  });

  await user.save();

  const newUser = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const secret = process.env.JWTSECRET || "defaultsecret";
  const token = jwt.sign(newUser, secret, { expiresIn: "1h" });

  return { token, user: newUser };
};


export const signinUser = async ( email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exist, please signup");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    const newUser = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    const secret = process.env.JWTSECRET || "defaultsecret";

    const token = jwt.sign(newUser, secret, { expiresIn: "1h" });

    return { token, user: newUser };
};