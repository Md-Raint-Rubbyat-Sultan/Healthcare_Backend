import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DoctorService } from "./doctor.service";
import { JwtPayload } from "jsonwebtoken";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAllFromDB(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getOneFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.getOneFromDb(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully!",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;

  const result = await DoctorService.updateIntoDB(id as string, req.body, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated successfully!",
    data: result,
  });
});

const deleteADoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorService.deleteADoctor(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "doctor is deleted",
    data: result,
  });
});

export const DoctorController = {
  getAllFromDB,
  getOneFromDB,
  updateIntoDB,
  deleteADoctor,
};
