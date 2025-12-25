import mongoose from "mongoose";
import { trackSchema } from "./track.model.js";

export const playlistSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: { 
        type: String,
        required: true, 
    },
    tracks: [trackSchema],
}, { timestamps: true });