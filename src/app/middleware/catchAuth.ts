import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { prisma } from "../utils/prisma";
import { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../helpers/ApiError";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const catchAuth = (...authRoles: UserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    const tokenInfo = verifyToken(
      token,
      envVars.JWT.ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: tokenInfo.userId,
      },
    });

    if (!isUserExist) {
      throw new ApiError(404, "User don't exist!");
    }

    if (isUserExist.status === "INACTIVE") {
      throw new ApiError(
        403,
        `User is ${isUserExist.status}! You are unauthorized to access now.`
      );
    }

    if (isUserExist.status === "DELETED") {
      throw new ApiError(404, `User is ${isUserExist.status}!`);
    }

    if (!authRoles.includes(isUserExist.role)) {
      throw new ApiError(
        403,
        `User ${isUserExist.role} is unauthorized to access this route!`
      );
    }

    req.user = tokenInfo;

    next();
  });

export default catchAuth;
