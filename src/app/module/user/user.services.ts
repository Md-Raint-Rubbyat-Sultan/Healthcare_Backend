import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { hashPassword } from "../../utils/passwordSecurity";
import { prisma } from "../../utils/prisma";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { Prisma, UserRole } from "../../../../prisma/generated/prisma/client";
import { userSearchableFields } from "./user.constants";

const createPatient = async (payload: Request) => {
  if (payload.file) {
    const uploadImage = await fileUploader.uploadImageToCloudinary(
      payload.file,
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

const createDoctor = async (payload: Request) => {
  if (payload.file) {
    const uploadImage = await fileUploader.uploadImageToCloudinary(
      payload.file,
    );
    payload.body.doctor.profilePhoto = uploadImage?.secure_url as string;
  }

  const hashedPassword = await hashPassword(payload.body.password);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
      },
    });

    return await tnx.doctor.create({
      data: payload.body.doctor,
    });
  });

  return result;
};

const createAdmin = async (payload: Request) => {
  if (payload.file) {
    const uploadImage = await fileUploader.uploadImageToCloudinary(
      payload.file,
    );
    payload.body.admin.profilePhoto = uploadImage?.secure_url as string;
  }

  const hashedPassword = await hashPassword(payload.body.password);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    return await tnx.admin.create({
      data: payload.body.admin,
    });
  });

  return result;
};

const getAllUser = async (payload: Request) => {
  const qb = new PrismaQueryBuilder<
    Prisma.UserWhereInput,
    Prisma.UserOrderByWithRelationInput
  >(payload.query as Record<string, string>)
    .filter()
    .search(userSearchableFields)
    .paginate()
    .sort();

  const result = prisma.user.findMany({
    ...qb.build(),
    include: {
      admin: true,
      patient: true,
      doctor: true,
    },
    omit: {
      password: true,
    },
  });

  const [data, meta] = await Promise.all([result, qb.getMeta(prisma.user)]);
  return {
    data,
    meta,
  };
};

export const userServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUser,
};
