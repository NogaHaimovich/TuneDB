import express from "express";
import deezerRoutes from "./routes/deezer.routes.js"
import userRoutes from "./routes/user.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());
app.use("/", deezerRoutes)
app.use("/api/user", userRoutes)
app.use("/api/playlist", playlistRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
