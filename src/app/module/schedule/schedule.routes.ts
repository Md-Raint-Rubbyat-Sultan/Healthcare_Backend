import express from "express";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { scheduleValidation } from "./schedule.validation";
import { scheduleController } from "./schedule.controller";

const router = express.Router();

router.get(
  "/select-schedule",
  catchAuth(UserRole.DOCTOR),
  scheduleController.scheduleForDoctor,
);

router.post(
  "/create-schedule",
  catchAuth(UserRole.ADMIN),
  validateRequest(scheduleValidation),
  scheduleController.insertIntoDb,
);

export const scheduleRoute = router;
