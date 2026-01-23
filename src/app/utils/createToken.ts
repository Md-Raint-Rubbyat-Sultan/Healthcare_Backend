import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { envVars } from "../config/env";
import { ApiError } from "../helpers/ApiError";
import { generateToken, verifyToken } from "./jwt";
import { prisma } from "./prisma";

interface IUserInfo {
  userId: string;
  email: string;
  role: UserRole;
}

export const createUserToken = (userInfo: IUserInfo) => {
  const accessToken = generateToken(userInfo, envVars.JWT.ACCESS_TOKEN_SECRET);

  const refreshToken = generateToken(
    userInfo,
    envVars.JWT.REFRESH_TOKEN_SECRET,
    "90d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const generateAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: verifyRefreshToken.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found!");
  }

  if (isUserExist.status === "INACTIVE") {
    throw new ApiError(400, `User is ${isUserExist.status}.`);
  }

  if (isUserExist.status === "DELETED") {
    throw new ApiError(400, `User do not exist.`);
  }

  const payload: IUserInfo = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(payload, envVars.JWT.ACCESS_TOKEN_SECRET);

  return {
    accessToken,
  };
};
