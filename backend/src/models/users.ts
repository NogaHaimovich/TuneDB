import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    trackId: { type: String, required: true },
    title: { type: String },
    artist: { type: String },
    album: { type: String },
    image: { type: String },
});

const playlistSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
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
