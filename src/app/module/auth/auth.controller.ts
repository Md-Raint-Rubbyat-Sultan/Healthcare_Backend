import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login Successful!",
    data: result,
  });
});

export const authControllers = {
  login,
};
