import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(error);
  }

  let statusCode = 500;
  let success = false;
  let message = error.message || "Somthing went wrong!";

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};
