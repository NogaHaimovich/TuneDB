import mongoose from "mongoose";
import { playlistSchema } from "./playlist.model.js";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    playlists: [playlistSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
