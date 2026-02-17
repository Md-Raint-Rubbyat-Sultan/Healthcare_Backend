import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesController } from "./specialities.controller";
import { fileUploader } from "../../helpers/fileUploader";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { createSpecialityZodSchema } from "./specialities.validation";

const router = express.Router();

router.get("/", SpecialtiesController.getAllFromDB);

router.post(
  "/",
  catchAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(createSpecialityZodSchema),
  SpecialtiesController.inserIntoDB,
);

router.delete(
  "/:id",
  catchAuth(UserRole.ADMIN),
  SpecialtiesController.deleteFromDB,
);

export const SpecialtiesRoutes = router;
