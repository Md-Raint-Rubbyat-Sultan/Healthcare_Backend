import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully.",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully.",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully.",
    data: result,
  });
});

export const userControllers = {
  createPatient,
  createDoctor,
  createAdmin,
};
