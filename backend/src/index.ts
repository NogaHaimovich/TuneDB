import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./db/db.js";
import { config } from "./config/index.js"; 
import userRoutes from "./Users/user.routes.js";
import deezerRoutes from "./Deezer/deezer.routes.js";
import playlistRoutes from "./Playlist/playlist.routes.js";

const app = express();
const PORT = config.port; 

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://tunedb.netlify.app"
];

if (config.frontendUrl) { 
  allowedOrigins.push(config.frontendUrl);
}

app.use(
  helmet({
    crossOriginEmbedderPolicy: false, 
    contentSecurityPolicy: false,    
  })
);

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/deezer", deezerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/playlist", playlistRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
