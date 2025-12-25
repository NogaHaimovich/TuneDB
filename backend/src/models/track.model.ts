import mongoose from "mongoose";

export const trackSchema = new mongoose.Schema({
    trackId: { type: String, required: true },
    title: { type: String },
    artist: { type: String },
    album: { type: String },
    image: { type: String },
});

