import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  // Basics
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  DEV_URL: string;
  SALT: string;
  // Cloudinary
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
  // JWT
  JWT: {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  };
}

const envVarKeys: string[] = [
  // Basics
  "PORT",
  "NODE_ENV",
  "DATABASE_URL",
  "DEV_URL",
  "SALT",
  // Cloudinary
  "CLOUD_NAME",
  "API_KEY",
  "API_SECRET",
  // JWT
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
];

const loadEnvVaribles = (): EnvVariables => {
  envVarKeys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`-------> ${key} is not found from .env file.`);
    }
  });

  return {
    // Basics
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DATABASE_URL: process.env.DATABASE_URL as string,
    DEV_URL: process.env.DEV_URL as string,
    SALT: process.env.SALT as string,
    CLOUDINARY: {
      CLOUD_NAME: process.env.CLOUD_NAME as string,
      API_KEY: process.env.API_KEY as string,
      API_SECRET: process.env.API_SECRET as string,
    },
    JWT: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    },
  };
};

export const envVars = loadEnvVaribles();
