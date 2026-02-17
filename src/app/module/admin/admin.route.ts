import express from "express";
import catchAuth from "../../middleware/catchAuth";
import { UserRole } from "../../../../prisma/generated/prisma/enums";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", catchAuth(UserRole.ADMIN), AdminControllers.getAllFromDb);

export const AdminRouters = router;
