import express from "express";
import { userControllers } from "./user.controller";
import { userValidation } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { fileUploader } from "../../helpers/fileUploader";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";

const router = express.Router();

router.get("/users", catchAuth(UserRole.ADMIN), userControllers.getAllUser);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createPatientValidationSchema),
  userControllers.createPatient
);

router.post(
  "/create-doctor",
  catchAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createDoctorValidationSchema),
  userControllers.createDoctor
);

router.post(
  "/create-admin",
  catchAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRouter = router;
