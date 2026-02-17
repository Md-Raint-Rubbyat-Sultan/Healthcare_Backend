import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../utils/prisma";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { IDoctorUpdateInput } from "./doctor.interface";
import { doctorSearchableFileds } from "./doctor.constant";

const getAllFromDB = async (payload: Request) => {
  const qb = new PrismaQueryBuilder<
    Prisma.DoctorWhereInput,
    Prisma.DoctorOrderByWithRelationInput
  >(payload.query as Record<string, string>)
    .search(doctorSearchableFileds)
    .sort()
    .paginate();

  const data = await prisma.doctor.findMany({
    ...qb.build(),
    where: {
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });

  const total = await prisma.doctor.count({
    where: {
      isDeleted: false,
    },
  });

  const totalPage = Math.ceil(total / (Number(payload.query.limit) || 10));

  const meta = {
    page: Number(payload.query.page) || 1,
    limit: Number(payload.query.limit) || 10,
    total,
    totalPage,
  };

  return {
    data,
    meta,
  };
};

const getOneFromDb = async (id: string) => {
  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<IDoctorUpdateInput>,
  user: JwtPayload,
) => {
  if (user.userId !== id) {
    throw new ApiError(403, "You are forbbiden to update this user.");
  }

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { specialties, ...doctorData } = payload;

  return await prisma.$transaction(async (tnx) => {
    if (specialties && specialties.length > 0) {
      const deleteSpecialtyIds = specialties.filter(
        (specialty) => specialty.isDeleted,
      );

      for (const specialty of deleteSpecialtyIds) {
        await tnx.doctorSpecialties.deleteMany({
          where: {
            doctorId: id,
            specialitiesId: specialty.specialtyId,
          },
        });
      }

      const createSpecialtyIds = specialties.filter(
        (specialty) => !specialty.isDeleted,
      );

      for (const specialty of createSpecialtyIds) {
        await tnx.doctorSpecialties.create({
          data: {
            doctorId: id,
            specialitiesId: specialty.specialtyId,
          },
        });
      }
    }

    const updatedData = await tnx.doctor.update({
      where: {
        id: doctorInfo.id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: {
          include: {
            specialities: true,
          },
        },
      },
    });

    return updatedData;
  });
};

const deleteADoctor = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    const doctor = await tx.doctor.findUnique({
      where: { id },
    });

    if (!doctor) throw new Error("Doctor not found");

    await tx.doctor.delete({
      where: { id },
    });

    return await tx.user.delete({
      where: { email: doctor.email },
    });
  });
};

export const DoctorService = {
  getAllFromDB,
  getOneFromDb,
  updateIntoDB,
  deleteADoctor,
};
