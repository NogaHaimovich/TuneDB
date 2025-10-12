import dotenv from "dotenv";
dotenv.config();

import express from "express";
import deezerRoutes from "./routes/deezer.routes.js"
import userRoutes from "./routes/user.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"
import cors from "cors";
import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174",
  "https://tunedb.netlify.app"
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use("/api", deezerRoutes)
app.use("/api/user", userRoutes)
app.use("/api/playlist", playlistRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
