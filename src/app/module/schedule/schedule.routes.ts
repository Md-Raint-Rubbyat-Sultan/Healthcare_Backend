import express from "express";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { scheduleValidation } from "./schedule.validation";
import { scheduleController } from "./schedule.controller";

const router = express.Router();

router.get(
  "/select-schedule",
  catchAuth(UserRole.DOCTOR, UserRole.ADMIN),
  scheduleController.scheduleForDoctor,
);

router.post(
  "/create-schedule",
  catchAuth(UserRole.ADMIN),
  validateRequest(scheduleValidation),
  scheduleController.insertIntoDb,
);

router.delete(
  "/delete-schedule/:id",
  catchAuth(UserRole.ADMIN),
  scheduleController.deleteSchedule,
);

export const scheduleRoute = router;
