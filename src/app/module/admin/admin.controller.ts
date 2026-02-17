import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllFromDb(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patients retrive successfully!",
    data: result.data,
    meta: result.meta,
  });
});

export const AdminControllers = {
  getAllFromDb,
};
