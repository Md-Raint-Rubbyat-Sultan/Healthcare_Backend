import bcrypt from "bcryptjs";
import { envVars } from "../config/env";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(envVars.SALT));
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
