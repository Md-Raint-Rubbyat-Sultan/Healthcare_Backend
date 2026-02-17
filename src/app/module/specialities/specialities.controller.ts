import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SpecialtiesService } from "./specialities.server";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.inserIntoDB(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialtiesService.deleteFromDB(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export const SpecialtiesController = {
  inserIntoDB,
  getAllFromDB,
  deleteFromDB,
};
