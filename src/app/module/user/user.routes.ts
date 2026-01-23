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

export const userRouter = router;
