import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { hashPassword } from "../../utils/passwordSecurity";
import { prisma } from "../../utils/prisma";

const createPatient = async (payload: Request) => {
  if (payload.file) {
    const uploadImage = await fileUploader.uploadImageToCloudinary(
      payload.file
    );
    payload.body.patient.profilePhoto = uploadImage?.secure_url as string;
  }

  const hashedPassword = await hashPassword(payload.body.password);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.body.patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: payload.body.patient,
    });
  });

  return result;
};

export const userServices = {
  createPatient,
};
