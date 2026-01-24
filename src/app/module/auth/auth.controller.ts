import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import { createUserToken } from "../../utils/createToken";
import { setAuthCookies } from "../../utils/setCookies";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);

  const userToken = createUserToken({
    userId: result.id,
    email: result.email,
    role: result.role,
  });

  setAuthCookies(res, userToken);

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
