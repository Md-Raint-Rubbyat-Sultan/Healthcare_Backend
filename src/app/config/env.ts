import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  // Basics
  PORT: String;
  NODE_ENV: "development" | "production";
  DATABASE_URL: String;
  DEV_URL: String;
}

const envVarKeys: string[] = [
  // Basics
  "PORT",
  "NODE_ENV",
  "DATABASE_URL",
  "DEV_URL",
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
    DEV_URL: process.env.DEV_URL as String,
  };
};

export const envVars = loadEnvVaribles();
