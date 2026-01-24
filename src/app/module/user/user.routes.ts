import express from "express";
import { userControllers } from "./user.controller";
import { userValidation } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { fileUploader } from "../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createPatientValidationSchema),
  userControllers.createPatient
);

router.post(
  "/create-doctor",
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createDoctorValidationSchema),
  userControllers.createDoctor
);

router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRouter = router;
