import express from "express";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { patientControllers } from "./patients.controller";

const router = express.Router();

router.get("/", catchAuth(UserRole.ADMIN), patientControllers.getAllFromDb);

export const patientRouters = router;
