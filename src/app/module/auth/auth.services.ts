import { ApiError } from "../../helpers/ApiError";
import { comparePassword } from "../../utils/passwordSecurity";
import { prisma } from "../../utils/prisma";

const login = async (payload: { email: string; password: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: "ACTIVE",
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User dose not exist!");
  }

  const passwordMatched = await comparePassword(
    payload.password,
    isUserExist?.password as string
  );

  if (!passwordMatched) {
    throw new ApiError(400, "Wrong Password!");
  }

  const { password, ...rest } = isUserExist;

  return rest;
};

export const authServices = {
  login,
};
