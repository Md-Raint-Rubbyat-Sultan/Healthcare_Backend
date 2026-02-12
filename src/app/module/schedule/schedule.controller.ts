import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { scheduleService } from "./schedule.service";
import { JwtPayload } from "jsonwebtoken";

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
  const user = req.user as JwtPayload;

  const result = await scheduleService.scheduleForDoctor(user, req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule retrive successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.deleteSchedule(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule delete successfully!",
    data: result,
  });
});

export const scheduleController = {
  insertIntoDb,
  scheduleForDoctor,
  deleteSchedule,
};
