import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { doctorScheduleService } from "./doctorSchedule.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await doctorScheduleService.insertIntoDb(user, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule booked successfully!",
    data: result,
  });
});

export const doctorScheduleController = {
  insertIntoDb,
};
