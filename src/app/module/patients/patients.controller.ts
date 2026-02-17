import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { patientServices } from "./patients.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await patientServices.getAllFromDb(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patients retrive successfully!",
    data: result.data,
    meta: result.meta,
  });
});

export const patientControllers = {
  getAllFromDb,
};
