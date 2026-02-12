import express from "express";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { doctorScheduleController } from "./doctorSchedule.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorScheduleVaildationShcema } from "./doctorSchedule.validation";

const router = express.Router();

router.post(
  "/create-doctor-schedule",
  catchAuth(UserRole.DOCTOR),
  validateRequest(doctorScheduleVaildationShcema),
  doctorScheduleController.insertIntoDb,
);

export const DoctorScheduleRoute = router;
