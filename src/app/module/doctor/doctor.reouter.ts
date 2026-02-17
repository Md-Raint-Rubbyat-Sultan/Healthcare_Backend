import express from "express";
import { DoctorController } from "./doctor.controller";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorUpdateZodValidation } from "./doctor.validation";
const router = express.Router();

router.get("/all-doctor", DoctorController.getAllFromDB);

router.get("/get-a-doctor/:id", DoctorController.getOneFromDB);

router.patch(
  "/:id",
  catchAuth(UserRole.DOCTOR),
  validateRequest(doctorUpdateZodValidation),
  DoctorController.updateIntoDB,
);

router.delete(
  "/:id",
  catchAuth(UserRole.ADMIN),
  DoctorController.deleteADoctor,
);

export const DoctorRoutes = router;
