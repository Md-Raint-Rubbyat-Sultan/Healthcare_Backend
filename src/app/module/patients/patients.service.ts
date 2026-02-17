import { Request } from "express";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { patientSearchableFields } from "./patient.constant";
import { prisma } from "../../utils/prisma";

const getAllFromDb = async (payload: Request) => {
  const qb = new PrismaQueryBuilder<
    Prisma.PatientWhereInput,
    Prisma.PatientOrderByWithRelationInput
  >(payload.query as Record<string, string>)
    .filter()
    .search(patientSearchableFields)
    .sort()
    .paginate();

  const result = prisma.patient.findMany(qb.build());

  const [data, meta] = await Promise.all([result, qb.getMeta(prisma.patient)]);

  return {
    data,
    meta,
  };
};

export const patientServices = {
  getAllFromDb,
};
