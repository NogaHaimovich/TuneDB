import dotenv from "dotenv";
dotenv.config(); 


interface Config {
  jwtSecret: string;
  mongoUri: string;
  port: number;
  frontendUrl?: string | undefined;
}

const getConfig = (): Config => {
  const jwtSecret = process.env.JWT_SECRET || process.env.JWTSECRET;
  if (!jwtSecret) {
    throw new Error(
      "JWT_SECRET environment variable is required. Please set it in your .env file."
    );
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error(
      "MONGO_URI environment variable is required. Please set it in your .env file."
    );
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  if (isNaN(port)) {
    throw new Error("PORT must be a valid number");
  }

  return {
    jwtSecret,
    mongoUri,
    port,
    frontendUrl: process.env.FRONTEND_URL,
  };
};

export const config = getConfig();

