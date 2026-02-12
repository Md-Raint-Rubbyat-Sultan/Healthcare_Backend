import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { scheduleService } from "./schedule.service";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const scheduleForDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.scheduleForDoctor(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule retrive successfully!",
    data: result,
  });
});

export const scheduleController = {
  insertIntoDb,
  scheduleForDoctor,
};
